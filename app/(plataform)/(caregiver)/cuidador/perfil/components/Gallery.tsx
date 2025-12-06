"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { GalleryFormData } from "../schemas";
import { ImageUploader } from "./ImageUploader";

export function Gallery() {
  const form = useFormContext<GalleryFormData>();

  const galleryPhotos = form.watch("galleryPhotos") || [];

  const handleAddGalleryPhoto = (url: string) => {
    const current = form.getValues("galleryPhotos") || [];
    if (current.length < 20) {
      form.setValue("galleryPhotos", [...current, { url, description: "" }]);
    }
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    const current = form.getValues("galleryPhotos") || [];
    form.setValue(
      "galleryPhotos",
      current.filter((_, i) => i !== index)
    );
  };

  const handleUpdatePhotoDescription = (index: number, description: string) => {
    const current = form.getValues("galleryPhotos") || [];
    const updated = [...current];
    updated[index] = { ...updated[index], description };
    form.setValue("galleryPhotos", updated);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">
          Galeria de Fotos
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Mostre seu abrigo e o ambiente onde cuida dos pets. Adicione até 20
          fotos para dar aos tutores uma visão completa.
        </p>
      </div>

      <div className="space-y-12">
        {/* Cover Image Section */}
        <div className="bg-card space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Imagem de Capa</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Esta será a imagem principal do seu perfil
            </p>
          </div>

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload da Imagem</FormLabel>
                <FormControl>
                  <ImageUploader
                    variant="gallery"
                    aspectRatio="video"
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImageDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (Alt Text)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Sala de estar do abrigo com cachorros descansando"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-muted-foreground mt-1 text-xs">
                  Opcional. Descreva a imagem para acessibilidade e SEO.
                </p>
              </FormItem>
            )}
          />
        </div>

        {/* Gallery Photos Section */}
        <div className="bg-card space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Galeria de Fotos</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Adicione fotos do ambiente, dos pets sob seus cuidados, e do dia a
              dia no abrigo
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="space-y-2">
                <ImageUploader
                  variant="gallery"
                  value={photo.url}
                  onChange={(newUrl) => {
                    const current = [...galleryPhotos];
                    current[index] = { ...current[index], url: newUrl };
                    form.setValue("galleryPhotos", current);
                  }}
                  onRemove={() => handleRemoveGalleryPhoto(index)}
                />
                <Input
                  placeholder="Descrição da foto (opcional)"
                  value={photo.description || ""}
                  onChange={(e) =>
                    handleUpdatePhotoDescription(index, e.target.value)
                  }
                  className="text-sm"
                />
              </div>
            ))}
            {galleryPhotos.length < 20 && (
              <div className="space-y-2">
                <ImageUploader
                  variant="gallery"
                  onChange={handleAddGalleryPhoto}
                  className="border-2 border-dashed"
                />
              </div>
            )}
          </div>
          <div className="text-muted-foreground flex items-center justify-between text-xs">
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
