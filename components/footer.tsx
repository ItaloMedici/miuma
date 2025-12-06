import Image from "next/image";
import Link from "next/link";
import { legalLinks, links } from "../lib/contants/links";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-border border-t">
      <div className="container mx-auto max-w-7xl px-6 py-16 pb-24 lg:pb-16">
        <div className="mb-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <Image
                src={"/logo-horizontal.svg"}
                alt="Miuma"
                width={120}
                height={40}
              />
            </Link>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Conectamos cuidadores de animais com pessoas que querem fazer a
              diferença através de apoio transparente e direto.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navegação</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground border-t pt-8 text-center text-sm">
          © 2025 Miuma — Cuidando de quem cuida.
        </div>
      </div>
    </footer>
  );
};
