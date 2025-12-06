"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mailbox } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GalleryModal } from "./GalleryModal";
import { useCaregiverProfile } from "./context";

export const RecentUpdates = () => {
  const { recentUpdates: updates } = useCaregiverProfile();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);

  if (!updates || updates.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }).format(date);
  };

  const openGallery = (
    images: { url: string; alt: string }[],
    index: number = 0
  ) => {
    setSelectedImages(images.map((img) => img.url));
    setInitialIndex(index);
    setModalOpen(true);
  };

  return (
    <section id="atualizacoes" className="space-y-6">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight md:text-2xl">
          <Mailbox className="text-muted-foreground h-4 w-4" />
          Atualizações recentes
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Acompanhe o dia a dia dos nossos pequenos e veja como sua ajuda faz a
          diferença
        </p>
      </div>

      <Card className="p-4 md:p-6">
        <div className="space-y-6">
          {updates.map((update, index) => (
            <div key={update.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className="bg-primary h-3 w-3 shrink-0 rounded-full" />
                {index !== updates.length - 1 && (
                  <div className="bg-border mt-2 w-0.5 flex-1" />
                )}
              </div>

              {/* Content */}
              <div
                className={cn("flex-1", {
                  "md:pb-6": index !== updates.length - 1,
                })}
              >
                <div className="mb-2 flex items-baseline gap-2">
                  <time className="text-muted-foreground text-xs font-semibold md:text-sm">
                    {formatDate(update.date)}
                  </time>
                </div>
                <p className="text-sm leading-relaxed md:text-base">
                  {update.message} {update.emoji}
                </p>

                {/* Images Thumbnails */}
                {update.images && update.images.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {update.images.slice(0, 4).map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => openGallery(update.images!, idx)}
                        className="corner-squircle relative h-20 w-20 cursor-pointer overflow-hidden rounded-2xl transition-opacity hover:opacity-80"
                        aria-label={`Ver foto ${idx + 1} da atualização`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || `Foto ${idx + 1} da atualização`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                    {update.images.length > 4 && (
                      <button
                        onClick={() => openGallery(update.images!, 4)}
                        className="bg-muted hover:bg-muted/80 relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-colors"
                        aria-label="Ver mais fotos"
                      >
                        <span className="text-sm font-semibold">
                          +{update.images.length - 4}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Gallery Modal */}
      <GalleryModal
        images={selectedImages}
        isOpen={modalOpen}
        initialIndex={initialIndex}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
