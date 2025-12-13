import { db } from "@/db";
import { addresses } from "@/db/schema";
import { Address, AddressSummary, formatAddress } from "@/interfaces/address";
import { eq, ilike } from "drizzle-orm";

async function getAddress(addressId: string): Promise<Address | undefined> {
  const result = await db
    .select()
    .from(addresses)
    .where(eq(addresses.id, addressId))
    .limit(1);

  if (!result[0]) return undefined;

  return {
    id: result[0].id,
    city: result[0].city,
    state: result[0].state,
    country: result[0].country,
    zip: result[0].zipCode,
    street: result[0].street,
    complement: result[0].complement,
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
}

async function getAddressesByCityName(city: string): Promise<Address[]> {
  const result = await db
    .select()
    .from(addresses)
    .where(ilike(addresses.city, `%${city}%`));

  return result.map((addr) => ({
    id: addr.id,
    city: addr.city,
    state: addr.state,
    country: addr.country,
    zip: addr.zipCode,
    street: addr.street,
    complement: addr.complement,
    createdAt: addr.createdAt.toISOString(),
    updatedAt: addr.updatedAt.toISOString(),
  }));
}

async function getAddressesByStateName(state: string): Promise<Address[]> {
  const result = await db
    .select()
    .from(addresses)
    .where(ilike(addresses.state, `%${state}%`));

  return result.map((addr) => ({
    id: addr.id,
    city: addr.city,
    state: addr.state,
    country: addr.country,
    zip: addr.zipCode,
    street: addr.street,
    complement: addr.complement,
    createdAt: addr.createdAt.toISOString(),
    updatedAt: addr.updatedAt.toISOString(),
  }));
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
