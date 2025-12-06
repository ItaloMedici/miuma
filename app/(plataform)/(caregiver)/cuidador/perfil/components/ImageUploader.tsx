"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageUploaderProps {
  value?: string | null;
  onChange?: (value: string) => void;
  onRemove?: () => void;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
  variant?: "profile" | "cover" | "gallery";
  disabled?: boolean;
}

export function ImageUploader({
  value,
  onChange,
  onRemove,
  className,
  aspectRatio = "auto",
  variant = "cover",
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        // In production, upload to storage service
        const reader = new FileReader();
        reader.onload = () => {
          onChange?.(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onChange?.(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      default:
        return "";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "profile":
        return "w-24 h-24 rounded-full";
      case "cover":
        return "w-full h-48 rounded-xl";
      case "gallery":
        return "w-full aspect-square rounded-lg";
      default:
        return "";
    }
  };

  if (value) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden",
          getVariantClasses(),
          getAspectClass(),
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
        {!disabled && onRemove && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onRemove}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Remover
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
        getVariantClasses(),
        getAspectClass(),
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
