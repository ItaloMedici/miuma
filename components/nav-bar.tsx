import { Button } from "@/components/ui/button";
import { links } from "@/lib/contants/links";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  variant?: "rounded" | "full";
};

export const Navbar = ({ variant = "rounded" }: Props) => {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border border-border p-4",
        {
          "rounded-xl m-4 shadow-sm": variant === "rounded",
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
            {links.map((link) => (
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
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Entrar
          </Button>
          <Button variant="outline" className="hidden md:inline-flex">
            Criar perfil de cuidador
          </Button>
          <Button>Ajudar agora</Button>
        </div>
      </div>
    </nav>
  );
};
