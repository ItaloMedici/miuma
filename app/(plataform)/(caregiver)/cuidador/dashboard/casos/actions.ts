"use server";

import { OngoingCase } from "@/interfaces/caregiver";
import { getServerSession } from "@/lib/auth-server";
import { ongoingCasesUseCases } from "@/use-cases/ongoing-cases";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getOngoingCases() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/entrar");
  }

  const cases = await ongoingCasesUseCases.getAll(session.user.id);

  return cases;
}

export async function addOngoingCase(
  caseData: Omit<OngoingCase, "id" | "currentAmount">
) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/entrar");
  }

  const newCase = await ongoingCasesUseCases.create(session.user.id, caseData);

  revalidatePath("/cuidador/dashboard/casos");
  return newCase;
}

export async function updateOngoingCase(
  caseId: string,
  caseData: Partial<Omit<OngoingCase, "currentAmount">>
) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/entrar");
  }

  await ongoingCasesUseCases.update(session.user.id, caseId, caseData);

  revalidatePath("/cuidador/dashboard/casos");
}

export async function deleteOngoingCase(caseId: string) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/entrar");
  }

  await ongoingCasesUseCases.remove(session.user.id, caseId);

  revalidatePath("/cuidador/dashboard/casos");
}
