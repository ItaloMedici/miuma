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

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen w-screen max-w-[100vw] overflow-y-auto md:max-h-screen md:max-w-screen lg:h-fit lg:max-w-[80vw] xl:max-w-[60vw] 2xl:max-w-[50vw]">
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
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Pet Photo */}
              <div className="flex-1 shrink-0">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormLabel>Foto do Pet</FormLabel>
                      <FormControl>
                        <ImageUploader
                          variant="gallery"
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange(undefined)}
                          className="h-48 w-full rounded-md md:h-64 lg:h-full lg:max-h-[500px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex-1.4 flex flex-col gap-4">
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
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
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
