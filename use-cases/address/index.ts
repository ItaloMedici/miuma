import { Address, AddressSummary, formatAddress } from "@/interfaces/address";
import {
  getAddressById,
  getAddressesByCity,
  getAddressesByState,
} from "@/lib/mock/addresses";

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

export const addressUseCases = {
  getAddress,
  getAddressesByCityName,
  getAddressesByStateName,
  getAddressSummary,
  getFormattedAddress,
  createAddress: () => {},
  updateAddress: () => {},
  deleteAddress: () => {},
};
