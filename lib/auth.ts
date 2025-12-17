import PasswordResetEmail from "@/components/emails/password-reset";
import { db } from "@/db";
import * as schemas from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { email } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schemas,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      email.send({
        to: user.email,
        subject: "Redefinição de senha - Miuma",
        react: PasswordResetEmail({ resetLink: url, userEmail: user.email }),
      });
    },
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CAREGIVER",
      },
      addressId: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [nextCookies()],
});
