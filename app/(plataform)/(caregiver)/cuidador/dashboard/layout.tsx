import { ReactNode } from "react";
import { DashboardSidebar, MobileHeader } from "./components";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      <DashboardSidebar />
      <main className="flex h-full flex-1 flex-col overflow-hidden">
        <MobileHeader />
        {children}
      </main>
    </div>
  );
}
