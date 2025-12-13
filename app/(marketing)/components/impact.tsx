import { LandingPageData } from "@/interfaces/marketing";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export const Impact = ({ metrics }: { metrics: LandingPageData["impact"] }) => {
  const data = useMemo(() => {
    if (!metrics?.totalCaregivers) return [];

    const list = [
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
    ];

    if (metrics.totalDonations !== "0") {
      list.push({
        value: metrics.totalDonations,
        label: "Doações totais",
        description: "Direto aos cuidadores",
      });
    }

    return list;
  }, [metrics]);

  if (!metrics?.totalCaregivers) return null;

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Faça parte da comunidade Miuma.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Cuidadores e doadores unidos pela causa animal
          </p>
        </div>

        <div
          className={cn("grid gap-6 sm:grid-cols-2", {
            "lg:grid-cols-3": data.length === 3,
          })}
        >
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
