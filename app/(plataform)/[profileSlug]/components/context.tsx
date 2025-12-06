"use client";

import { CaregiverProfile } from "@/interfaces/profile";
import React from "react";

const CaregiverProfileContext = React.createContext<CaregiverProfile>(
  {} as CaregiverProfile
);

export const CaregiverProfileProvider = ({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: CaregiverProfile;
}) => {
  return (
    <CaregiverProfileContext.Provider value={profile}>
      {children}
    </CaregiverProfileContext.Provider>
  );
};

export const useCaregiverProfile = () => {
  return React.useContext(CaregiverProfileContext);
};
