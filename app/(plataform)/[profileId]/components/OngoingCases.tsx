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
        <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
          <HouseHeart className="w-4 h-4 text-muted-foreground" />
          Casos em andamento
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Acompanhe de perto cada necessidade e nosso dia a dia.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {cases.map((caseItem) => (
          <Card
            key={caseItem.id}
            className="p-4 md:p-6 hover:shadow-md transition-shadow gap-4"
          >
            {caseItem.imageUrl && (
              <Image
                src={caseItem.imageUrl}
                alt={caseItem.title}
                className="w-full aspect-3/1  md:aspect-4/2 object-cover rounded-md"
                width={400}
                height={250}
              />
            )}
            <div className="space-y-2">
              <h3 className="text-md md:text-xl font-semibold">
                {caseItem.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {caseItem.description}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Meta</p>
                  <p className="text-lg md:text-2xl font-bold text-primary">
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
