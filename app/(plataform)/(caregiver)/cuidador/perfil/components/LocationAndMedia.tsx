"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BRAZILIAN_STATES } from "@/lib/constants/brazilian-states";
import { UseFormReturn } from "react-hook-form";
import { LocationAndMediaFormData } from "../schemas";
import { ImageUploader } from "./ImageUploader";

interface LocationAndMediaProps {
  form: UseFormReturn<LocationAndMediaFormData>;
}

export function LocationAndMedia({ form }: LocationAndMediaProps) {
  const galleryPhotos = form.watch("galleryPhotos") || [];

  const handleAddGalleryPhoto = (photo: string) => {
    const current = form.getValues("galleryPhotos") || [];
    if (current.length < 10) {
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
          Localização e Galeria
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Onde você está localizado e mostre-nos seu abrigo.
        </p>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Sua cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    {...field}
                  >
                    <option value="">Selecione</option>
                    {BRAZILIAN_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.code}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input readOnly className="bg-muted" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
            </FormItem>
          )}
        />

        {/* Gallery Photos */}
        <div className="space-y-3">
          <FormLabel>Fotos da Galeria</FormLabel>
          <div className="grid grid-cols-3 gap-3">
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
            {galleryPhotos.length < 10 && (
              <ImageUploader
                variant="gallery"
                onChange={handleAddGalleryPhoto}
                className="border-2 border-dashed"
              />
            )}
          </div>
          {galleryPhotos.length >= 10 && (
            <p className="text-xs text-muted-foreground">
              Máximo de 10 fotos atingido
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
