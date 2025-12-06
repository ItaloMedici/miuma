"use client";

import { Button } from "@/components/ui/button";
import { Bell, ExternalLink } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 hidden items-center justify-between border-b border-stone-200 bg-white/80 px-8 py-4 backdrop-blur-sm md:flex">
      <h2 className="text-lg font-semibold tracking-tight text-stone-900">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-stone-400 hover:text-stone-600"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-lime-500"></span>
        </Button>
        <Link
          href="/maria-silva"
          className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:text-stone-900"
        >
          <ExternalLink className="h-3 w-3" />
          <span>Ver Perfil Público</span>
        </Link>
      </div>
    </header>
  );
}
