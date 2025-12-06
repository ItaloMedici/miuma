import { buttonVariants } from "@/components/ui/button";
import { signUpLinks } from "@/lib/contants/links";
import { cn } from "@/lib/utils";
import { DollarSign, Eye, UserPlus } from "lucide-react";
import Link from "next/link";

export const HowItWorksForCaregivers = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Crie seu perfil gratuitamente",
      description:
        "Conte sua história, mostre os animais que você cuida e compartilhe sua jornada. É totalmente grátis.",
    },
    {
      icon: DollarSign,
      title: "Compartilhe sua chave PIX",
      description:
        "Adicione sua chave PIX ao perfil e receba doações diretas de pessoas que querem apoiar seu trabalho.",
    },
    {
      icon: Eye,
      title: "Ganhe visibilidade",
      description:
        "Sua página pessoal aumenta suas chances de ser descoberto por novos doadores que se identificam com sua causa.",
    },
  ];

  return (
    <section id="para-cuidadores" className="px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Cuidadores, a Miuma é feita para vocês.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Divulgue seu trabalho, compartilhe sua chave PIX e aumente suas
            chances de receber apoio
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="corner-squircle bg-background border-border space-y-4 rounded-4xl border p-4 md:p-8"
              >
                <div className="bg-third/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-third h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href={signUpLinks.caregiver}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Sou cuidador — criar meu perfil agora
          </Link>
        </div>
      </div>
    </section>
  );
};
