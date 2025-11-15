import { Button } from "@/components/ui/button";
import { FileCheck, Lock, Receipt } from "lucide-react";

export const Transparency = () => {
  const features = [
    {
      icon: FileCheck,
      title: "Relatórios públicos",
      description:
        "Todos os cuidadores compartilham relatórios mensais detalhando como os recursos foram utilizados.",
    },
    {
      icon: Receipt,
      title: "Comprovantes enviados",
      description:
        "Receba comprovantes de todas as transações diretamente dos cuidadores que você apoia.",
    },
    {
      icon: Lock,
      title: "Auditoria interna",
      description:
        "Nossa equipe realiza verificações periódicas para garantir a conformidade de todos os perfis.",
    },
  ];

  return (
    <section id="transparencia" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Transparência que gera confiança.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Construída sobre princípios de abertura e prestação de contas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-fifth/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-fifth" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Acessar painel de transparência
          </Button>
        </div>
      </div>
    </section>
  );
};
