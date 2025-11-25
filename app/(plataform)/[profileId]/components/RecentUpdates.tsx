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
        <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
          <Mailbox className="w-4 h-4 text-muted-foreground" />
          Atualizações recentes
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
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
                <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
                {index !== updates.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div
                className={cn("flex-1", {
                  "md:pb-6": index !== updates.length - 1,
                })}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <time className="text-xs md:text-sm font-semibold text-muted-foreground">
                    {formatDate(update.date)}
                  </time>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  {update.message} {update.emoji}
                </p>

                {/* Images Thumbnails */}
                {update.images && update.images.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {update.images.slice(0, 4).map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => openGallery(update.images!, idx)}
                        className="relative w-20 h-20 corner-squircle rounded-2xl overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
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
                        className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted hover:bg-muted/80 transition-colors cursor-pointer flex items-center justify-center"
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
