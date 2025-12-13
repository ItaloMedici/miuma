import { db } from "@/db";
import { caregiversTable } from "@/db/schema";
import { CaregiverDataJson, OngoingCase } from "@/interfaces/caregiver";
import { imageClient } from "@/lib/image-client";
import { logger } from "better-auth";
import { eq } from "drizzle-orm";

async function getCaregiverData(userId: string): Promise<{
  id: string;
  data: CaregiverDataJson;
} | null> {
  const result = await db
    .select({
      id: caregiversTable.id,
      data: caregiversTable.data,
    })
    .from(caregiversTable)
    .where(eq(caregiversTable.userId, userId))
    .limit(1);

  if (!result[0]) return null;

  return {
    id: result[0].id,
    data: result[0].data as CaregiverDataJson,
  };
}

async function updateCaregiverData(
  userId: string,
  data: CaregiverDataJson
): Promise<void> {
  await db
    .update(caregiversTable)
    .set({
      data,
      updatedAt: new Date(),
    })
    .where(eq(caregiversTable.userId, userId));
}

async function getAll(userId: string): Promise<OngoingCase[]> {
  const caregiver = await getCaregiverData(userId);

  if (!caregiver) {
    return [];
  }

  return caregiver.data.ongoingCases || [];
}

async function getById(
  userId: string,
  caseId: string
): Promise<OngoingCase | null> {
  const cases = await getAll(userId);
  return cases.find((c) => c.id === caseId) || null;
}

async function create(
  userId: string,
  caseData: Omit<OngoingCase, "id" | "currentAmount">
): Promise<OngoingCase> {
  const caregiver = await getCaregiverData(userId);

  if (!caregiver) {
    throw new Error("Cuidador não encontrado");
  }

  const newCase: OngoingCase = {
    ...caseData,
    id: crypto.randomUUID(),
    currentAmount: 0,
  };

  const updatedData: CaregiverDataJson = {
    ...caregiver.data,
    ongoingCases: [...(caregiver.data.ongoingCases || []), newCase],
  };

  await updateCaregiverData(userId, updatedData);

  return newCase;
}

async function update(
  userId: string,
  caseId: string,
  caseData: Partial<Omit<OngoingCase, "currentAmount">>
): Promise<void> {
  const caregiver = await getCaregiverData(userId);

  if (!caregiver) {
    throw new Error("Cuidador não encontrado");
  }

  const updatedCases = (caregiver.data.ongoingCases || []).map((c) =>
    c.id === caseId ? { ...c, ...caseData } : c
  );

  const updatedData: CaregiverDataJson = {
    ...caregiver.data,
    ongoingCases: updatedCases,
  };

  await updateCaregiverData(userId, updatedData);
}

async function remove(userId: string, caseId: string): Promise<void> {
  const caregiver = await getCaregiverData(userId);

  if (!caregiver) {
    throw new Error("Cuidador não encontrado");
  }

  const currentCase = (caregiver.data.ongoingCases || []).find(
    (c) => c.id === caseId
  );

  if (!currentCase) {
    throw new Error("Caso não encontrado");
  }

  // Remove image if exists
  if (currentCase.imageUrl) {
    const result = await imageClient.remove(currentCase.imageUrl);

    if (!result.success) {
      logger.error(
        "Erro ao apagar imagem do caso de arrecadação:",
        result.error
      );
      throw new Error("Erro ao apagar caso, tente novamente mais tarde.");
    }
  }

  const updatedCases = (caregiver.data.ongoingCases || []).filter(
    (c) => c.id !== caseId
  );

  const updatedData: CaregiverDataJson = {
    ...caregiver.data,
    ongoingCases: updatedCases,
  };

  await updateCaregiverData(userId, updatedData);
}

export const ongoingCasesUseCases = {
  getAll,
  getById,
  create,
  update,
  remove,
};
