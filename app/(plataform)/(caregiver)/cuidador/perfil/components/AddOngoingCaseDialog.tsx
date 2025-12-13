"use client";

import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OngoingCaseFormData, ongoingCaseSchema } from "../schemas";
import { ImageUploader } from "./ImageUploader";

interface AddOngoingCaseDialogProps {
  onAdd: (ongoingCase: OngoingCaseFormData) => void;
}

export function AddOngoingCaseDialog({ onAdd }: AddOngoingCaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<OngoingCaseFormData>({
    resolver: zodResolver(ongoingCaseSchema),
    defaultValues: {
      petName: "",
      title: "",
      description: "",
      targetAmount: 0,
      currentAmount: 0,
      photo: "",
    },
  });

  const handleSubmit = (data: OngoingCaseFormData) => {
    onAdd({
      ...data,
      id: crypto.randomUUID(),
    });
    form.reset();
    setOpen(false);
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
          Adicionar Caso
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-dvh w-full overflow-hidden p-0 sm:h-auto sm:max-h-[90vh] sm:max-w-[500px] sm:p-6">
        <div className="flex h-full flex-col sm:block">
          <DialogHeader className="shrink-0 p-6 sm:p-0">
            <DialogTitle>Adicionar Caso de Arrecadação</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex min-h-0 flex-1 flex-col sm:block"
            >
              <div className="flex-1 overflow-y-auto px-6 sm:px-0">
                <div className="space-y-4 py-4 sm:py-0">
                  <FormField
                    control={form.control}
                    name="petName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Pet</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Luna, Rex, Mimi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Campanha</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Cirurgia de Emergência, Tratamento de Câncer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva o caso e a necessidade de arrecadação..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta (R$)</FormLabel>
                          <FormControl>
                            <CurrencyInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arrecadado (R$)</FormLabel>
                          <FormControl>
                            <CurrencyInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foto (Opcional)</FormLabel>
                        <FormControl>
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                            onRemove={() => field.onChange("")}
                            aspectRatio="video"
                            variant="cover"
                            pathType="gallery"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Footer fixo no mobile */}
              <div className="border-border bg-background shrink-0 border-t p-6 sm:border-0 sm:bg-transparent sm:p-0 sm:pt-4">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar</Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
