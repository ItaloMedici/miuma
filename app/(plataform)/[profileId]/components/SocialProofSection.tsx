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
        <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
          <HandHeart className="w-4 h-4 text-muted-foreground" />
          Quem já faz parte dessa história
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Veja o que dizem as pessoas que já apoiaram este projeto
        </p>
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {displayedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-4 md:p-6 space-y-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center md:items-start gap-4">
                    <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-4 h-4 md:w-6 md:h-6 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xs md:text-sm font-semibold text-primary">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-sm md:text-base font-semibold">
                          {testimonial.name}
                        </p>
                        <time className="hidden md:text-sm text-muted-foreground">
                          {formatDate(testimonial.date)}
                        </time>
                      </div>
                      <p className="hidden md:block md:mt-2 text-sm leading-relaxed text-foreground/90">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs md:hidden leading-relaxed text-foreground/90">
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
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Ver todos os depoimentos ({testimonials.length})
                    <ChevronDown className="w-4 h-4" />
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
