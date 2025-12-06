"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Heart,
  LayoutDashboard,
  Send,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Visão Geral",
    href: "/cuidador/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Doadores",
    href: "/cuidador/dashboard/doadores",
    icon: Users,
  },
  {
    name: "Casos Ativos",
    href: "/cuidador/dashboard/casos",
    icon: Heart,
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

const accountNav = [
  {
    name: "Editar Perfil",
    href: "/cuidador/perfil",
    icon: User,
  },
  {
    name: "Configurações",
    href: "/cuidador/dashboard/configuracoes",
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside className="z-20 hidden w-64 flex-col border-r border-stone-200 bg-white md:flex">
      <div className="p-6 pb-2">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Image
            src="/logo-horizontal.svg"
            alt="Miuma"
            width={120}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-stone-50 text-stone-900"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive
                      ? "text-stone-900"
                      : "text-stone-400 group-hover:text-stone-900"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-1 p-6 pt-2">
        <div className="mb-2 border-t border-stone-100 pt-4">
          <h4 className="mb-2 px-3 text-xs font-medium tracking-wider text-stone-400 uppercase">
            Conta
          </h4>
        </div>
        {accountNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-stone-50 text-stone-900"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  isActive
                    ? "text-stone-900"
                    : "text-stone-400 group-hover:text-stone-900"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-stone-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1636957690653-1c8f74f7c295?w=100&auto=format&fit=crop" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-stone-900">
              Maria Silva
            </span>
            <span className="truncate text-xs text-stone-500">
              maria.silva@example.com
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
