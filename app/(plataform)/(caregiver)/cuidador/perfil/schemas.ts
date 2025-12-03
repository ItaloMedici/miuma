import * as z from "zod";

// Step 1: Profile Essentials
export const profileEssentialsSchema = z.object({
  profilePhoto: z.string().optional(),
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome muito longo"),
  profileName: z.string().max(101, "Nome de perfil muito longo").optional(),
  shortBio: z
    .string()
    .min(20, "Bio deve ter pelo menos 20 caracteres")
    .max(160, "Bio deve ter no máximo 160 caracteres"),
});

// Step 2: Story & Social
export const storyAndSocialSchema = z.object({
  story: z
    .string()
    .min(100, "História deve ter pelo menos 100 caracteres")
    .max(5000, "História muito longa"),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  whatsapp: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido")
    .optional()
    .or(z.literal("")),
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
  coverImage: z.string().optional(),
  galleryPhotos: z.array(z.string()).max(20, "Máximo de 20 fotos na galeria"),
});

// Backward compatibility - will be deprecated
export const locationAndMediaSchema = z.object({
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Selecione um estado"),
  country: z.string(),
  coverImage: z.string().optional(),
  street: z.string().min(1, "Rua é obrigatória"),
  zipCode: z
    .string()
    .min(1, "CEP é obrigatório")
    .refine((val) => /^[0-9]{5}-?[0-9]{3}$/.test(val), {
      message: "CEP inválido",
    }),
  galleryPhotos: z.array(z.string()).max(10, "Máximo de 10 fotos na galeria"),
});

// Step 5: Pet Schema
export const petSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nome do pet é obrigatório"),
  species: z.enum(["dog", "cat", "other"]).optional(),
  age: z.number().min(0, "Idade inválida").max(30, "Idade inválida").optional(),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição muito longa"),
  photo: z.string().optional(),
  rescueDate: z.string().optional(),
  medicalNeeds: z.string().optional(),
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

// Complete onboarding schema
export const caregiverProfileFormSchema = z.object({
  profileEssentials: profileEssentialsSchema,
  storyAndSocial: storyAndSocialSchema,
  location: locationSchema,
  gallery: gallerySchema,
  petsInCare: petsInCareSchema,
  billingAndExpenses: billingAndExpensesSchema,
});

// Type exports
export type ProfileEssentialsFormData = z.infer<typeof profileEssentialsSchema>;
export type StoryAndSocialFormData = z.infer<typeof storyAndSocialSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type GalleryFormData = z.infer<typeof gallerySchema>;
export type LocationAndMediaFormData = z.infer<typeof locationAndMediaSchema>;
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
