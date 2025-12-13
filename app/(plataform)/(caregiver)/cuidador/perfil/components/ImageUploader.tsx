"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { removeImage, uploadImage } from "../action";

interface ImageUploaderProps {
  value?: string | null;
  onChange?: (value: string) => void;
  onRemove?: () => void;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
  variant?: "profile" | "cover" | "gallery";
  disabled?: boolean;
  pathType?: "profile" | "gallery";
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const getAspectClass = (aspectRatio: "square" | "video" | "auto") => {
  return (
    {
      square: "aspect-square",
      video: "aspect-video",
      auto: "",
    }[aspectRatio] || ""
  );
};

const getVariantClasses = (variant: "profile" | "cover" | "gallery") => {
  return (
    {
      profile: "w-24 h-24 rounded-full",
      cover: "w-full h-48 rounded-xl",
      gallery: "w-full aspect-square rounded-lg",
    }[variant] || ""
  );
};

export function ImageUploader({
  value,
  onChange,
  onRemove,
  className,
  aspectRatio = "auto",
  variant = "cover",
  disabled = false,
  pathType = "gallery",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleImageUpload = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione um arquivo de imagem válido");
        return;
      }

      // Validar tamanho máximo (5MB)
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("Imagem muito grande. Tamanho máximo: 5MB");
        return;
      }

      setIsUploading(true);

      uploadImage(file, pathType)
        .then((result) => {
          if (result.error) {
            toast.error(result.error);
            return;
          }

          toast.success("Imagem carregada com sucesso!");
          onChange?.(result.url);
        })
        .catch(() => {
          toast.error("Erro ao carregar a imagem. Tente novamente mais tarde.");
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [onChange, pathType]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (!file) return;

      handleImageUpload(file);
    },
    [handleImageUpload]
  );

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      handleImageUpload(file);
    },
    [handleImageUpload]
  );

  const handleRemove = useCallback(async () => {
    if (!value) return;

    removeImage(value)
      .then(() => {
        onRemove?.();
      })
      .catch(() => {
        toast.error("Erro ao remover a imagem. Tente novamente mais tarde.");
      });
  }, [onRemove, value]);

  if (isUploading) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center",
          getVariantClasses(variant),
          getAspectClass(aspectRatio),
          className
        )}
      >
        <span className="text-muted-foreground text-sm">Carregando...</span>
      </div>
    );
  }

  if (value) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden",
          getVariantClasses(variant),
          getAspectClass(aspectRatio),
          className
        )}
      >
        <Image
          src={value}
          alt="Upload"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!disabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="gap-2"
            >
              <Trash className="h-4 w-4" />
              {variant !== "profile" && "Remover Imagem"}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-stone-300 bg-stone-50 transition-colors hover:bg-stone-100",
        isDragging && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-50",
        getVariantClasses(variant),
        getAspectClass(aspectRatio),
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        disabled={disabled}
      />
      <div className="pointer-events-none flex flex-col items-center gap-2">
        <div>
          {variant === "profile" ? (
            <Upload className="text-muted-foreground h-4 w-4" />
          ) : (
            <ImageIcon className="text-muted-foreground h-5 w-5" />
          )}
        </div>
        <span className="text-muted-foreground text-[10px] font-medium">
          {variant === "profile"
            ? "Carregar foto"
            : isDragging
              ? "Solte a imagem"
              : "Clique ou arraste"}
        </span>
      </div>
    </div>
  );
}
