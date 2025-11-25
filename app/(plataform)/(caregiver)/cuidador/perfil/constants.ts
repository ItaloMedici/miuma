export enum OnboardingStepEnum {
  PROFILE_ESSENTIALS = "PROFILE_ESSENTIALS",
  STORY_AND_SOCIAL = "STORY_AND_SOCIAL",
  LOCATION_AND_MEDIA = "LOCATION_AND_MEDIA",
  PETS_IN_CARE = "PETS_IN_CARE",
  BILLING_AND_EXPENSES = "BILLING_AND_EXPENSES",
}

export const ONBOARDING_STEPS: Array<{
  id: OnboardingStepEnum;
  number: number;
  label: string;
}> = [
  {
    id: OnboardingStepEnum.PROFILE_ESSENTIALS,
    number: 1,
    label: "Informações Essenciais",
  },
  {
    id: OnboardingStepEnum.STORY_AND_SOCIAL,
    number: 2,
    label: "História e Redes",
  },
  {
    id: OnboardingStepEnum.LOCATION_AND_MEDIA,
    number: 3,
    label: "Localização e Mídia",
  },
  {
    id: OnboardingStepEnum.PETS_IN_CARE,
    number: 4,
    label: "Pets sob Cuidado",
  },
  {
    id: OnboardingStepEnum.BILLING_AND_EXPENSES,
    number: 5,
    label: "Cobrança e Despesas",
  },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;

export type OnboardingStep = {
  id: OnboardingStepEnum;
  number: number;
  label: string;
};
