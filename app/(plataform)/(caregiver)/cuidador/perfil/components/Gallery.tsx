"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { GalleryFormData } from "../schemas";
import { ImageUploader } from "./ImageUploader";

export function Gallery() {
  const form = useFormContext<GalleryFormData>();

  const galleryPhotos = form.watch("galleryPhotos") || [];

  const handleAddGalleryPhoto = (photo: string) => {
    const current = form.getValues("galleryPhotos") || [];
    if (current.length < 20) {
      form.setValue("galleryPhotos", [...current, photo]);
    }
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    const current = form.getValues("galleryPhotos") || [];
    form.setValue(
      "galleryPhotos",
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Galeria de Fotos
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Mostre seu abrigo e o ambiente onde cuida dos pets. Adicione até 20
          fotos para dar aos tutores uma visão completa.
        </p>
      </div>

      <div className="space-y-6">
        {/* Cover Image */}
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem de Capa</FormLabel>
              <FormControl>
                <ImageUploader
                  variant="cover"
                  aspectRatio="video"
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange(undefined)}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">
                Esta será a imagem principal do seu perfil. Recomendamos uma
                foto que mostre seu espaço de cuidado.
              </p>
            </FormItem>
          )}
        />

        {/* Gallery Photos */}
        <div className="space-y-3">
          <FormLabel>Fotos da Galeria</FormLabel>
          <p className="text-xs text-muted-foreground">
            Adicione fotos do ambiente, dos pets sob seus cuidados, e do dia a
            dia no abrigo.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <ImageUploader
                  variant="gallery"
                  value={photo}
                  onChange={(newPhoto) => {
                    const current = [...galleryPhotos];
                    current[index] = newPhoto;
                    form.setValue("galleryPhotos", current);
                  }}
                  onRemove={() => handleRemoveGalleryPhoto(index)}
                />
              </div>
            ))}
            {galleryPhotos.length < 20 && (
              <ImageUploader
                variant="gallery"
                onChange={handleAddGalleryPhoto}
                className="border-2 border-dashed"
              />
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{galleryPhotos.length} de 20 fotos adicionadas</span>
            {galleryPhotos.length >= 20 && (
              <span className="text-amber-600">Limite máximo atingido</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
