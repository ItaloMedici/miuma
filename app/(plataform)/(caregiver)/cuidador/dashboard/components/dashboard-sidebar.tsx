"use client";

import { cn } from "@/lib/utils";
import {
  CreditCard,
  Heart,
  LayoutDashboard,
  Send,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { CaregiverAvatarAccount } from "./caregiver-avatar-account";

type NavLinks = Array<{
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}>;

const activeNavigation: NavLinks = [
  {
    name: "Visão Geral",
    href: "/cuidador/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Editar Perfil",
    href: "/cuidador/perfil",
    icon: User,
  },
  {
    name: "Casos Ativos",
    href: "/cuidador/dashboard/casos",
    icon: Heart,
  },
];

const disabledNavigation: NavLinks = [
  {
    name: "Doadores",
    href: "/cuidador/dashboard/doadores",
    icon: Users,
  },
  {
    name: "Comunicações",
    href: "/cuidador/dashboard/comunicacoes",
    icon: Send,
  },
  {
    name: "Financeiro",
    href: "/cuidador/dashboard/financeiro",
    icon: CreditCard,
  },
];

interface DashboardSidebarProps {
  onNavigate?: () => void;
  isMobile?: boolean;
}

export function DashboardSidebar({
  onNavigate,
  isMobile = false,
}: DashboardSidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "border-border z-20 flex-col",
        isMobile ? "flex w-full border-none" : "hidden w-62 border-r md:flex"
      )}
    >
      <div className="p-6 pb-2">
        {!isMobile && (
          <Link href="/" className="mb-8 flex items-center gap-2 px-3">
            <Image
              src="/logo-horizontal.svg"
              alt="Miuma"
              width={100}
              height={35}
            />
          </Link>
        )}

        <nav className="space-y-1">
          {activeNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group text-muted-foreground flex w-full items-center gap-3 rounded-lg px-3 py-1 text-sm font-medium transition-colors",
                  {
                    "text-lime-700": isActive,
                  }
                )}
              >
                <Icon className={cn("h-4 w-4")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6">
          <h4 className="text-muted-foreground/70 mb-2 px-3 text-xs font-medium tracking-wider uppercase">
            Em Breve
          </h4>
          <nav className="space-y-1">
            {disabledNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="group flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-1 text-sm font-medium"
                >
                  <Icon className="text-muted-foreground/70 h-4 w-4" />
                  <span className="text-muted-foreground/70">{item.name}</span>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="border-border mt-auto border-t p-2">
        <Suspense fallback={<CaregiverAvatarAccount.Skeleton />}>
          <CaregiverAvatarAccount />
        </Suspense>
      </div>
    </aside>
  );
}
