"use client";

import { PasswordField } from "@/components/password-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserRole } from "@/interfaces/users";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendWelcomeEmail } from "./action";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    // phone: z
    //   .string()
    //   .min(10, "Telefone deve ter pelo menos 10 dígitos")
    //   .regex(
    //     /^[\d\s()-]+$/,
    //     "Telefone deve conter apenas números e caracteres especiais"
    //   ),
    email: z.email("Email inválido"),
    confirmEmail: z.email("Email inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter letras maiúsculas, minúsculas e números"
      ),
    role: z.enum(UserRole),
  })
  .refine(
    (data: { email: string; confirmEmail: string }) =>
      data.email === data.confirmEmail,
    {
      message: "Os emails não coincidem",
      path: ["confirmEmail"],
    }
  );

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUpForm = ({ role }: { role: UserRole }) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      // phone: "",
      email: "",
      confirmEmail: "",
      password: "",
      role: role,
    },
    reValidateMode: "onBlur",
  });

  const onSubmit = async ({ name, email, password }: SignUpFormValues) => {
    const redirectURL = role === UserRole.Caregiver ? "/cuidador/perfil" : "/";
    const url = searchParams.get("callbackURL") || redirectURL;

    await authClient.signUp.email(
      {
        email,
        password,
        callbackURL: url,
        name: name,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          sendWelcomeEmail(ctx.data.user.id);
          router.push(url);
        },
        onError: (ctx) => {
          setIsLoading(false);

          if (ctx.error?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            form.setError("email", {
              type: "manual",
              message: "Este email já está em uso. Use outro email.",
            });
          }
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Confirme seu email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordField placeholder="Crie uma senha forte" {...field} />
              </FormControl>
              <FormDescription className="text-[10px] text-stone-400 text-right">
                Mínimo de 8 caracteres
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Input type="hidden" {...field} />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            "Criar Conta"
          )}
        </Button>
      </form>
    </Form>
  );
};
