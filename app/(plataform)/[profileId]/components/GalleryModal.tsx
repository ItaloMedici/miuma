"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib";
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
      <DialogContent className="max-w-none sm:max-w-none w-screen h-screen p-0 bg-background/95 backdrop-blur-sm">
        <div className="flex -m-12 items-center justify-center h-full px-2 sm:px-20 py-16 sm:py-32">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={cn(
                "relative w-full flex items-center justify-center",
                hasMetadata
                  ? "h-auto sm:h-[calc(100vh-240px)] flex-col gap-3 sm:gap-6"
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
                  className="object-contain rounded-lg"
                />

                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-background/90 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>

              {hasMetadata && (
                <div className="max-w-[90vw] md:max-w-[50vw] rounded-lg p-3">
                  {currentImage.title && (
                    <h3 className="text-base sm:text-2xl font-bold leading-tight">
                      {currentImage.title}
                    </h3>
                  )}
                  {currentImage.description && (
                    <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
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
                className="absolute left-10 sm:left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background w-10 h-10 sm:w-12 sm:h-12"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            )}

            {currentIndex < images.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-10 sm:right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background w-10 h-10 sm:w-12 sm:h-12"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="px-2 sm:px-4 py-3 sm:py-4 overflow-x-auto">
            <div className="flex gap-1.5 sm:gap-2 justify-center min-w-max mx-auto">
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
                      "w-20 h-20 rounded-lg overflow-hidden shrink-0 transition-all",
                      currentIndex === index
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background opacity-100"
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
                      className="w-full h-full object-cover"
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
