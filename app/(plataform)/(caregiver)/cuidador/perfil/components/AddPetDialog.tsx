"use client";

import { DatePicker } from "@/components/date-picker";
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
      age: undefined,
      description: "",
      photo: "",
      rescueDate: "",
      medicalNeeds: "",
      id: crypto.randomUUID(),
    },
  });

  const handleSubmit = (data: PetFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const handleAgeChange = (value: string) => {
    return value === "" ? undefined : parseInt(value);
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

            {/* Age and Rescue Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Idade{" "}
                      <span className="text-muted-foreground text-xs">
                        (Opcional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={30}
                        placeholder="Ex: 3"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(handleAgeChange(e.target.value))
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
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    label={
                      <>
                        Data de Resgate{" "}
                        <span className="text-muted-foreground text-xs">
                          (Opcional)
                        </span>
                      </>
                    }
                    placeholder="DD/MM/AAAA"
                  />
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
                  <FormLabel>
                    Necessidades Médicas{" "}
                    <span className="text-muted-foreground text-xs">
                      (Opcional)
                    </span>
                  </FormLabel>
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
