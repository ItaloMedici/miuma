"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageUploaderProps {
  value?: string;
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
          "relative overflow-hidden group",
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
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onRemove}
              className="gap-2"
            >
              <X className="w-4 h-4" />
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
        "relative border-2 border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100 transition-colors flex flex-col items-center justify-center cursor-pointer group",
        isDragging && "border-primary bg-primary/5",
        disabled && "opacity-50 cursor-not-allowed",
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
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        disabled={disabled}
      />
      <div className="flex flex-col items-center gap-2 pointer-events-none">
        <div>
          {variant === "profile" ? (
            <Upload className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
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
