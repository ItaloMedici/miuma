import { CaregiverProfileFormData } from "@/app/(plataform)/(caregiver)/cuidador/perfil/schemas";
import { db } from "@/db";
import { addresses, caregiversTable } from "@/db/schema";
import { CaregiverDataJson, CaregiverEntity } from "@/interfaces/caregiver";
import { caregivers } from "@/lib/mock/caregiver";
import { eq } from "drizzle-orm";
import { addressUseCases } from "../address";

async function getCaregiverByProfileSlug(profileSlug: string) {
  return caregivers.find((caregiver) => caregiver.profileSlug === profileSlug);
}

async function getCaregiverBySlug(slug: string) {
  const result = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.profileSlug, slug))
    .limit(1);

  if (result.length === 0) return null;

  return result[0];
}

function parseDataJson(caregiver: CaregiverEntity) {
  return JSON.parse(caregiver.data) as CaregiverDataJson;
}

async function getCaregiverByUserId(userId: string) {
  const result = await db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.userId, userId))
    .innerJoin(addresses, eq(addresses.id, caregiversTable.addressId));

  if (result.length === 0) return;

  return {
    ...result[0].caregivers,
    address: result[0].addresses,
  };
}

function parseFormDataToJson(
  data: CaregiverProfileFormData
): CaregiverDataJson {
  return {
    galleryImages: {
      cover: {
        url: "TODO",
        alt: "TODO",
      },
      photos: [],
    },
    descriptionMarkdown: data.story.story,
    ongoingCases: [],
    recentUpdates: [],
    socialProof: {
      testimonials: [],
      totalSupporters: 0,
    },
    petsInCare: data.petsInCare.pets.map((pet) => ({
      name: pet.name,
      description: pet.description,
      imageUrl: pet.photo ?? "",
      age: pet.age,
      rescueDate: pet.rescueDate,
      medicalNeeds: pet.medicalNeeds,
    })),
    expenses: [],
    socialMedia: {
      instagram: data.socialMedia.instagram,
      facebook: data.socialMedia.facebook,
      whatsapp: data.socialMedia.whatsapp,
      youtube: data.socialMedia.youtube,
      tiktok: data.socialMedia.tiktok,
      website: data.socialMedia.website,
    },
  };
}

async function createCaregiverProfile(
  userId: string,
  data: CaregiverProfileFormData
) {
  const address = await addressUseCases.create(data.location);

  const caregiverResult = await db
    .insert(caregiversTable)
    .values({
      userId,
      profileSlug: data.profileEssentials.slug,
      publicName: data.profileEssentials.profileName,
      caregiverImageUrl: data.profileEssentials.profilePhoto,
      accountVerified: false,
      shortBio: data.profileEssentials.shortBio,
      active: true,
      pixKey: data.billingAndExpenses.pixKey,
      subscriptionPaymentStatus: "DISABLED",
      addressId: address.id,
      data: parseFormDataToJson(data),
    })
    .returning();

  return caregiverResult[0];
}

async function updateProfile(userId: string, data: CaregiverProfileFormData) {
  const caregiver = await getCaregiverByUserId(userId);

  if (!caregiver) {
    return createCaregiverProfile(userId, data);
  }

  if (caregiver.addressId) {
    await addressUseCases.update(caregiver.addressId, data.location);
  }

  const updatedDataJson = parseFormDataToJson(data);

  const caregiverResult = await db
    .update(caregiversTable)
    .set({
      profileSlug: data.profileEssentials.slug,
      publicName: data.profileEssentials.profileName,
      caregiverImageUrl: data.profileEssentials.profilePhoto,
      shortBio: data.profileEssentials.shortBio,
      pixKey: data.billingAndExpenses.pixKey,
      data: updatedDataJson,
    })
    .where(eq(caregiversTable.userId, userId))
    .returning();

  return caregiverResult[0];
}

async function getAll({ limit }: { limit?: number } = {}) {
  const query = db
    .select()
    .from(caregiversTable)
    .where(eq(caregiversTable.active, true));

  if (limit) {
    query.limit(limit);
  }

  const result = await query;

  return result;
}

export const caregiverUseCases = {
  // Legacy support - will be removed
  getCaregiverByProfileSlug,
  parseDataJson,
  getCaregiverByProfileId: getCaregiverByProfileSlug,

  // Using real DB
  getBySlug: getCaregiverBySlug,
  getByUserId: getCaregiverByUserId,
  updateProfile,
  getAll,
};
