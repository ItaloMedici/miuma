"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HandHeart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCaregiverProfile } from "./context";

export const SocialProofSection = () => {
  const { socialProof } = useCaregiverProfile();
  const [showAll, setShowAll] = useState(false);

  if (!socialProof) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const testimonials = socialProof.testimonials || [];
  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 4);
  const hasMore = testimonials.length > 4;

  return (
    <section id="depoimentos" className="space-y-6">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight md:text-2xl">
          <HandHeart className="text-muted-foreground h-4 w-4" />
          Quem já faz parte dessa história
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Veja o que dizem as pessoas que já apoiaram este projeto
        </p>
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {displayedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="space-y-3 p-4 md:p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 md:items-start">
                    <div className="bg-primary/10 flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full md:h-6 md:w-6">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="h-4 w-4 rounded-full object-cover md:h-6 md:w-6"
                        />
                      ) : (
                        <span className="text-primary text-xs font-semibold md:text-sm">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold md:text-base">
                          {testimonial.name}
                        </p>
                        <time className="text-muted-foreground hidden md:text-sm">
                          {formatDate(testimonial.date)}
                        </time>
                      </div>
                      <p className="text-foreground/90 hidden text-sm leading-relaxed md:mt-2 md:block">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground/90 text-xs leading-relaxed md:hidden">
                    {testimonial.message}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="gap-2"
              >
                {showAll ? (
                  <>
                    Ver menos
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Ver todos os depoimentos ({testimonials.length})
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
