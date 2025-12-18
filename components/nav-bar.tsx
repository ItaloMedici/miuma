"use client";

import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FEATURE_FLAGS } from "@/lib/constants/feature-flags";
import { links } from "@/lib/contants/links";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  variant?: "rounded" | "full";
  size?: "sm" | "md";
  showLinks?: boolean;
  sideLinks?: React.ReactNode;
};

export const Navbar = ({
  variant = "rounded",
  showLinks = true,
  size = "md",
  sideLinks,
}: Props) => {
  return (
    <nav
      className={cn(
        "bg-background/60 border-border fixed top-0 right-0 left-0 z-50 border backdrop-blur-md",
        {
          "corner-squircle m-4 rounded-4xl shadow-sm": variant === "rounded",
          "px-4 py-2": size === "sm",
          "p-4": size === "md",
        }
      )}
    >
      <div
        className={cn("flex items-center justify-between", {
          "container mx-auto": variant === "full",
        })}
      >
        <div className="flex items-center gap-12">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <Image
                src={"/logo-horizontal.svg"}
                alt="Miuma"
                width={120}
                height={40}
              />
            </Link>
          </div>
          <div className="hidden items-center gap-8 lg:flex">
            {showLinks &&
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>

        <SideLinks showLinks={showLinks} />

        {sideLinks ? (
          <div className="flex items-center gap-3">{sideLinks}</div>
        ) : null}
      </div>
    </nav>
  );
};

const SideLinks = ({ showLinks }: { showLinks: boolean }) => {
  if (!showLinks) return null;

  const { data: session } = authClient.useSession();

  if (session) {
    const isCaregiver = session.user.role === "CAREGIVER";
    return (
      <Link
        href={isCaregiver ? "/cuidador/dashboard" : "/perfil"}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        {isCaregiver ? "Painel" : "Perfil"}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/entrar"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "hidden sm:inline-flex"
        )}
      >
        Entrar
      </Link>
      {FEATURE_FLAGS.ENABLE_DONORS ? (
        <Link
          href="/cadastro?type=supporter"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "hidden md:inline-flex"
          )}
        >
          Ajudar agora
        </Link>
      ) : null}
      <Link href="/cadastro?type=caregiver" className={cn(buttonVariants({}))}>
        Criar perfil de cuidador
      </Link>
    </div>
  );
};
