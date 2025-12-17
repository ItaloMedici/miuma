"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  BillingInfo,
  CasesAndUpdates,
  Gallery,
  Location,
  PetsInCare,
  ProfileEssentials,
  Story,
} from ".";
import { ONBOARDING_STEPS, OnboardingStepEnum } from "../constants";
import { useOnboarding } from "../context";
import { useBeforeUnload } from "../hooks/useBeforeUnload";
import { useFormPersistence } from "../hooks/useFormPersistence";
import {
  PetFormData,
  STEP_SCHEMA_MAP,
  type OnboardingFormsMap,
  type StepFormDataMap,
} from "../schemas";
import { FooterNavigation } from "./FooterNavigation";
import { SocialMedia } from "./SocialMedia";
import { UnsavedChangesBanner } from "./UnsavedChangesBanner";

const formDefaultOptions = {
  reValidateMode: "onBlur",
  mode: "all",
} as const;

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
    handleSaveFormData,
  } = useOnboarding();

  const profileForm = useForm<
    StepFormDataMap[OnboardingStepEnum.PROFILE_ESSENTIALS]
  >({
    resolver: zodResolver(
      STEP_SCHEMA_MAP[OnboardingStepEnum.PROFILE_ESSENTIALS]
    ),
    defaultValues: {
      name: user.name,
      shortBio: inititalCaregiver?.shortBio ?? "",
      profilePhoto: inititalCaregiver?.caregiverImageUrl ?? "",
      profileName: inititalCaregiver?.publicName ?? user.name,
      slug:
        inititalCaregiver?.profileSlug ??
        user.name.toLowerCase().replace(/\s+/g, "-"),
    },
    ...formDefaultOptions,
  });

  const storyForm = useForm<StepFormDataMap[OnboardingStepEnum.STORY]>({
    resolver: zodResolver(STEP_SCHEMA_MAP[OnboardingStepEnum.STORY]),
    defaultValues: {
      story: inititalCaregiver?.data.descriptionMarkdown ?? "",
    },
    ...formDefaultOptions,
  });

  const socialMediaForm = useForm<
    StepFormDataMap[OnboardingStepEnum.SOCIAL_MEDIA]
  >({
    resolver: zodResolver(STEP_SCHEMA_MAP[OnboardingStepEnum.SOCIAL_MEDIA]),
    defaultValues: {
      instagram: inititalCaregiver?.data.socialMedia?.instagram,
      facebook: inititalCaregiver?.data.socialMedia?.facebook,
      youtube: inititalCaregiver?.data.socialMedia?.youtube,
      whatsapp: inititalCaregiver?.data.socialMedia?.whatsapp,
      tiktok: inititalCaregiver?.data.socialMedia?.tiktok,
      website: inititalCaregiver?.data.socialMedia?.website,
    },
    ...formDefaultOptions,
  });

  const locationForm = useForm<StepFormDataMap[OnboardingStepEnum.LOCATION]>({
    resolver: zodResolver(STEP_SCHEMA_MAP[OnboardingStepEnum.LOCATION]),
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
    ...formDefaultOptions,
  });

  const galleryForm = useForm<StepFormDataMap[OnboardingStepEnum.GALLERY]>({
    resolver: zodResolver(STEP_SCHEMA_MAP[OnboardingStepEnum.GALLERY]),
    defaultValues: {
      coverImage: inititalCaregiver?.data?.galleryImages?.cover?.url ?? "",
      coverImageDescription:
        inititalCaregiver?.data?.galleryImages?.cover?.alt ?? "",
      galleryPhotos:
        inititalCaregiver?.data?.galleryImages?.photos?.map((photo) => ({
          url: photo.url,
          description: photo.alt ?? "",
        })) ?? [],
    },
    ...formDefaultOptions,
  });

  const petsForm = useForm<StepFormDataMap[OnboardingStepEnum.PETS_IN_CARE]>({
    resolver: zodResolver(STEP_SCHEMA_MAP[OnboardingStepEnum.PETS_IN_CARE]),
    defaultValues: {
      pets:
        inititalCaregiver?.data.petsInCare.map<PetFormData>((pet) => ({
          ...pet,
          photo: pet.imageUrl,
        })) ?? [],
    },
    ...formDefaultOptions,
  });

  const billingInfoForm = useForm<
    StepFormDataMap[OnboardingStepEnum.BILLING_INFO]
  >({
    resolver: zodResolver(STEP_SCHEMA_MAP[OnboardingStepEnum.BILLING_INFO]),
    defaultValues: {
      pixKey: inititalCaregiver?.pixKey ?? "",
    },
    ...formDefaultOptions,
  });

  const casesAndUpdatesForm = useForm<
    StepFormDataMap[OnboardingStepEnum.CASES_AND_UPDATES]
  >({
    resolver: zodResolver(
      STEP_SCHEMA_MAP[OnboardingStepEnum.CASES_AND_UPDATES]
    ),
    defaultValues: {
      ongoingCases: inititalCaregiver?.data.ongoingCases ?? [],
      recentUpdates: inititalCaregiver?.data.recentUpdates ?? [],
    },
    ...formDefaultOptions,
  });

  const { saveBackup, hasUnsavedChanges, lastSaved, clearBackup } =
    useFormPersistence({
      forms: {
        profileEssentials: profileForm,
        story: storyForm,
        socialMedia: socialMediaForm,
        location: locationForm,
        gallery: galleryForm,
        petsInCare: petsForm,
        billingInfo: billingInfoForm,
        casesAndUpdates: casesAndUpdatesForm,
      },
      completedSteps,
      setCompletedSteps,
    });

  useBeforeUnload(hasUnsavedChanges);

  const getFormMap = () => {
    const formMap: Record<OnboardingStepEnum, UseFormReturn<any>> = {
      [OnboardingStepEnum.PROFILE_ESSENTIALS]: profileForm,
      [OnboardingStepEnum.STORY]: storyForm,
      [OnboardingStepEnum.LOCATION]: locationForm,
      [OnboardingStepEnum.GALLERY]: galleryForm,
      [OnboardingStepEnum.PETS_IN_CARE]: petsForm,
      [OnboardingStepEnum.BILLING_INFO]: billingInfoForm,
      [OnboardingStepEnum.CASES_AND_UPDATES]: casesAndUpdatesForm,
      [OnboardingStepEnum.SOCIAL_MEDIA]: socialMediaForm,
    };

    return formMap;
  };

  const getCurrentForm = () => {
    return getFormMap()[currentStep];
  };

  const handleNext = async () => {
    const form = getCurrentForm();

    if (currentStep === OnboardingStepEnum.PROFILE_ESSENTIALS) {
      const slug = profileForm.getValues("slug");
      const isDirty = profileForm.formState.dirtyFields.slug;

      if (slug && isDirty) {
        const { checkSlugAvailability } = await import("../action");
        const result = await checkSlugAvailability(slug);

        if (!result.available) {
          profileForm.setError("slug", {
            type: "manual",
            message: result.message,
          });
          return;
        }
      }
    }

    const isValid = await form.trigger();

    console.log("Form valid:", isValid, form.getValues());

    if (isValid) {
      markStepAsCompleted(currentStep);
      goToNextStep();
    }

    // focus and scroll on the element invalid element
    const firstError = Object.keys(form.formState.errors)[0];
    if (firstError) {
      const errorElement = document.querySelector(
        `[name="${firstError}"]`
      ) as HTMLElement;

      if (errorElement) {
        errorElement.focus();
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handlePrevious = () => {
    goToPreviousStep();
  };

  const handleSubmit = async () => {
    for (const steps of ONBOARDING_STEPS) {
      const isValid = await getFormMap()[steps.id].trigger();

      if (!isValid) {
        setCurrentStep(steps.id);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);

        return;
      }
    }

    const completeData: OnboardingFormsMap = {
      profileEssentials: profileForm.getValues(),
      story: storyForm.getValues(),
      socialMedia: socialMediaForm.getValues(),
      location: locationForm.getValues(),
      gallery: galleryForm.getValues(),
      petsInCare: petsForm.getValues(),
      billingInfo: billingInfoForm.getValues(),
      casesAndUpdates: casesAndUpdatesForm.getValues(),
    };

    saveBackup();

    handleSaveFormData(completeData, () => {
      clearBackup();
    });
  };

  const renderStep = () => {
    const formMap: Record<OnboardingStepEnum, ReactNode> = {
      [OnboardingStepEnum.PROFILE_ESSENTIALS]: (
        <Form {...profileForm}>
          <ProfileEssentials />
        </Form>
      ),
      [OnboardingStepEnum.STORY]: (
        <Form {...storyForm}>
          <Story />
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
      [OnboardingStepEnum.BILLING_INFO]: (
        <Form {...billingInfoForm}>
          <BillingInfo />
        </Form>
      ),
      [OnboardingStepEnum.CASES_AND_UPDATES]: (
        <Form {...casesAndUpdatesForm}>
          <CasesAndUpdates />
        </Form>
      ),
      [OnboardingStepEnum.SOCIAL_MEDIA]: (
        <Form {...socialMediaForm}>
          <SocialMedia />
        </Form>
      ),
    };

    return formMap[currentStep];
  };

  return (
    <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
      {/* Unsaved Changes Banner - Only show in edit mode */}
      {isEditMode && (
        <UnsavedChangesBanner
          hasUnsavedChanges={hasUnsavedChanges}
          lastSaved={lastSaved}
          onSave={saveBackup}
        />
      )}

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 lg:p-16">
        <div className="mx-auto max-w-2xl pb-32 md:pb-24">{renderStep()}</div>
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
