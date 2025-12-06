"use client";

import { Card } from "@/components/ui/card";
import { HouseHeart } from "lucide-react";
import Image from "next/image";
import { useCaregiverProfile } from "./context";

export const OngoingCases = () => {
  const { ongoingCases: cases } = useCaregiverProfile();

  if (!cases || cases.length === 0) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <section id="casos" className="space-y-6">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight md:text-2xl">
          <HouseHeart className="text-muted-foreground h-4 w-4" />
          Casos em andamento
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Acompanhe de perto cada necessidade e nosso dia a dia.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {cases.map((caseItem) => (
          <Card
            key={caseItem.id}
            className="gap-4 p-4 transition-shadow hover:shadow-md md:p-6"
          >
            {caseItem.imageUrl && (
              <Image
                src={caseItem.imageUrl}
                alt={caseItem.title}
                className="corner-squircle aspect-3/1 w-full rounded-2xl object-cover md:aspect-4/2"
                width={400}
                height={250}
              />
            )}
            <div className="space-y-2">
              <h3 className="text-md font-semibold md:text-xl">
                {caseItem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {caseItem.description}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Meta</p>
                  <p className="text-primary text-lg font-bold md:text-2xl">
                    {formatCurrency(caseItem.targetAmount)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
