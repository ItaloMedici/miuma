"use server";

import { getServerSession } from "@/lib/auth-server";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

export const getCachedDashboardCaregiver = cache(async () => {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/entrar");
  }

  const caregiver = await caregiverUseCases.getByUserId(session.user.id);

  if (!caregiver) {
    notFound();
  }

  return caregiver;
});
