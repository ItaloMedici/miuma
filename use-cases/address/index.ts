import { db } from "@/db";
import { addresses } from "@/db/schema";
import { Address, AddressSummary, formatAddress } from "@/interfaces/address";
import {
  getAddressById,
  getAddressesByCity,
  getAddressesByState,
} from "@/lib/mock/addresses";
import { eq } from "drizzle-orm";

async function getAddress(addressId: string): Promise<Address | undefined> {
  return getAddressById(addressId);
}

async function getAddressesByCityName(city: string): Promise<Address[]> {
  return getAddressesByCity(city);
}

async function getAddressesByStateName(state: string): Promise<Address[]> {
  return getAddressesByState(state);
}

async function getAddressSummary(
  addressId: string
): Promise<AddressSummary | null> {
  const address = await getAddress(addressId);

  if (!address) {
    return null;
  }

  return {
    city: address.city,
    state: address.state,
    country: address.country,
  };
}

async function getFormattedAddress(
  addressId: string,
  format: "short" | "full" = "short"
): Promise<string | null> {
  const address = await getAddress(addressId);

  if (!address) {
    return null;
  }

  return formatAddress(address, format);
}

async function createAddress(input: typeof addresses.$inferInsert) {
  const addressResult = await db.insert(addresses).values(input).returning();

  return addressResult[0];
}

async function updateAddress(
  addressId: string,
  input: Partial<typeof addresses.$inferInsert>
) {
  const addressResult = await db
    .update(addresses)
    .set(input)
    .where(eq(addresses.id, addressId))
    .returning();

  return addressResult[0];
}

export const addressUseCases = {
  getAddress,
  getAddressesByCityName,
  getAddressesByStateName,
  getAddressSummary,
  getFormattedAddress,
  create: createAddress,
  update: updateAddress,
  deleteAddress: () => {},
};
