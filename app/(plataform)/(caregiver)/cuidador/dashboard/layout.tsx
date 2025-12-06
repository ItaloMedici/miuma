import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { getCachedDashboardCaregiver } from "./actions";
import { DashboardSidebar, MobileHeader } from "./components";
import { DashboardProvider } from "./context";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const caregiver = await getCachedDashboardCaregiver();

  if (!caregiver) {
    notFound();
  }

  return (
    <DashboardProvider caregiver={caregiver}>
      <div className="bg-background flex h-screen overflow-hidden">
        <DashboardSidebar />
        <main className="flex h-full flex-1 flex-col overflow-hidden">
          <MobileHeader />
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
}
