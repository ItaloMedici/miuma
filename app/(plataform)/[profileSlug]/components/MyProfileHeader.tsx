"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Eye, Pencil, Settings } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCaregiverProfile } from "./context";

export const MyProfileHeader = () => {
  const caregiverProfile = useCaregiverProfile();
  const searchParams = useSearchParams();
  const asViewer = searchParams.get("as") === "viewer";

  if (asViewer) return null;

  if (!caregiverProfile.isMyProfile) return null;

  const { profile, billingInfo } = caregiverProfile;

  const getStatusPill = () => {
    const isActive = profile.active;
    const canReceiveDonations = billingInfo.isReadyForDonations;

    if (isActive && canReceiveDonations) {
      return (
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="hidden sm:inline">Recebendo apoios</span>
          <span className="sm:hidden">Ativo</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800">
        <span className="h-2 w-2 rounded-full bg-yellow-600" />
        <span>Em análise</span>
      </div>
    );
  };

  return (
    <>
      <header className="bg-background fixed top-0 right-0 left-0 z-50 border-b shadow-sm">
        <div className="container mx-auto">
          {/* Main Header Bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              {getStatusPill()}

              {/* Verification Badge (subtle, informational only) */}
              {profile.verified && (
                <div className="hidden items-center gap-1.5 text-xs text-gray-500 md:flex">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                  <span>Verificado</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={`/${profile.id}?as=viewer`}
                className="border-border hover:text-foreground flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                <Eye className="h-3 w-3" />
                <span className="inline sm:hidden">Ver Perfil</span>
                <span className="hidden sm:inline">
                  Ver Perfil como Público
                </span>
              </Link>

              <Button variant="ghost" size="sm" asChild className="gap-2">
                <Link href="/cuidador/perfil">
                  <Pencil className="h-4 w-4" />
                  <span className="hidden sm:inline">Editar Perfil</span>
                </Link>
              </Button>

              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link href="/cuidador/dashboard">
                  <Settings className="h-4 w-4" />

                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Dynamic spacer based on header content */}
      <div className={"h-[60px]"} />
    </>
  );
};
