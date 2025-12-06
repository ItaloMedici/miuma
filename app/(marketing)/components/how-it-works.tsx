import { BarChart3, Heart, Search } from "lucide-react";

export const HowItWorksForDonors = () => {
  const steps = [
    {
      icon: Search,
      title: "Escolha um cuidador",
      description:
        "Navegue pelos perfis verificados e conheça as histórias de quem dedica sua vida aos animais.",
    },
    {
      icon: Heart,
      title: "Doe uma vez ou mensalmente",
      description:
        "Escolha o valor que faz sentido para você e decida se quer fazer uma doação única ou recorrente.",
    },
    {
      icon: BarChart3,
      title: "Acompanhe o impacto real",
      description:
        "Receba atualizações e relatórios sobre como sua contribuição está fazendo a diferença.",
    },
  ];

  return (
    <section id="como-funciona" className="anchor-offset px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Transparente, simples e direto.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Em três passos você já está ajudando quem mais precisa
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="corner-squircle bg-card border-border space-y-4 rounded-4xl border p-4 md:p-8"
              >
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-primary h-6 w-6" />
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
      </div>
    </section>
  );
};
