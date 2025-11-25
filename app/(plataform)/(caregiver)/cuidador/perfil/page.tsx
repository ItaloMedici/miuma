import { OnboardingContainer, OnboardingSidebar } from "./components";
import { OnboardingStepEnum } from "./constants";
import { OnboardingProvider } from "./context";

// Server component - can fetch user data here
export default async function OnboardingPage() {
  // TODO: Check if user has existing profile (if editing, profileId will be set)
  const profileId: string | undefined = undefined; // Will be fetched from database

  // TODO: Check if user has existing onboarding data and resume from that step
  const initialStep = OnboardingStepEnum.PROFILE_ESSENTIALS;

  return (
    <OnboardingProvider initialStep={initialStep}>
      <div className="bg-background min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar with context */}
        <OnboardingSidebar />

        {/* Form container with context */}
        <OnboardingContainer profileId={profileId} />
      </div>
    </OnboardingProvider>
  );
}
