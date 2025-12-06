import { FEATURE_FLAGS } from "@/lib/constants/feature-flags";
import { FileCheck, Lock, Receipt } from "lucide-react";

export const Transparency = () => {
  // Feature escondida no MVP Fase 1 - será habilitada quando houver dashboard de transparência
  if (!FEATURE_FLAGS.ENABLE_TRANSPARENCY_DASHBOARD) {
    return null;
  }
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
    <section id="transparencia" className="px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Transparência que gera confiança.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Construída sobre princípios de abertura e prestação de contas
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="corner-squircle bg-card border-border space-y-4 rounded-4xl border p-4 md:p-8"
              >
                <div className="bg-fifth/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-fifth h-6 w-6" />
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
      </div>
    </section>
  );
};
