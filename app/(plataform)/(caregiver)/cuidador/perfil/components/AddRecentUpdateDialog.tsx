"use client";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RecentUpdateFormData, recentUpdateSchema } from "../schemas";

interface AddRecentUpdateDialogProps {
  onAdd: (update: RecentUpdateFormData) => void;
}

export function AddRecentUpdateDialog({ onAdd }: AddRecentUpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<
    Array<{ url: string; alt: string }>
  >([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const form = useForm<RecentUpdateFormData>({
    resolver: zodResolver(recentUpdateSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      message: "",
      emoji: "",
      images: [],
    },
  });

  const handleSubmit = (data: RecentUpdateFormData) => {
    onAdd({
      ...data,
      id: crypto.randomUUID(),
      images: uploadingImages.length > 0 ? uploadingImages : undefined,
    });
    form.reset();
    setUploadingImages([]);
    setOpen(false);
  };

  const handleAddImage = () => {
    if (currentImageUrl.trim() && uploadingImages.length < 10) {
      const newImage = { url: currentImageUrl.trim(), alt: "" };
      setUploadingImages((prev) => [...prev, newImage]);
      setCurrentImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageAltChange = (index: number, alt: string) => {
    setUploadingImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt } : img))
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary gap-1"
        >
          <Plus className="h-3 w-3" />
          Adicionar Atualização
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar Atualização Recente</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <DatePicker
                    label="Data da Atualização"
                    value={field.value}
                    onChange={field.onChange}
                    maxDate={new Date()}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Compartilhe uma atualização sobre seus pets, casos ou atividades..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emoji (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 🐶 ❤️ 🎉"
                      maxLength={2}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-muted-foreground text-xs">
                    Adicione um emoji para dar mais emoção à atualização
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Fotos (opcional)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="URL da imagem"
                  value={currentImageUrl}
                  onChange={(e) => setCurrentImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImage();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddImage}
                  disabled={
                    !currentImageUrl.trim() || uploadingImages.length >= 10
                  }
                >
                  Adicionar
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Adicione até 10 fotos para ilustrar sua atualização
              </p>

              {/* Preview das imagens carregadas */}
              {uploadingImages.length > 0 && (
                <div className="mt-4 space-y-3">
                  {uploadingImages.map((img, index) => (
                    <div
                      key={index}
                      className="border-border flex items-start gap-3 rounded-lg border p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={img.url}
                          alt={img.alt || `Imagem ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Input
                          placeholder="Descrição da imagem (opcional)"
                          value={img.alt}
                          onChange={(e) =>
                            handleImageAltChange(index, e.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                  setUploadingImages([]);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Adicionar Atualização</Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
