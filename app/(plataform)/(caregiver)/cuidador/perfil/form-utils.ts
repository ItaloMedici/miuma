import { CaregiverEntity } from "@/db/schema";
import { UseFormReturn } from "react-hook-form";
import { OnboardingStepEnum } from "./constants";
import {
  STEP_SCHEMA_MAP,
  type OnboardingFormsMap,
  type StepFormDataMap,
  type StepToFormKey,
} from "./schemas";

export function getStepSchema<T extends OnboardingStepEnum>(step: T) {
  return STEP_SCHEMA_MAP[step];
}

export function stepToFormKey<T extends OnboardingStepEnum>(
  step: T
): StepToFormKey<T> {
  const mapping: Record<
    OnboardingStepEnum,
    StepToFormKey<OnboardingStepEnum>
  > = {
    [OnboardingStepEnum.PROFILE_ESSENTIALS]: "profileEssentials",
    [OnboardingStepEnum.STORY]: "story",
    [OnboardingStepEnum.SOCIAL_MEDIA]: "socialMedia",
    [OnboardingStepEnum.LOCATION]: "location",
    [OnboardingStepEnum.GALLERY]: "gallery",
    [OnboardingStepEnum.PETS_IN_CARE]: "petsInCare",
    [OnboardingStepEnum.BILLING_AND_EXPENSES]: "billingAndExpenses",
  };

  return mapping[step] as StepToFormKey<T>;
}

export function getFormForStep<T extends OnboardingStepEnum>(
  forms: {
    [K in keyof OnboardingFormsMap]: UseFormReturn<OnboardingFormsMap[K]>;
  },
  step: T
): UseFormReturn<StepFormDataMap[T]> {
  const key = stepToFormKey(step);
  return forms[key] as UseFormReturn<StepFormDataMap[T]>;
}

export function validateOnboardingSteps(): void {
  const requiredSteps: OnboardingStepEnum[] = [
    OnboardingStepEnum.PROFILE_ESSENTIALS,
    OnboardingStepEnum.STORY,
    OnboardingStepEnum.SOCIAL_MEDIA,
    OnboardingStepEnum.LOCATION,
    OnboardingStepEnum.GALLERY,
    OnboardingStepEnum.PETS_IN_CARE,
    OnboardingStepEnum.BILLING_AND_EXPENSES,
  ];

  requiredSteps.forEach((step) => {
    const key = stepToFormKey(step);
    const schema = getStepSchema(step);
    if (!key || !schema) {
      throw new Error(`Missing mapping for step: ${step}`);
    }
  });
}

export function isValidFormKey(key: string): key is keyof OnboardingFormsMap {
  const validKeys: (keyof OnboardingFormsMap)[] = [
    "profileEssentials",
    "story",
    "socialMedia",
    "location",
    "gallery",
    "petsInCare",
    "billingAndExpenses",
  ];
  return validKeys.includes(key as keyof OnboardingFormsMap);
}

export function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

export const checkCompletedSteps = (caregiver: Partial<CaregiverEntity>) => {
  const completedSteps = new Set<OnboardingStepEnum>();

  const completedProfileEssentials = STEP_SCHEMA_MAP[
    OnboardingStepEnum.PROFILE_ESSENTIALS
  ].safeParse({
    name: caregiver.publicName,
    shortBio: caregiver.shortBio,
    profileName: caregiver.publicName,
    profilePhoto: caregiver.caregiverImageUrl,
    slug: caregiver.profileSlug,
  }).success;

  if (completedProfileEssentials) {
    completedSteps.add(OnboardingStepEnum.PROFILE_ESSENTIALS);
  }

  const completedStory = STEP_SCHEMA_MAP[OnboardingStepEnum.STORY].safeParse({
    story: caregiver.data?.descriptionMarkdown,
  }).success;

  if (completedStory) {
    completedSteps.add(OnboardingStepEnum.STORY);
  }

  const completedSocialMedia = STEP_SCHEMA_MAP[
    OnboardingStepEnum.SOCIAL_MEDIA
  ].safeParse({
    ...caregiver.data?.socialMedia,
  }).success;

  if (completedSocialMedia) {
    completedSteps.add(OnboardingStepEnum.SOCIAL_MEDIA);
  }

  const completedLocation = STEP_SCHEMA_MAP[
    OnboardingStepEnum.LOCATION
  ].safeParse({
    ...caregiver.address,
  }).success;

  if (completedLocation) {
    completedSteps.add(OnboardingStepEnum.LOCATION);
  }

  const completedGallery = STEP_SCHEMA_MAP[
    OnboardingStepEnum.GALLERY
  ].safeParse({
    coverImage: caregiver.data?.galleryImages?.cover?.url,
    coverImageDescription: caregiver.data?.galleryImages?.cover?.alt,
    galleryPhotos: caregiver.data?.galleryImages?.photos.map((photo) => ({
      url: photo.url,
      description: photo.alt,
    })),
  }).success;

  if (completedGallery) {
    completedSteps.add(OnboardingStepEnum.GALLERY);
  }

  const completedPetsInCare = STEP_SCHEMA_MAP[
    OnboardingStepEnum.PETS_IN_CARE
  ].safeParse({
    pets: caregiver.data?.petsInCare.map((pet) => ({
      name: pet.name,
      description: pet.description,
      age: pet.age,
      photo: pet.imageUrl,
      rescueDate: pet.rescueDate,
      medicalNeeds: pet.medicalNeeds,
      id: pet.id,
    })),
  }).success;

  if (completedPetsInCare) {
    completedSteps.add(OnboardingStepEnum.PETS_IN_CARE);
  }

  const completedBillingAndExpenses = STEP_SCHEMA_MAP[
    OnboardingStepEnum.BILLING_AND_EXPENSES
  ].safeParse({
    billingAndExpenses: caregiver.data?.expenses,
  }).success;

  if (completedBillingAndExpenses) {
    completedSteps.add(OnboardingStepEnum.BILLING_AND_EXPENSES);
  }

  const missingSteps = Object.values(OnboardingStepEnum).filter(
    (step) => !completedSteps.has(step)
  );

  return {
    completedSteps: completedSteps,
    totalCompleted: completedSteps.size,
    missingSteps,
  };
};
