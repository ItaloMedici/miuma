export type UserRole = "SUPPORTER" | "CAREGIVER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  emailVerified: boolean;

  role: UserRole;

  addressId?: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * User Roles table structure (Phase 2)
 * Keeping for reference - will be implemented in Phase 2
 */
export interface UserRoleEntity {
  id: string;
  userId: string; // FK to USERS
  role: UserRole;
  createdAt: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  addressId?: string;
}
