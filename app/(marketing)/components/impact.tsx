import { LandingPageData } from "@/interfaces/marketing";
import { cn } from "@/lib";

export const Impact = ({ metrics }: { metrics: LandingPageData["impact"] }) => {
  const data = [
    {
      value: metrics.totalCaregivers,
      label: "Cuidadores ativos",
      description: "Em toda a plataforma",
    },
    {
      value: metrics.totalPetsHelped,
      label: "Animais resgatados",
      description: "Recebendo cuidados",
    },
    {
      value: metrics.totalDonations,
      label: "Doações totais",
      description: "Direto aos cuidadores",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Impacto que você pode acompanhar de perto.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números reais que demonstram a força da comunidade Miuma
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((metric, index) => (
            <div
              key={index}
              className={cn(
                "p-8 rounded-2xl bg-background border border-border text-center space-y-2"
              )}
            >
              <div className="text-4xl font-bold text-primary">
                {metric.value}
              </div>
              <div className="text-lg font-semibold">{metric.label}</div>
              <div className="text-sm text-muted-foreground">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
