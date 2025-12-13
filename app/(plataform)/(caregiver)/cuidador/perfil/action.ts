"use server";

import { getServerSession } from "@/lib/auth-server";
import { imageClient } from "@/lib/image-client";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { redirect } from "next/navigation";
import {
  CaregiverProfileFormData,
  caregiverProfileFormSchema,
} from "./schemas";

export const uploadImage = async (
  image: File,
  imageType?: "profile" | "gallery"
) => {
  const result = await imageClient.upload({
    fileName: image.name,
    imageFile: image,
    imageType,
  });

  return result;
};

export const removeImage = async (imageUrl: string) => {
  return imageClient.remove(imageUrl);
};

export async function saveCaregiverProfile(data: CaregiverProfileFormData) {
  const session = await getServerSession();

  if (!session) {
    return { success: false, error: "Usuário não autenticado" };
  }

  const isValid = caregiverProfileFormSchema.safeParse(data);

  if (!isValid.success) {
    return { success: false, error: "Dados do formulário inválidos" };
  }

  await caregiverUseCases.updateProfile(session.user.id, isValid.data);

  return { success: true };
}

export interface BrasilAPIAddress {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export async function fetchAddressByCep(cep: string) {
  try {
    // Remove non-numeric characters
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return {
        success: false,
        error: "CEP deve conter 8 dígitos",
      };
    }

    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${cleanCep}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: "CEP não encontrado",
      };
    }

    const data: BrasilAPIAddress = await response.json();

    return {
      success: true,
      data: {
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        country: "Brasil",
      },
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    return {
      success: false,
      error: "Erro ao buscar CEP. Tente novamente.",
    };
  }
}

export async function checkSlugAvailability(slug: string) {
  try {
    const session = await getServerSession();

    if (!session) {
      redirect("/entrar");
    }

    const normalizedSlug = slug.toLowerCase().trim();

    if (normalizedSlug.length < 3) {
      return {
        available: false,
        message: "Slug deve ter pelo menos 3 caracteres",
      };
    }

    const existingCaregiver = await caregiverUseCases.checkSlugAvailability(
      normalizedSlug,
      session.user.id
    );

    if (!existingCaregiver) {
      return {
        available: true,
        message: "Slug disponível",
      };
    }

    return {
      available: false,
      message: "Este slug já está em uso",
    };
  } catch (error) {
    console.error("Error checking slug availability:", error);
    return {
      available: false,
      message: "Erro ao verificar disponibilidade do slug",
    };
  }
}
