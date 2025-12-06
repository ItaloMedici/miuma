"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { PetFormData, PetsInCareFormData } from "../schemas";
import { AddPetDialog } from "./AddPetDialog";

export function PetsInCare() {
  const form = useFormContext<PetsInCareFormData>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<PetFormData | undefined>();

  const pets = form.watch("pets") || [];

  const handleAddPet = (pet: PetFormData) => {
    const currentPets = form.getValues("pets") || [];
    form.setValue("pets", [
      ...currentPets,
      { ...pet, id: crypto.randomUUID() },
    ]);
  };

  const handleEditPet = (pet: PetFormData) => {
    setEditingPet(pet);
    setDialogOpen(true);
  };

  const handleUpdatePet = (updatedPet: PetFormData) => {
    const currentPets = form.getValues("pets") || [];
    form.setValue(
      "pets",
      currentPets.map((p) => (p.id === editingPet?.id ? updatedPet : p))
    );
    setEditingPet(undefined);
  };

  const handleRemovePet = (petId: string) => {
    const currentPets = form.getValues("pets") || [];
    form.setValue(
      "pets",
      currentPets.filter((p) => p.id !== petId)
    );
  };

  const getSpeciesLabel = (species: string) => {
    switch (species) {
      case "dog":
        return "Cachorro";
      case "cat":
        return "Gato";
      default:
        return "Outro";
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Pets sob Cuidado
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Gerencie os animais atualmente sob sua proteção.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditingPet(undefined);
            setDialogOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto max-w-sm">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Plus className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Nenhum pet adicionado</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Adicione os pets que estão sob seus cuidados para que os
              apoiadores possam conhecê-los.
            </p>
            <Button
              type="button"
              onClick={() => setDialogOpen(true)}
              variant="outline"
            >
              Adicionar Primeiro Pet
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pets.map((pet) => (
            <Card
              key={pet.id}
              className="group hover:border-primary flex flex-col p-4 transition-all"
            >
              <div className="flex gap-4">
                <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  {pet.photo ? (
                    <Image
                      src={pet.photo}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                      <span className="text-xs">Sem foto</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-foreground text-sm font-medium">
                    {pet.name}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {pet.species && getSpeciesLabel(pet.species)}
                    {pet.species && pet.age !== undefined && " • "}
                    {pet.age !== undefined &&
                      `${pet.age} ${pet.age === 1 ? "ano" : "anos"}`}
                  </p>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                    {pet.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPet(pet)}
                  className="h-8 flex-1 text-xs"
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemovePet(pet.id!)}
                  className="h-8 flex-1 text-xs"
                >
                  Remover
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AddPetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={editingPet ? handleUpdatePet : handleAddPet}
        editingPet={editingPet}
      />
    </div>
  );
}
