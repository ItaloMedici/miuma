"use client";

import { MobileHeader } from "./MobileHeader";
import { OnboardingForm } from "./OnboardingForm";

interface OnboardingContainerProps {
  profileId?: string;
}

export function OnboardingContainer({ profileId }: OnboardingContainerProps) {
  return (
    <>
      <MobileHeader />
      <OnboardingForm profileId={profileId} />
    </>
  );
}
