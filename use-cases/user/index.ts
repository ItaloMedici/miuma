import { db } from "@/db";
import { users } from "@/db/schema";
import { User } from "@/interfaces/user";
import { eq } from "drizzle-orm";

async function getUser(userId: string): Promise<User | undefined> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!result[0]) return undefined;

  return {
    id: result[0].id,
    email: result[0].email,
    name: result[0].name,
    password: "", // Never return password
    emailVerified: result[0].emailVerified,
    role: result[0].role,
    addressId: result[0].addressId || undefined,
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
}

async function getUserByEmailAddress(email: string): Promise<User | undefined> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!result[0]) return undefined;

  return {
    id: result[0].id,
    email: result[0].email,
    name: result[0].name,
    password: "", // Never return password
    emailVerified: result[0].emailVerified,
    role: result[0].role,
    addressId: result[0].addressId || undefined,
    createdAt: result[0].createdAt.toISOString(),
    updatedAt: result[0].updatedAt.toISOString(),
  };
}

export const userUseCases = {
  getUser,
  getUserByEmailAddress,
  createUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};
