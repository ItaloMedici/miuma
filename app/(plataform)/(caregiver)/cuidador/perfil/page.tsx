import { USER_ROLES } from "@/db/schema";
import { getServerSession } from "@/lib/auth-server";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { MobileHeader, OnboardingForm, OnboardingSidebar } from "./components";
import { OnboardingStepEnum } from "./constants";
import { OnboardingProvider } from "./context";

const cachedData = cache(async () => {
  const session = await getServerSession();

  if (!session || session?.user?.role !== USER_ROLES.CAREGIVER) {
    redirect("/entrar");
  }

  const caregiver = await caregiverUseCases.getByUserId(session.user.id);

  return { session, caregiver };
});

export const generateMetadata = async (): Promise<Metadata> => {
  const { session } = await cachedData();

  return {
    title: `Editar Perfil - ${session.user.name} | Miuma`,
    description: "Edite seu perfil de cuidador na plataforma Miuma.",
  };
};

export default async function ProfilePage() {
  const { session, caregiver } = await cachedData();

  const initialStep = OnboardingStepEnum.PROFILE_ESSENTIALS;

  return (
    <OnboardingProvider
      initialStep={initialStep}
      caregiver={caregiver}
      user={session.user}
    >
      <div className="bg-background flex min-h-screen flex-col overflow-hidden md:flex-row">
        <OnboardingSidebar />

        <MobileHeader />
        <OnboardingForm />
      </div>
    </OnboardingProvider>
  );
}
