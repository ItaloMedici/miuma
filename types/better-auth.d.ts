import type { auth } from "@/lib/auth";

type InferredSession = typeof auth.$Infer.Session.session;
type InferredUser = typeof auth.$Infer.Session.user;

declare module "better-auth/types" {
  export interface Session {
    session: InferredSession;
    user: InferredUser & {
      role: "SUPPORTER" | "CAREGIVER" | "ADMIN";
      addressId?: string | null;
    };
  }
}
