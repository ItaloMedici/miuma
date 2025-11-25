"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  BillingAndExpenses,
  LocationAndMedia,
  PetsInCare,
  ProfileEssentials,
  StoryAndSocial,
} from ".";
import { useOnboarding } from "../context";
import { useFormPersistence } from "../hooks/useFormPersistence";
import {
  BillingAndExpensesFormData,
  billingAndExpensesSchema,
  LocationAndMediaFormData,
  locationAndMediaSchema,
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

interface OnboardingFormProps {
  profileId?: string;
}

export function OnboardingForm({ profileId }: OnboardingFormProps) {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    markStepAsCompleted,
    completedSteps,
    setCompletedSteps,
  } = useOnboarding();

  // Only show unsaved changes banner in edit mode (when profileId exists)
  const isEditMode = Boolean(profileId);

  const {
    loadBackup,
    saveBackup,
    setupAutoSave,
    markAsChanged,
    hasUnsavedChanges,
    lastSaved,
  } = useFormPersistence();

  // Separate forms for each step
  const profileForm = useForm<ProfileEssentialsFormData>({
    resolver: zodResolver(profileEssentialsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      shortBio: "",
      profilePhoto: "",
      profileName: "",
    },
    reValidateMode: "onBlur",
  });

  const storyForm = useForm<StoryAndSocialFormData>({
    resolver: zodResolver(storyAndSocialSchema),
    defaultValues: {
      story: "",
      instagram: "",
      facebook: "",
      youtube: "",
      whatsapp: "",
    },
    reValidateMode: "onBlur",
  });

  const locationForm = useForm<LocationAndMediaFormData>({
    resolver: zodResolver(locationAndMediaSchema),
    defaultValues: {
      city: "",
      state: "",
      country: "Brasil",
      coverImage: "",
      galleryPhotos: [],
    },
    reValidateMode: "onBlur",
  });

  const petsForm = useForm<PetsInCareFormData>({
    resolver: zodResolver(petsInCareSchema),
    defaultValues: {
      pets: [],
    },
    reValidateMode: "onBlur",
  });

  const billingForm = useForm<BillingAndExpensesFormData>({
    resolver: zodResolver(billingAndExpensesSchema),
    defaultValues: {
      pixKey: "",
      expenses: [],
      ongoingCases: [],
    },
    reValidateMode: "onBlur",
  });

  // Load backup on mount
  useEffect(() => {
    const backup = loadBackup();
    if (backup) {
      if (backup.profileEssentials) {
        profileForm.reset(
          backup.profileEssentials as ProfileEssentialsFormData
        );
      }
      if (backup.storyAndSocial) {
        storyForm.reset(backup.storyAndSocial as StoryAndSocialFormData);
      }
      if (backup.locationAndMedia) {
        locationForm.reset(backup.locationAndMedia as LocationAndMediaFormData);
      }
      if (backup.petsInCare) {
        petsForm.reset(backup.petsInCare as PetsInCareFormData);
      }
      if (backup.billingAndExpenses) {
        billingForm.reset(
          backup.billingAndExpenses as BillingAndExpensesFormData
        );
      }
      // Restore completed steps
      if (backup.completedSteps && Array.isArray(backup.completedSteps)) {
        setCompletedSteps(
          new Set(backup.completedSteps as OnboardingStepEnum[])
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup auto-save
  useEffect(() => {
    const forms = {
      profileEssentials: profileForm,
      storyAndSocial: storyForm,
      locationAndMedia: locationForm,
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
      locationAndMedia: locationForm.getValues(),
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
      case OnboardingStepEnum.LOCATION_AND_MEDIA:
        return locationForm;
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
        step: OnboardingStepEnum.LOCATION_AND_MEDIA,
        form: locationForm,
        name: "Localização e Mídia",
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
      locationAndMedia: locationForm.getValues(),
      petsInCare: petsForm.getValues(),
      billingAndExpenses: billingForm.getValues(),
    };

    console.log("Complete onboarding data:", completeData);
    sessionStorage.setItem("onboardingData", JSON.stringify(completeData));
    // TODO: Submit to API
  };

  const renderStep = () => {
    switch (currentStep) {
      case OnboardingStepEnum.PROFILE_ESSENTIALS:
        return (
          <Form {...profileForm}>
            <ProfileEssentials form={profileForm} />
          </Form>
        );
      case OnboardingStepEnum.STORY_AND_SOCIAL:
        return (
          <Form {...storyForm}>
            <StoryAndSocial form={storyForm} />
          </Form>
        );
      case OnboardingStepEnum.LOCATION_AND_MEDIA:
        return (
          <Form {...locationForm}>
            <LocationAndMedia form={locationForm} />
          </Form>
        );
      case OnboardingStepEnum.PETS_IN_CARE:
        return (
          <Form {...petsForm}>
            <PetsInCare form={petsForm} />
          </Form>
        );
      case OnboardingStepEnum.BILLING_AND_EXPENSES:
        return (
          <Form {...billingForm}>
            <BillingAndExpenses form={billingForm} />
          </Form>
        );
      default:
        return null;
    }
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
