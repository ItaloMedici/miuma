"use client";

import { PasswordField } from "@/components/password-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onBlur",
  });

  const onSubmit = ({ email, password }: SignInFormValues) => {
    const callbackUrl = "/cuidador/dashboard";

    authClient.signIn.email(
      {
        email,
        password,
        callbackURL: callbackUrl,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          // Redirect handled by better-auth
          router.push(callbackUrl);
          setIsLoading(false);
        },
        onError: (ctx) => {
          console.log("Error signing in user", ctx);
          setIsLoading(false);

          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            form.setError("email", {
              type: "manual",
              message: "Email ou senha inválidos.",
            });
            form.setError("password", {
              type: "manual",
              message: "",
            });
          }
        },
      }
    );
  };

  const onPasswordReset = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!form.getValues("email")) {
      form.setError("email", {
        type: "manual",
        message: "Por favor, insira seu email para redefinir a senha.",
      });
      return;
    }

    form.clearErrors();

    const resetPageUrl = `${env.NEXT_PUBLIC_URL}/entrar/redefinir-senha`;

    const { data, error } = await authClient.requestPasswordReset({
      email: form.getValues("email"),
      redirectTo: resetPageUrl,
    });

    console.log({
      data,
      error,
    });

    if (error) {
      form.setError("email", {
        type: "manual",
        message: "Erro ao solicitar redefinição de senha. Tente novamente.",
      });
      return;
    }

    toast(
      "Se este email existe em nosso sistema, verifique seu email para o link de redefinição.",
      {
        duration: 8000,
        position: "bottom-center",
        icon: <MailCheck className="text-muted-foreground mr-2 h-4 w-4" />,
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordField placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
              <span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground float-end p-0 text-xs"
                  onClick={onPasswordReset}
                >
                  Esqueci minha senha
                </Button>
              </span>
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
};
