import { env } from "@/lib/env";
import type { Metadata } from "next";
import { Stack_Sans_Text } from "next/font/google";
import "./globals.css";

const stackSansText = Stack_Sans_Text({
  subsets: ["latin"],
  variable: "--font-stack-sans-text",
  weight: ["200", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Miuma",
    default: "Miuma | Cuidando de quem cuida.",
  },
  description: "Cuidando de quem cuida.",
  keywords: [
    "cuidadores de animais",
    "apoie um cuidador",
    "doação para animais resgatados",
    "proteção animal",
    "resgate de animais",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Miuma",
    title: "Miuma — Cuidando de quem cuida.",
    description:
      "Conectamos doadores a cuidadores independentes de animais. Apoie diretamente quem transforma vidas.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: env.NEXT_PUBLIC_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${stackSansText.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
