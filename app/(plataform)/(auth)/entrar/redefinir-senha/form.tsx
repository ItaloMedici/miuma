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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Senha deve conter letras maiúsculas, minúsculas e números"
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onBlur",
  });

  const onSubmit = async ({ password }: ResetPasswordFormValues) => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Token de redefinição inválido ou expirado.", {
        duration: 5000,
        position: "bottom-center",
      });
      return;
    }

    setIsLoading(true);

    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setIsLoading(false);

    if (error) {
      console.error("Error resetting password:", error);

      if (error.status === 400) {
        toast.error(
          "Link de redefinição inválido ou expirado. Solicite um novo link.",
          {
            duration: 5000,
            position: "bottom-center",
          }
        );
      } else {
        toast.error("Erro ao redefinir senha. Tente novamente.", {
          duration: 5000,
          position: "bottom-center",
        });
      }
      return;
    }

    if (data) {
      setIsSuccess(true);
      toast.success("Senha redefinida com sucesso!", {
        duration: 5000,
        position: "bottom-center",
        icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/entrar");
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h2 className="mb-2 text-lg font-semibold text-green-900">
          Senha redefinida com sucesso!
        </h2>
        <p className="text-muted-foreground text-sm">
          Você será redirecionado para a página de login em instantes...
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <PasswordField placeholder="Digite sua nova senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar nova senha</FormLabel>
              <FormControl>
                <PasswordField
                  placeholder="Confirme sua nova senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redefinindo...
            </>
          ) : (
            "Redefinir senha"
          )}
        </Button>
      </form>
    </Form>
  );
};
