"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PawPrint } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GalleryModal } from "./GalleryModal";
import { useCaregiverProfile } from "./context";
import { PET_IMAGE_PLACEHOLDER } from "../../(caregiver)/cuidador/perfil/constants";

const LIMIT = 6;

export const PetsInCare = () => {
  const { petsInCare: pets } = useCaregiverProfile();

  const [modalOpen, setModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  if (!pets || pets.length === 0) return null;

  const limitedPets = pets.slice(0, LIMIT); // Limit to first 8 pets
  const hasMore = pets.length > LIMIT;

  const openGallery = (index: number) => {
    setInitialIndex(index);
    setModalOpen(true);
  };

  return (
    <section id="pets" className="space-y-6">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight md:text-2xl">
          <PawPrint className="text-muted-foreground h-4 w-4" />
          Pets sob cuidado
        </h2>
      </div>

      <div
        className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", {
          "lg:grid-cols-4": limitedPets.length > 3,
        })}
      >
        {limitedPets.map((pet, index) => (
          <button
            key={`pet-in-care-${pet.name}`}
            onClick={() => openGallery(index)}
            className="group corner-squircle relative aspect-square h-[150px] w-full cursor-pointer overflow-hidden rounded-2xl transition-opacity hover:opacity-90 sm:h-[300px]"
          >
            <Image
              src={pet.imageUrl?.length ? pet.imageUrl : PET_IMAGE_PLACEHOLDER}
              alt={pet.name}
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
            {/* Overlay with pet name */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute right-0 bottom-0 left-0 p-3">
                <p className="truncate text-sm font-semibold text-white">
                  {pet.name}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {hasMore && (
        <Button
          onClick={() => openGallery(0)}
          variant={"link"}
          size={"sm"}
          className="w-full"
        >
          Ver todos
        </Button>
      )}

      <GalleryModal
        images={pets.map((pet) => ({
          url: pet.imageUrl,
          title: pet.name,
          description: pet.description,
          alt: pet.name,
        }))}
        isOpen={modalOpen}
        initialIndex={initialIndex}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
