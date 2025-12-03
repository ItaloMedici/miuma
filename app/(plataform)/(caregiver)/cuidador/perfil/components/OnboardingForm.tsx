"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  BillingAndExpenses,
  Gallery,
  Location,
  PetsInCare,
  ProfileEssentials,
  StoryAndSocial,
} from ".";
import { useOnboarding } from "../context";
import { useFormPersistence } from "../hooks/useFormPersistence";
import {
  BillingAndExpensesFormData,
  billingAndExpensesSchema,
  GalleryFormData,
  gallerySchema,
  LocationFormData,
  locationSchema,
  PetsInCareFormData,
  petsInCareSchema,
  ProfileEssentialsFormData,
  profileEssentialsSchema,
  StoryAndSocialFormData,
  storyAndSocialSchema,
} from "../schemas";
import { FooterNavigation } from "./FooterNavigation";
import { UnsavedChangesBanner } from "./UnsavedChangesBanner";

import { OnboardingStepEnum } from "../constants";

export function OnboardingForm() {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    markStepAsCompleted,
    completedSteps,
    setCompletedSteps,
    isEditMode,
    inititalCaregiver,
    user,
  } = useOnboarding();

  const {
    loadBackup,
    saveBackup,
    setupAutoSave,
    markAsChanged,
    hasUnsavedChanges,
    lastSaved,
  } = useFormPersistence();

  const loadBackupRef = useRef(loadBackup);

  const profileForm = useForm<ProfileEssentialsFormData>({
    resolver: zodResolver(profileEssentialsSchema),
    defaultValues: {
      name: user.name,
      shortBio: inititalCaregiver?.data.shortBio ?? "",
      profilePhoto: inititalCaregiver?.caregiverImageUrl ?? "",
      profileName: inititalCaregiver?.publicName ?? "",
    },
    reValidateMode: "onBlur",
  });

  const storyForm = useForm<StoryAndSocialFormData>({
    resolver: zodResolver(storyAndSocialSchema),
    defaultValues: {
      story: inititalCaregiver?.data.descriptionMarkdown ?? "",
      instagram: inititalCaregiver?.data.socialMedia?.instagram ?? "",
      facebook: inititalCaregiver?.data.socialMedia?.facebook ?? "",
      youtube: inititalCaregiver?.data.socialMedia?.youtube ?? "",
      whatsapp: inititalCaregiver?.data.socialMedia?.whatsapp ?? "",
    },
    reValidateMode: "onBlur",
  });

  const locationForm = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      zipCode: inititalCaregiver?.address?.zipCode ?? "",
      street: inititalCaregiver?.address?.street ?? "",
      number: inititalCaregiver?.address?.number ?? "",
      complement: inititalCaregiver?.address?.complement ?? "",
      neighborhood: inititalCaregiver?.address?.neighborhood ?? "",
      city: inititalCaregiver?.address?.city ?? "",
      state: inititalCaregiver?.address?.state ?? "",
      country: inititalCaregiver?.address?.country ?? "Brasil",
    },
    reValidateMode: "onBlur",
  });

  const galleryForm = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      coverImage: inititalCaregiver?.data?.galleryImages?.cover?.url ?? "",
      galleryPhotos:
        inititalCaregiver?.data?.galleryImages?.photos?.map(
          (photo) => photo.url
        ) ?? [],
    },
    reValidateMode: "onBlur",
  });

  const petsForm = useForm<PetsInCareFormData>({
    resolver: zodResolver(petsInCareSchema),
    defaultValues: {
      pets: inititalCaregiver?.data.petsInCare ?? [],
    },
    reValidateMode: "onBlur",
  });

  const billingForm = useForm<BillingAndExpensesFormData>({
    resolver: zodResolver(billingAndExpensesSchema),
    defaultValues: {
      pixKey: inititalCaregiver?.pixKey ?? "",
      expenses: inititalCaregiver?.data.expenses ?? [],
      ongoingCases: inititalCaregiver?.data.ongoingCases ?? [],
    },
    reValidateMode: "onBlur",
  });

  // Load backup on mount
  useEffect(() => {
    const backup = loadBackupRef.current();

    if (!backup) return;

    if (backup.profileEssentials) {
      profileForm.reset(backup.profileEssentials as ProfileEssentialsFormData);
    }

    if (backup.storyAndSocial) {
      storyForm.reset(backup.storyAndSocial as StoryAndSocialFormData);
    }

    if (backup.location) {
      locationForm.reset(backup.location as LocationFormData);
    }

    if (backup.gallery) {
      galleryForm.reset(backup.gallery as GalleryFormData);
    }

    if (backup.petsInCare) {
      petsForm.reset(backup.petsInCare as PetsInCareFormData);
    }

    if (backup.billingAndExpenses) {
      billingForm.reset(
        backup.billingAndExpenses as BillingAndExpensesFormData
      );
    }

    if (backup.completedSteps && Array.isArray(backup.completedSteps)) {
      setCompletedSteps(new Set(backup.completedSteps as OnboardingStepEnum[]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup auto-save
  useEffect(() => {
    const forms = {
      profileEssentials: profileForm,
      storyAndSocial: storyForm,
      location: locationForm,
      gallery: galleryForm,
      petsInCare: petsForm,
      billingAndExpenses: billingForm,
    };

    return setupAutoSave(forms, completedSteps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedSteps]);

  // Watch for changes in all forms
  useEffect(() => {
    const subscriptions = [
      profileForm.watch(() => markAsChanged()),
      storyForm.watch(() => markAsChanged()),
      locationForm.watch(() => markAsChanged()),
      galleryForm.watch(() => markAsChanged()),
      petsForm.watch(() => markAsChanged()),
      billingForm.watch(() => markAsChanged()),
    ];

    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe.unsubscribe());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual save function
  const handleManualSave = () => {
    const data = {
      profileEssentials: profileForm.getValues(),
      storyAndSocial: storyForm.getValues(),
      location: locationForm.getValues(),
      gallery: galleryForm.getValues(),
      petsInCare: petsForm.getValues(),
      billingAndExpenses: billingForm.getValues(),
      completedSteps: Array.from(completedSteps),
    };
    saveBackup(data);
  };

  const getCurrentForm = () => {
    switch (currentStep) {
      case OnboardingStepEnum.PROFILE_ESSENTIALS:
        return profileForm;
      case OnboardingStepEnum.STORY_AND_SOCIAL:
        return storyForm;
      case OnboardingStepEnum.LOCATION:
        return locationForm;
      case OnboardingStepEnum.GALLERY:
        return galleryForm;
      case OnboardingStepEnum.PETS_IN_CARE:
        return petsForm;
      case OnboardingStepEnum.BILLING_AND_EXPENSES:
        return billingForm;
      default:
        return profileForm;
    }
  };

  const handleNext = async () => {
    const form = getCurrentForm();
    const isValid = await form.trigger();

    if (isValid) {
      markStepAsCompleted(currentStep);
      goToNextStep();
    }
  };

  const handlePrevious = () => {
    goToPreviousStep();
  };

  const handleSubmit = async () => {
    // Validate all forms and collect errors
    const validations = [
      {
        step: OnboardingStepEnum.PROFILE_ESSENTIALS,
        form: profileForm,
        name: "Informações Essenciais",
      },
      {
        step: OnboardingStepEnum.STORY_AND_SOCIAL,
        form: storyForm,
        name: "Sua História",
      },
      {
        step: OnboardingStepEnum.LOCATION,
        form: locationForm,
        name: "Localização",
      },
      {
        step: OnboardingStepEnum.GALLERY,
        form: galleryForm,
        name: "Galeria de Fotos",
      },
      {
        step: OnboardingStepEnum.PETS_IN_CARE,
        form: petsForm,
        name: "Pets sob Cuidado",
      },
      {
        step: OnboardingStepEnum.BILLING_AND_EXPENSES,
        form: billingForm,
        name: "Cobrança e Despesas",
      },
    ];

    for (const validation of validations) {
      const isValid = await validation.form.trigger();

      if (!isValid) {
        setCurrentStep(validation.step);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);

        return;
      }
    }

    // All forms are valid, combine and submit
    const completeData = {
      profileEssentials: profileForm.getValues(),
      storyAndSocial: storyForm.getValues(),
      location: locationForm.getValues(),
      gallery: galleryForm.getValues(),
      petsInCare: petsForm.getValues(),
      billingAndExpenses: billingForm.getValues(),
    };

    console.log("Complete onboarding data:", completeData);
    sessionStorage.setItem("onboardingData", JSON.stringify(completeData));
    // TODO: Submit to API
  };

  const renderStep = () => {
    const formMap = {
      [OnboardingStepEnum.PROFILE_ESSENTIALS]: (
        <Form {...profileForm}>
          <ProfileEssentials />
        </Form>
      ),
      [OnboardingStepEnum.STORY_AND_SOCIAL]: (
        <Form {...storyForm}>
          <StoryAndSocial />
        </Form>
      ),
      [OnboardingStepEnum.LOCATION]: (
        <Form {...locationForm}>
          <Location />
        </Form>
      ),
      [OnboardingStepEnum.GALLERY]: (
        <Form {...galleryForm}>
          <Gallery />
        </Form>
      ),
      [OnboardingStepEnum.PETS_IN_CARE]: (
        <Form {...petsForm}>
          <PetsInCare />
        </Form>
      ),
      [OnboardingStepEnum.BILLING_AND_EXPENSES]: (
        <Form {...billingForm}>
          <BillingAndExpenses />
        </Form>
      ),
    };

    return formMap[currentStep];
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* Unsaved Changes Banner - Only show in edit mode */}
      {isEditMode && (
        <UnsavedChangesBanner
          hasUnsavedChanges={hasUnsavedChanges}
          lastSaved={lastSaved}
          onSave={handleManualSave}
        />
      )}

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-16">
        <div className="max-w-2xl mx-auto pb-32 md:pb-24">{renderStep()}</div>
      </div>

      {/* Footer Navigation */}
      <FooterNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
