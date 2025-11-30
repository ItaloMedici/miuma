import { Navbar } from "@/components/nav-bar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignInForm } from "./form";

export default async function SignInPage() {
  return (
    <div className="p-6 pt-20 md:pt-24 relative w-screen overflow-hidden">
      <Navbar
        variant="full"
        size="sm"
        showLinks={false}
        sideLinks={
          <Link
            href="/cadastro"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Cadastre-se
          </Link>
        }
      />
      <div className="hidden md:block absolute top-0 right-0 w-120 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <main className="max-w-md mx-auto w-full animate-fade-in mb-24 md:mb-32 md:mt-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Entrar</h1>
          <p className="text-sm sm:text-md text-muted-foreground">
            Bem-vindo de volta! Acesse sua conta.
          </p>
        </div>

        <div>
          <SignInForm />
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#FFFDF7] text-stone-400">
              Ou continue com
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button variant="outline" className="justify-center flex-1">
            <GoogleIcon /> Google
          </Button>
          <Button variant="outline" className="justify-center flex-1">
            <FacebookIcon /> Facebook
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="font-medium underline text-secondary underline-offset-2"
          >
            Cadastre-se
          </Link>
        </p>
      </main>
    </div>
  );
}

// --- Icons for Social Media ---
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
      fill="#4285F4"
    />
    <path
      d="M12.24 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z"
      fill="#34A853"
    />
    <path
      d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
      fill="#FBBC05"
    />
    <path
      d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.24 4.74966Z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.5 12.06C22.5 6.26 17.8 1.56 12 1.56C6.2 1.56 1.5 6.26 1.5 12.06C1.5 17.3 5.33 21.65 10.36 22.44V15.1H7.69V12.06H10.36V9.75C10.36 7.12 11.92 5.66 14.31 5.66C15.46 5.66 16.66 5.87 16.66 5.87V8.45H15.33C14.03 8.45 13.63 9.26 13.63 10.08V12.06H16.54L16.08 15.1H13.63V22.44C18.67 21.65 22.5 17.3 22.5 12.06Z"
      fill="#1877F2"
    />
  </svg>
);
