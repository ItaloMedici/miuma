"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageWithMetadata {
  url: string;
  title?: string;
  description?: string;
  alt?: string;
}

interface GalleryModalProps {
  images: (string | ImageWithMetadata)[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function GalleryModal({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const getImageData = (img: string | ImageWithMetadata) => {
    if (typeof img === "string") {
      return {
        url: img,
        title: undefined,
        description: undefined,
        alt: undefined,
      };
    }
    return img;
  };

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = getImageData(images[currentIndex]);
  const hasMetadata = currentImage.title || currentImage.description;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Galeria de fotos</DialogTitle>
      <DialogContent className="bg-background/95 h-screen w-screen max-w-none p-0 backdrop-blur-sm sm:max-w-none">
        <div className="-m-12 flex h-full items-center justify-center px-2 py-16 sm:px-20 sm:py-32">
          <div className="relative flex h-full w-full items-center justify-center">
            <div
              className={cn(
                "relative flex w-full items-center justify-center",
                hasMetadata
                  ? "h-auto flex-col gap-3 sm:h-[calc(100vh-240px)] sm:gap-6"
                  : "h-[calc(100vh-160px)]"
              )}
            >
              <div
                className={cn(
                  "relative w-full max-w-[90vw] sm:max-w-[70vw]",
                  hasMetadata ? "h-[50vh] sm:flex-1" : "h-full"
                )}
              >
                <Image
                  src={currentImage.url}
                  alt={
                    currentImage.alt ||
                    currentImage.title ||
                    `Foto ${currentIndex + 1}`
                  }
                  fill
                  sizes="90vw"
                  className="rounded-lg object-contain"
                />

                <div className="bg-background/90 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-xs font-medium sm:bottom-4 sm:px-4 sm:py-2 sm:text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>

              {hasMetadata && (
                <div className="max-w-[90vw] rounded-lg p-3 md:max-w-[50vw]">
                  {currentImage.title && (
                    <h3 className="text-base leading-tight font-bold sm:text-2xl">
                      {currentImage.title}
                    </h3>
                  )}
                  {currentImage.description && (
                    <p className="text-muted-foreground text-xs leading-relaxed sm:text-base">
                      {currentImage.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="bg-background/80 hover:bg-background absolute top-1/2 left-10 h-10 w-10 -translate-y-1/2 rounded-full sm:left-2 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            )}

            {currentIndex < images.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="bg-background/80 hover:bg-background absolute top-1/2 right-10 h-10 w-10 -translate-y-1/2 rounded-full sm:right-2 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            )}
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0">
          <div className="overflow-x-auto px-2 py-3 sm:px-4 sm:py-4">
            <div className="mx-auto flex min-w-max justify-center gap-1.5 sm:gap-2">
              {images.map((image, index) => {
                const imgData = getImageData(image);
                return (
                  <button
                    key={index}
                    ref={(el) => {
                      thumbnailRefs.current[index] = el;
                    }}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "h-20 w-20 shrink-0 overflow-hidden rounded-lg transition-all",
                      currentIndex === index
                        ? "ring-primary ring-offset-background opacity-100 ring-2 ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={imgData.url}
                      alt={
                        imgData.alt || imgData.title || `Thumbnail ${index + 1}`
                      }
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
