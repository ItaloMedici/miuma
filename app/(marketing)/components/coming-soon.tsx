import { FEATURE_FLAGS } from "@/lib/constants/feature-flags";
import { Calendar, CreditCard, FileBarChart2 } from "lucide-react";

export const ComingSoon = () => {
  // Mostrar apenas quando as features ainda não estão habilitadas
  const shouldShow =
    !FEATURE_FLAGS.ENABLE_RECURRING_SUBSCRIPTIONS ||
    !FEATURE_FLAGS.ENABLE_TRANSPARENCY_DASHBOARD;

  if (!shouldShow) {
    return null;
  }

  const upcomingFeatures = [
    {
      icon: CreditCard,
      title: "Assinaturas recorrentes",
      description:
        "Configure doações mensais automáticas para apoiar cuidadores de forma contínua.",
      status: "Em breve",
    },
    {
      icon: FileBarChart2,
      title: "Dashboard de transparência",
      description:
        "Relatórios mensais detalhados e comprovantes de como os recursos estão sendo utilizados.",
      status: "Em breve",
    },
    {
      icon: Calendar,
      title: "Atualizações em tempo real",
      description:
        "Acompanhe o dia a dia dos cuidadores com fotos, vídeos e histórias dos animais.",
      status: "Em breve",
    },
  ];

  return (
    <section className="bg-muted/30 px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            O futuro da Miuma.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Estamos apenas começando. Estas funcionalidades estão sendo
            desenvolvidas para tornar sua experiência ainda melhor.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {upcomingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="corner-squircle bg-background border-border space-y-4 rounded-4xl border p-4 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <span className="text-primary text-xs font-semibold tracking-wide uppercase">
                    {feature.status}
                  </span>
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
