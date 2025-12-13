"use client";

import { ImageUploader } from "@/app/(plataform)/(caregiver)/cuidador/perfil/components/ImageUploader";
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
import { OngoingCase } from "@/interfaces/caregiver";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addOngoingCase, updateOngoingCase } from "../actions";

const caseSchema = z.object({
  petName: z.string(),
  title: z.string().min(5, "Título é obrigatório"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  targetAmount: z.number().min(1, "Meta deve ser positiva"),
  imageUrl: z.string().optional(),
});

type CaseFormData = z.infer<typeof caseSchema>;

interface CaseDialogProps {
  existingCase?: OngoingCase;
  trigger?: React.ReactNode;
}

export function CaseDialog({ existingCase, trigger }: CaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      petName: existingCase?.title.split(" - ")[0] || "",
      title: existingCase?.title || "",
      description: existingCase?.description || "",
      targetAmount: existingCase?.targetAmount || 0,
      imageUrl: existingCase?.imageUrl || "",
    },
  });

  const handleSubmit = (data: CaseFormData) => {
    startTransition(async () => {
      try {
        if (existingCase) {
          await updateOngoingCase(existingCase.id, {
            title: data.title,
            description: data.description,
            targetAmount: data.targetAmount,
            imageUrl: data.imageUrl,
          });
          toast.success("Caso atualizado com sucesso!");
        } else {
          await addOngoingCase({
            title: data.title,
            description: data.description,
            targetAmount: data.targetAmount,
            imageUrl: data.imageUrl,
          });
          toast.success("Caso criado com sucesso!");
        }
        form.reset();
        setOpen(false);
      } catch {
        toast.error("Erro ao salvar caso. Tente novamente.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Caso
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-full max-h-dvh w-dvw max-w-dvw overflow-hidden overflow-x-hidden p-0 sm:h-auto sm:max-h-[90vh] sm:max-w-[600px] sm:p-6">
        <div className="flex h-full max-w-dvw flex-col sm:block">
          <DialogHeader className="shrink-0 p-6 sm:p-0">
            <DialogTitle>
              {existingCase ? "Editar Caso" : "Novo Caso de Arrecadação"}
            </DialogTitle>
          </DialogHeader>
          {<pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>}
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex min-h-0 flex-1 flex-col sm:block"
            >
              <div className="max-h-[80vh] flex-1 overflow-y-auto px-6 sm:px-0">
                <div className="space-y-4 py-4 sm:py-0">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Caso</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Cirurgia urgente para Luna"
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
                            placeholder="Descreva o caso e porque você precisa de ajuda..."
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
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem do Caso (opcional)</FormLabel>
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
                        <p className="text-muted-foreground text-xs">
                          Adicione uma imagem para ilustrar o caso (PNG, JPG até
                          5MB)
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Footer fixo no mobile */}
              <div className="border-border bg-background mt-auto shrink-0 border-t p-4 sm:mt-0 sm:border-0 sm:bg-transparent sm:p-0 sm:pt-4">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending ?? form.formState.isSubmitting}
                  >
                    {isPending
                      ? "Salvando..."
                      : existingCase
                        ? "Salvar Alterações"
                        : "Criar Caso"}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
