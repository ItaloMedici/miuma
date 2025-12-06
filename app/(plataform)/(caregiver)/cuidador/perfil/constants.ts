export enum OnboardingStepEnum {
  PROFILE_ESSENTIALS = "PROFILE_ESSENTIALS",
  STORY = "STORY",
  LOCATION = "LOCATION",
  GALLERY = "GALLERY",
  PETS_IN_CARE = "PETS_IN_CARE",
  BILLING_AND_EXPENSES = "BILLING_AND_EXPENSES",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
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
    id: OnboardingStepEnum.STORY,
    number: 2,
    label: "História e Redes",
  },
  {
    id: OnboardingStepEnum.LOCATION,
    number: 3,
    label: "Localização",
  },
  {
    id: OnboardingStepEnum.SOCIAL_MEDIA,
    number: 4,
    label: "Redes Sociais",
  },
  {
    id: OnboardingStepEnum.GALLERY,
    number: 5,
    label: "Galeria de Fotos",
  },
  {
    id: OnboardingStepEnum.PETS_IN_CARE,
    number: 6,
    label: "Pets sob Cuidado",
  },
  {
    id: OnboardingStepEnum.BILLING_AND_EXPENSES,
    number: 7,
    label: "Cobrança e Despesas",
  },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;

export type OnboardingStep = {
  id: OnboardingStepEnum;
  number: number;
  label: string;
};
