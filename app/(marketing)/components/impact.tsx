import { LandingPageData } from "@/interfaces/marketing";
import { cn } from "@/lib/utils";

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
    <section className="px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Impacto que você pode acompanhar de perto.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Números reais que demonstram a força da comunidade Miuma
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((metric, index) => (
            <div
              key={index}
              className={cn(
                "corner-squircle bg-background border-border space-y-2 rounded-4xl border p-4 text-center md:p-8"
              )}
            >
              <div className="text-primary text-4xl font-bold">
                {metric.value}
              </div>
              <div className="text-lg font-semibold">{metric.label}</div>
              <div className="text-muted-foreground text-sm">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
