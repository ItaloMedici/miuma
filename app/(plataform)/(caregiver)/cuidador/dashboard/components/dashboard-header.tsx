"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Settings } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "../context";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  const { caregiver } = useDashboard();

  return (
    <header className="bg-background sticky top-0 z-10 hidden items-center justify-between px-8 py-4 md:flex">
      <h2 className="text-foreground text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), {
            "text-lime-700": title === "Configurações",
          })}
          href="/cuidador/dashboard/configuracoes"
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Link>
        <Link
          href={`/${caregiver.profileSlug}`}
          className="border-border hover:text-foreground flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          <span>Ver Perfil Público</span>
        </Link>
      </div>
    </header>
  );
}
