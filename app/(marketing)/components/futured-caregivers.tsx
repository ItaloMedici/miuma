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
    <section id="cuidadores" className="anchor-offset px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Conheça quem transforma vidas todos os dias.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Histórias reais de pessoas dedicadas ao cuidado e proteção dos
            animais.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caregivers.map((caregiver, index) => (
            <div
              key={index}
              className="corner-squircle rounded-5xl bg-card border-border flex flex-col gap-4 border p-4 transition-shadow hover:shadow-lg md:p-6"
            >
              {caregiver.imageUrl && (
                <div className="corner-squircle bg-muted border-border aspect-video overflow-hidden rounded-4xl border">
                  <Image
                    src={caregiver.imageUrl}
                    alt={caregiver.name}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{caregiver.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {caregiver.petsUnderCare}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &quot;{caregiver.shortBio}&quot;
                </p>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-auto w-full"
                  )}
                  href={`/${caregiver.profileSlug}`}
                >
                  Ver perfil e apoiar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
