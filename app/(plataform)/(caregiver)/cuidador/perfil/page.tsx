import { USER_ROLES } from "@/db/schema";
import { getServerSession } from "@/lib/auth-server";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { redirect } from "next/navigation";
import { MobileHeader, OnboardingForm, OnboardingSidebar } from "./components";
import { OnboardingStepEnum } from "./constants";
import { OnboardingProvider } from "./context";

// Server component - can fetch user data here
export default async function OnboardingPage() {
  const session = await getServerSession();

  if (!session || session?.user?.role !== USER_ROLES.CAREGIVER) {
    redirect("/entrar");
  }

  const caregiver = await caregiverUseCases.getByUserId(session.user.id);

  const initialStep = OnboardingStepEnum.PROFILE_ESSENTIALS;

  return (
    <OnboardingProvider
      initialStep={initialStep}
      caregiver={caregiver}
      user={session.user}
    >
      <div className="bg-background min-h-screen flex flex-col md:flex-row overflow-hidden">
        <OnboardingSidebar />

        <MobileHeader />
        <OnboardingForm />
      </div>
    </OnboardingProvider>
  );
}
