import { Button } from "@/components/ui/button";
import { LandingPageData } from "@/interfaces/marketing";

type Props = {
  caregivers: LandingPageData["caregivers"];
};

export const FeaturedCaregivers = ({ caregivers }: Props) => {
  if (!caregivers?.length) return null;

  return (
    <section id="cuidadores" className="py-20 px-6 anchor-offset">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Conheça quem transforma vidas todos os dias.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de pessoas dedicadas ao cuidado e proteção dos
            animais.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caregivers.map((caregiver, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square rounded-xl bg-muted border border-border flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-accent/20" />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">{caregiver.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {caregiver.petsUnderCare}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &quot;{caregiver.testimonial}&quot;
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  Ajudar este cuidador
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
