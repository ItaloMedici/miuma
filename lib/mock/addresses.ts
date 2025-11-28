import { Address } from "@/interfaces/address";

/**
 * Mock Addresses - Phase 1
 *
 * Address data for caregivers and users.
 */

export const mockAddresses: Address[] = [
  {
    id: "addr-001",
    city: "Itaúna",
    state: "MG",
    country: "Brasil",
    zip: "35680-000",
    street: "Rua das Flores, 123",
    complement: null,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
  {
    id: "addr-002",
    city: "Porto Alegre",
    state: "RS",
    country: "Brasil",
    zip: "90010-000",
    street: "Av. dos Animais, 456",
    complement: "Casa",
    createdAt: "2022-08-20T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
  {
    id: "addr-003",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    zip: "01310-100",
    street: "Av. Paulista, 1000",
    complement: "Apto 101",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
  {
    id: "addr-004",
    city: "Rio de Janeiro",
    state: "RJ",
    country: "Brasil",
    zip: "22071-060",
    street: "Av. Atlântica, 500",
    complement: null,
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
];

/**
 * Helper functions for address operations
 */

export function getAddressById(addressId: string): Address | undefined {
  return mockAddresses.find((address) => address.id === addressId);
}

export function getAddressesByCity(city: string): Address[] {
  return mockAddresses.filter(
    (address) => address.city.toLowerCase() === city.toLowerCase()
  );
}

export function getAddressesByState(state: string): Address[] {
  return mockAddresses.filter((address) => address.state === state);
}
