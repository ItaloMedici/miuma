import { buttonVariants } from "@/components/ui/button";
import { LandingPageData } from "@/interfaces/marketing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  caregivers: LandingPageData["caregivers"];
};

export const FeaturedCaregivers = ({ caregivers }: Props) => {
  if (!caregivers?.length) return null;

  return (
    <section id="cuidadores" className="py-14 md:py-20 px-6 anchor-offset">
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
              className="p-4 md:p-6 corner-squircle rounded-5xl bg-card border border-border space-y-4 hover:shadow-lg transition-shadow"
            >
              {caregiver.imageUrl && (
                <div className="corner-squircle rounded-4xl aspect-video md:aspect-square bg-muted border border-border overflow-hidden">
                  <Image
                    src={caregiver.imageUrl}
                    alt={caregiver.name}
                    width={250}
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">{caregiver.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {caregiver.petsUnderCare}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &quot;{caregiver.shortBio}&quot;
                </p>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full"
                  )}
                  href={`/${caregiver.profileId}`}
                >
                  Ajudar este cuidador
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
