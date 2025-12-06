"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetFormData, petSchema } from "../schemas";
import { ImageUploader } from "./ImageUploader";

interface AddPetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PetFormData) => void;
  editingPet?: PetFormData;
}

export function AddPetDialog({
  open,
  onOpenChange,
  onSubmit,
  editingPet,
}: AddPetDialogProps) {
  const form = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: editingPet || {
      name: "",
      species: "dog",
      age: 0,
      description: "",
      photo: "",
      rescueDate: "",
      medicalNeeds: "",
    },
  });

  const handleSubmit = (data: PetFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen w-screen max-w-[100vw] overflow-y-auto md:h-[90vh] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingPet ? "Editar Pet" : "Adicionar Novo Pet"}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações sobre o pet sob seus cuidados.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Pet Photo */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto do Pet</FormLabel>
                  <FormControl>
                    <ImageUploader
                      variant="cover"
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={() => field.onChange(undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name and Species */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Pet</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Luna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Espécie{" "}
                      <span className="text-muted-foreground">(Opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        className="border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
                        {...field}
                      >
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                        <option value="other">Outro</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Age and Rescue Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Idade (anos){" "}
                      <span className="text-muted-foreground">(Opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={30}
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rescueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Resgate (opcional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Conte sobre o pet, sua história, personalidade..."
                      className="h-24 resize-none"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex items-center justify-between">
                    <FormMessage />
                    <p className="text-muted-foreground text-xs">
                      {field.value?.length || 0}/500
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {/* Medical Needs */}
            <FormField
              control={form.control}
              name="medicalNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Necessidades Médicas (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva condições médicas, medicamentos, tratamentos..."
                      className="h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingPet ? "Salvar Alterações" : "Adicionar Pet"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
