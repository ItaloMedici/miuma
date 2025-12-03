"use server";

import { getServerSession } from "@/lib/auth-server";
import { caregiverUseCases } from "@/use-cases/caregiver";
import { CaregiverProfileFormData } from "./schemas";

export async function saveCaregiverProfile(data: CaregiverProfileFormData) {
  const session = await getServerSession();

  if (!session) {
    return { success: false, error: "User not authenticated" };
  }

  await caregiverUseCases.updateProfile(session.user.id, data);

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
