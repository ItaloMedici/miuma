import { buttonVariants } from "@/components/ui/button";
import { signUpLinks } from "@/lib/contants/links";
import { cn } from "@/lib/utils";
import { Heart, UserPlus } from "lucide-react";
import Link from "next/link";

export const DualCTA = () => {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="corner-squircle bg-primary/5 border-primary/20 space-y-6 rounded-4xl border p-4 md:p-12">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
              <Heart className="text-primary h-6 w-6" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Comece a apoiar um cuidador hoje.
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sua contribuição pode mudar a vida de quem dedica seu tempo e
                recursos aos animais mais vulneráveis.
              </p>
            </div>
            <Link
              href={"#cuidadores"}
              className={cn("w-full sm:w-auto", buttonVariants({ size: "lg" }))}
            >
              Quero ajudar agora
            </Link>
          </div>

          <div className="corner-squircle bg-third/5 border-third/20 space-y-6 rounded-4xl border p-4 md:p-12">
            <div className="bg-third/10 flex h-12 w-12 items-center justify-center rounded-xl">
              <UserPlus className="text-third h-6 w-6" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">
                Crie seu perfil e receba apoio recorrente.
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Se você é cuidador, a Miuma é o lugar onde seu trabalho será
                reconhecido e apoiado de forma justa.
              </p>
            </div>
            <Link
              href={signUpLinks.caregiver}
              className={cn(
                "w-full sm:w-auto",
                buttonVariants({ size: "lg", variant: "third" })
              )}
            >
              Criar perfil de cuidador
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
