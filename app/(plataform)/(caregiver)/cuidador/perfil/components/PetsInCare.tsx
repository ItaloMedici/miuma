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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
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
          <Plus className="w-4 h-4" />
          Adicionar Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Nenhum pet adicionado</h3>
            <p className="text-sm text-muted-foreground mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map((pet) => (
            <Card
              key={pet.id}
              className="p-4 group hover:border-primary transition-all flex flex-col"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-muted shrink-0 overflow-hidden relative">
                  {pet.photo ? (
                    <Image
                      src={pet.photo}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-xs">Sem foto</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">
                    {pet.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {pet.species && getSpeciesLabel(pet.species)}
                    {pet.species && pet.age !== undefined && " • "}
                    {pet.age !== undefined &&
                      `${pet.age} ${pet.age === 1 ? "ano" : "anos"}`}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
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
                  className="text-xs h-8 flex-1"
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemovePet(pet.id!)}
                  className="text-xs h-8 flex-1"
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
