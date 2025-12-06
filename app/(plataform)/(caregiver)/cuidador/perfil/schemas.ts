import * as z from "zod";
import { OnboardingStepEnum } from "./constants";

// Step 1: Profile Essentials
export const profileEssentialsSchema = z.object({
  profilePhoto: z.string().optional(),
  name: z.string(),
  profileName: z
    .string()
    .max(50, "Nome de perfil muito longo")
    .min(2, "Nome de perfil deve ter pelo menos 2 caracteres"),
  shortBio: z
    .string()
    .min(20, "Bio deve ter pelo menos 20 caracteres")
    .max(160, "Bio deve ter no máximo 160 caracteres"),
  slug: z
    .string()
    .min(3, "Slug deve ter pelo menos 3 caracteres")
    .max(50, "Slug muito longo")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug pode conter apenas letras, números, hífens e underscores"
    ),
});

export const STORY_MAX_LENGTH = 5000;
export const STORY_MIN_LENGTH = 100;

// Step 2: Story
export const storySchema = z.object({
  story: z
    .string()
    .min(STORY_MIN_LENGTH, "História deve ter pelo menos 100 caracteres")
    .max(STORY_MAX_LENGTH, "História muito longa"),
});

// Step 3: Location
export const locationSchema = z.object({
  zipCode: z
    .string()
    .min(1, "CEP é obrigatório")
    .refine((val) => /^[0-9]{5}-?[0-9]{3}$/.test(val), {
      message: "CEP inválido",
    }),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Selecione um estado"),
  country: z.string(),
});

// Step 4: Gallery
export const gallerySchema = z.object({
  coverImage: z.string().optional().nullable(),
  coverImageDescription: z.string().optional(),
  galleryPhotos: z
    .array(
      z.object({
        url: z.string(),
        description: z.string().optional(),
      })
    )
    .max(20, "Máximo de 20 fotos na galeria"),
});

// Step 5: Pet Schema
export const petSchema = z.object({
  name: z.string().min(2, "Nome do pet é obrigatório"),
  age: z
    .number()
    .min(0, "Idade não pode ser negativa")
    .max(30, "Idade máxima é 30 anos")
    .optional(),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição muito longa"),
  photo: z.string().optional(),
  rescueDate: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
      },
      { message: "Data de resgate inválida ou no futuro" }
    ),
  medicalNeeds: z.string().optional(),
  id: z.string(),
});

export const petsInCareSchema = z.object({
  pets: z.array(petSchema).min(1, "Adicione pelo menos um pet"),
});

// Step 6: Billing & Expenses
export const expenseSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().min(5, "Descrição é obrigatória"),
  amount: z.number().min(0, "Valor deve ser positivo"),
});

export const ongoingCaseSchema = z.object({
  id: z.string().optional(),
  petName: z.string().min(1, "Nome do pet é obrigatório"),
  title: z.string().min(5, "Título é obrigatório"),
  targetAmount: z.number().min(1, "Meta deve ser positiva"),
  currentAmount: z.number().min(0, "Valor atual inválido"),
  photo: z.string().optional(),
});

export const billingAndExpensesSchema = z.object({
  pixKey: z
    .string()
    .min(1, "Chave Pix é obrigatória")
    .max(100, "Chave Pix muito longa"),
  expenses: z.array(expenseSchema).optional(),
  ongoingCases: z.array(ongoingCaseSchema).optional(),
});

export const socialMediaSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  whatsapp: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido")
    .optional()
    .or(z.literal("")),
  tiktok: z.string().optional(),
  website: z.url("URL inválida").optional().or(z.literal("")),
});

export const caregiverProfileFormSchema = z.object({
  profileEssentials: profileEssentialsSchema,
  story: storySchema,
  location: locationSchema,
  socialMedia: socialMediaSchema,
  gallery: gallerySchema,
  petsInCare: petsInCareSchema,
  billingAndExpenses: billingAndExpensesSchema,
});

export type ProfileEssentialsFormData = z.infer<typeof profileEssentialsSchema>;
export type StoryFormData = z.infer<typeof storySchema>;
export type SocialMediaFormData = z.infer<typeof socialMediaSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type GalleryFormData = z.infer<typeof gallerySchema>;
export type PetFormData = z.infer<typeof petSchema>;
export type PetsInCareFormData = z.infer<typeof petsInCareSchema>;
export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type OngoingCaseFormData = z.infer<typeof ongoingCaseSchema>;
export type BillingAndExpensesFormData = z.infer<
  typeof billingAndExpensesSchema
>;
export type CaregiverProfileFormData = z.infer<
  typeof caregiverProfileFormSchema
>;

export type AggregateProfileFormSchema =
  | ProfileEssentialsFormData
  | StoryFormData
  | LocationFormData
  | GalleryFormData
  | PetsInCareFormData
  | BillingAndExpensesFormData;

export const STEP_SCHEMA_MAP = {
  [OnboardingStepEnum.PROFILE_ESSENTIALS]: profileEssentialsSchema,
  [OnboardingStepEnum.STORY]: storySchema,
  [OnboardingStepEnum.SOCIAL_MEDIA]: socialMediaSchema,
  [OnboardingStepEnum.LOCATION]: locationSchema,
  [OnboardingStepEnum.GALLERY]: gallerySchema,
  [OnboardingStepEnum.PETS_IN_CARE]: petsInCareSchema,
  [OnboardingStepEnum.BILLING_AND_EXPENSES]: billingAndExpensesSchema,
} as const;

export type StepFormDataMap = {
  [OnboardingStepEnum.PROFILE_ESSENTIALS]: ProfileEssentialsFormData;
  [OnboardingStepEnum.STORY]: StoryFormData;
  [OnboardingStepEnum.SOCIAL_MEDIA]: SocialMediaFormData;
  [OnboardingStepEnum.LOCATION]: LocationFormData;
  [OnboardingStepEnum.GALLERY]: GalleryFormData;
  [OnboardingStepEnum.PETS_IN_CARE]: PetsInCareFormData;
  [OnboardingStepEnum.BILLING_AND_EXPENSES]: BillingAndExpensesFormData;
};

export type StepToFormKey<T extends OnboardingStepEnum> =
  T extends OnboardingStepEnum.PROFILE_ESSENTIALS
    ? "profileEssentials"
    : T extends OnboardingStepEnum.STORY
      ? "story"
      : T extends OnboardingStepEnum.SOCIAL_MEDIA
        ? "socialMedia"
        : T extends OnboardingStepEnum.LOCATION
          ? "location"
          : T extends OnboardingStepEnum.GALLERY
            ? "gallery"
            : T extends OnboardingStepEnum.PETS_IN_CARE
              ? "petsInCare"
              : T extends OnboardingStepEnum.BILLING_AND_EXPENSES
                ? "billingAndExpenses"
                : never;

export type OnboardingFormsMap = {
  [K in OnboardingStepEnum as StepToFormKey<K>]: StepFormDataMap[K];
};
