import { Navbar } from "@/components/nav-bar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ResetPasswordForm } from "./form";

export default async function ResetPasswordPage() {
  return (
    <div className="relative w-screen overflow-hidden p-6 pt-20 md:pt-24">
      <Navbar
        variant="full"
        size="sm"
        showLinks={false}
        sideLinks={
          <Link
            href="/entrar"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Voltar ao login
          </Link>
        }
      />
      <div className="bg-primary/15 pointer-events-none absolute top-0 right-0 hidden h-96 w-120 translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl md:block" />

      <main className="animate-fade-in mx-auto mb-24 w-full max-w-md md:mt-16 md:mb-32">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            Redefinir senha
          </h1>
          <p className="sm:text-md text-muted-foreground text-sm">
            Digite sua nova senha para recuperar o acesso à sua conta.
          </p>
        </div>

        <div>
          <ResetPasswordForm />
        </div>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          Lembrou sua senha?{" "}
          <Link
            href="/entrar"
            className="text-secondary font-medium underline underline-offset-2"
          >
            Voltar ao login
          </Link>
        </p>
      </main>
    </div>
  );
}
