"use client";

import { Button } from "@/components/ui/button";
import { PetInCare } from "@/interfaces/caregiver";
import { cn } from "@/lib";
import { PawPrint } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GalleryModal } from "./GalleryModal";

const LIMIT = 6;

export const PetsInCare = ({ pets }: { pets: PetInCare[] }) => {
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
        <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
          <PawPrint className="w-4 h-4 text-muted-foreground" />
          Pets sob cuidado
        </h2>
      </div>

      <div
        className={cn("grid grid-cols-2 sm:grid-cols-3 gap-2", {
          "lg:grid-cols-4": limitedPets.length > 3,
        })}
      >
        {limitedPets.map((pet, index) => (
          <button
            key={pet.id}
            onClick={() => openGallery(index)}
            className="group relative w-full h-[100px] aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              width={150}
              height={100}
              className="object-cover h-full w-full"
            />
            {/* Overlay with pet name */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm truncate">
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
