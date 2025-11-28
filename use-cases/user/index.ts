import { User } from "@/interfaces/user";
import { getUserByEmail, getUserById, getUsersByRole } from "@/lib/mock/users";

async function getUser(userId: string): Promise<User | undefined> {
  return getUserById(userId);
}

async function getUserByEmailAddress(email: string): Promise<User | undefined> {
  return getUserByEmail(email);
}

async function getAllCaregivers(): Promise<User[]> {
  return getUsersByRole("CAREGIVER");
}

export const userUseCases = {
  getUser,
  getUserByEmailAddress,
  getAllCaregivers,
  createUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};
