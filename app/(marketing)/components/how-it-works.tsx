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
    <section id="como-funciona" className="py-14 md:py-20 px-6 anchor-offset">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Transparente, simples e direto.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em três passos você já está ajudando quem mais precisa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="p-4 md:p-8 corner-squircle rounded-4xl bg-card border border-border space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
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
