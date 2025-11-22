"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { GalleryModal } from "./GalleryModal";
import { useCaregiverProfile } from "./context";

type GalleryImageProps = {
  url: string;
  alt: string;
  onClick: () => void;
  className?: string;
};

function GalleryImage({ url, alt, onClick, className }: GalleryImageProps) {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "rounded-2xl overflow-hidden relative cursor-pointer aspect-video",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver imagem: ${alt}`}
    >
      <Image src={url} alt={alt} fill className="object-cover" />
    </div>
  );
}

export function Gallery() {
  const { galleryImages: gallery } = useCaregiverProfile();

  const images = useMemo(
    () => [gallery.cover, ...(gallery.photos || [])],
    [gallery.cover, gallery.photos]
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const openByUrl = useCallback(
    (url: string) => {
      const idx = images.findIndex((it) => it.url === url?.trim());
      openAt(idx >= 0 ? idx : 0);
    },
    [images, openAt]
  );

  const close = useCallback(() => setOpen(false), []);

  const additionalPhotos = gallery.photos || [];
  const photoCount = additionalPhotos.length;

  const renderMobileCover = () => (
    <GalleryImage
      url={gallery.cover.url}
      alt={gallery.cover.alt || "Foto de capa"}
      onClick={() => openByUrl(gallery.cover.url)}
      className="lg:hidden"
    />
  );

  const renderDesktopCover = () => (
    <GalleryImage
      url={gallery.cover.url}
      alt={gallery.cover.alt || "Foto de capa"}
      onClick={() => openByUrl(gallery.cover.url)}
    />
  );

  if (photoCount === 0) {
    return (
      <>
        <GalleryImage
          url={gallery.cover.url}
          alt={gallery.cover.alt || "Foto de capa"}
          onClick={() => openByUrl(gallery.cover.url)}
        />
        <GalleryModal
          key={index}
          images={images.map((it) => it.url)}
          isOpen={open}
          initialIndex={index}
          onClose={close}
        />
      </>
    );
  }

  const renderAdditionalPhotos = () => {
    if (photoCount === 1) {
      return (
        <GalleryImage
          url={additionalPhotos[0].url}
          alt={additionalPhotos[0].alt || "Foto da galeria 1"}
          onClick={() => openByUrl(additionalPhotos[0].url)}
          className="h-full aspect-auto"
        />
      );
    }

    if (photoCount === 2) {
      return (
        <div className="grid grid-rows-2 gap-2 h-full">
          {additionalPhotos.slice(0, 2).map((img, idx) => (
            <GalleryImage
              key={img.url || idx}
              url={img.url}
              alt={img.alt || `Foto da galeria ${idx + 1}`}
              onClick={() => openByUrl(img.url)}
              className="aspect-auto"
            />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
        {additionalPhotos.slice(0, 4).map((img, idx) => (
          <GalleryImage
            key={img.url || idx}
            url={img.url}
            alt={img.alt || `Foto da galeria ${idx + 1}`}
            onClick={() => openByUrl(img.url)}
            className="aspect-auto"
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderMobileCover()}
      <div className="hidden lg:grid lg:grid-cols-[2fr_1fr] gap-2">
        {renderDesktopCover()}
        {renderAdditionalPhotos()}
      </div>
      <GalleryModal
        key={index}
        images={images.map((it) => it.url)}
        isOpen={open}
        initialIndex={index}
        onClose={close}
      />
    </>
  );
}
