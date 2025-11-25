import { buttonVariants } from "@/components/ui/button";
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
        "fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border border-border",
        {
          "rounded-4xl m-4 shadow-sm corner-squircle": variant === "rounded",
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
          <div className="hidden lg:flex items-center gap-8">
            {showLinks &&
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
        {showLinks && (
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
            <Link
              href="/cadastro?type=supporter"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden md:inline-flex"
              )}
            >
              Ajudar agora
            </Link>
            <Link
              href="/cadastro?type=caregiver"
              className={cn(buttonVariants({}))}
            >
              Criar perfil de cuidador
            </Link>
          </div>
        )}
        {sideLinks ? (
          <div className="flex items-center gap-3">{sideLinks}</div>
        ) : null}
      </div>
    </nav>
  );
};
