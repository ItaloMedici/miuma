export interface Address {
  id: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  street: string;
  complement?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressInput {
  city: string;
  state: string;
  country: string;
  zip: string;
  street: string;
  complement?: string;
}

export interface AddressSummary {
  city: string;
  state: string;
  country: string;
}

export function formatAddress(
  address: Address,
  format: "short" | "full" = "short"
): string {
  if (format === "short") {
    return `${address.city}, ${address.state}`;
  }

  const parts = [
    address.street,
    address.complement,
    address.city,
    address.state,
    address.zip,
    address.country,
  ].filter(Boolean);

  return parts.join(", ");
}
