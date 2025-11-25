import { buttonVariants } from "@/components/ui/button";
import { signUpLinks } from "@/lib/contants/links";
import { cn } from "@/lib/utils";
import { DollarSign, Eye, UserPlus } from "lucide-react";
import Link from "next/link";

export const HowItWorksForCaregivers = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Crie seu perfil",
      description:
        "Conte sua história, mostre os animais que você cuida e compartilhe sua jornada.",
    },
    {
      icon: DollarSign,
      title: "Receba apoio mensal",
      description:
        "Pessoas conectadas à sua missão contribuem diretamente para você, sem intermediários.",
    },
    {
      icon: Eye,
      title: "Transparência simples",
      description:
        "Compartilhe relatórios e mantenha seus apoiadores informados sobre o uso dos recursos.",
    },
  ];

  return (
    <section id="para-cuidadores" className="py-14 md:py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Cuidadores, a Miuma é feita para vocês.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Receba o apoio que você merece de forma justa e transparente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="p-4 md:p-8 corner-squircle rounded-4xl bg-background border border-border space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-third/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-third" />
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
