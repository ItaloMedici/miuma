import { CaregiverDataJson } from "@/interfaces/caregiver";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("role", ["SUPPORTER", "CAREGIVER", "ADMIN"]);

export type UserRole = (typeof rolesEnum.enumValues)[number];

export const USER_ROLES = {
  SUPPORTER: "SUPPORTER",
  CAREGIVER: "CAREGIVER",
  ADMIN: "ADMIN",
} as const;

export const addresses = pgTable("addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  street: varchar("street", { length: 255 }).notNull(),
  neighborhood: varchar("neighborhood", { length: 100 }).notNull(),
  number: varchar("number", { length: 20 }).notNull(),
  complement: varchar("complement", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  role: rolesEnum().notNull().default("CAREGIVER"),
  addressId: uuid("address_id").references(() => addresses.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subscriptionStatusEnum = pgEnum("subscription_paxyment_status", [
  "DISABLED",
  "PENDING_PROVIDER_SETUP",
  "REJECTED",
  "READY",
]);

export type SubscriptionStatus =
  (typeof subscriptionStatusEnum.enumValues)[number];

export const SUBSCRIPTION_STATUS = {
  DISABLED: "DISABLED",
  PENDING_PROVIDER_SETUP: "PENDING_PROVIDER_SETUP",
  REJECTED: "REJECTED",
  READY: "READY",
} as const;

export const caregiversTable = pgTable(
  "caregivers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id)
      .unique(),

    profileSlug: varchar("profile_slug", { length: 75 }).notNull().unique(),
    addressId: uuid("address_id").references(() => addresses.id),

    accountVerified: boolean("account_verified").notNull().default(false),
    active: boolean("active").notNull().default(false),
    caregiverImageUrl: varchar("caregiver_image_url", { length: 255 }),
    publicName: varchar("public_name", { length: 255 }).notNull(),
    shortBio: varchar("short_bio", { length: 160 }).notNull(),

    subscriptionPaymentStatus: subscriptionStatusEnum()
      .notNull()
      .default("DISABLED"),

    providerReceiverId: varchar("provider_receiver_id", { length: 100 }),
    pixKey: varchar("pix_key", { length: 100 }),

    data: json("data").notNull().default("{}").$type<CaregiverDataJson>(),

    inactiveAt: timestamp("inactive_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("caregivers_profileSlug_idx").on(table.profileSlug)]
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export type AddressEntity = typeof addresses.$inferSelect;

export type CaregiverEntity = typeof caregiversTable.$inferSelect & {
  address?: AddressEntity;
};
