import { User } from "@/interfaces/user";

/**
 * Mock Users - Phase 1
 *
 * Phase 1 includes only CAREGIVER users.
 * SUPPORTER users will be added in Phase 2.
 */

export const mockUsers: User[] = [
  {
    id: "user-001",
    email: "maria.silva@example.com",
    name: "Maria Silva",
    password: "$2b$10$hashedpassword1", // Mock hashed password
    emailVerified: true,
    role: "CAREGIVER",
    addressId: "addr-001",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
  {
    id: "user-002",
    email: "jose.almeida@example.com",
    name: "José Almeida",
    password: "$2b$10$hashedpassword2", // Mock hashed password
    emailVerified: true,
    role: "CAREGIVER",
    addressId: "addr-002",
    createdAt: "2022-08-20T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
  {
    id: "user-003",
    email: "admin@miuma.com",
    name: "Admin Miuma",
    password: "$2b$10$hashedpassword3", // Mock hashed password
    emailVerified: true,
    role: "ADMIN",
    addressId: undefined,
    createdAt: "2022-01-01T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
];

/**
 * Helper functions for user operations
 */

export function getUserById(userId: string): User | undefined {
  return mockUsers.find((user) => user.id === userId);
}

export function getUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}

export function getUsersByRole(role: User["role"]): User[] {
  return mockUsers.filter((user) => user.role === role);
}

export function getCaregiverUsers(): User[] {
  return getUsersByRole("CAREGIVER");
}
