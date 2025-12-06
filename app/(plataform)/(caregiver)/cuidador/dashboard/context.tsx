"use client";

import { CaregiverEntity } from "@/db/schema";
import { createContext, useContext } from "react";

type DashboardContextType = {
  caregiver: CaregiverEntity;
};

const DashboardContext = createContext({} as DashboardContextType);

export const DashboardProvider = ({
  children,
  caregiver,
}: {
  children: React.ReactNode;
  caregiver: CaregiverEntity;
}) => {
  return (
    <DashboardContext.Provider value={{ caregiver }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
