import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { env } from "./env";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type AuthClient = typeof authClient;
export type Session = typeof auth.$Infer.Session;
