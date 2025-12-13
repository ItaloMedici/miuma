"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, Check } from "lucide-react";
import Link from "next/link";

interface WelcomeOnboardingProps {
  caregiverName: string;
  isProfileComplete: boolean;
  accountVerified: boolean;
}

export function WelcomeOnboarding({
  caregiverName,
  isProfileComplete,
  accountVerified,
}: WelcomeOnboardingProps) {
  // Se a conta já foi verificada, não mostrar o onboarding
  if (accountVerified) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="flex-1">
        <CardContent>
          {/* Conteúdo Principal */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight">
                Bem-vindo à Miuma, {caregiverName}! 👋
              </h2>
              <p className="text-muted-foreground hidden text-sm leading-relaxed md:block">
                Estamos animados em ter você. Para garantir confiança e
                segurança para todos os doadores, nossa equipe verifica
                manualmente cada conta de cuidador. Por favor, complete seu
                perfil para que possamos revisar sua aplicação.
              </p>
            </div>

            {/* Passos do Onboarding */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Passo 1 - Criar Conta */}
              <div className="flex min-w-fit items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-muted-foreground text-sm line-through">
                  Criar Conta
                </p>
              </div>

              {/* Horizontal line */}
              <hr className="border-muted hidden h-px w-full md:block" />

              {/* Passo 2 - Completar Perfil */}
              <div className="flex min-w-fit items-center gap-3">
                {isProfileComplete ? (
                  <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                    2
                  </div>
                )}
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  <p
                    className={cn("text-sm font-medium", {
                      "text-muted-foreground line-through": isProfileComplete,
                    })}
                  >
                    Completar Detalhes do Perfil
                  </p>
                  {isProfileComplete ? null : (
                    <Button
                      asChild
                      variant="link"
                      className="text-primary h-auto p-0 text-sm"
                    >
                      <Link href="/cuidador/perfil">Ir para o Perfil</Link>
                    </Button>
                  )}
                </div>
              </div>

              <hr className="border-muted hidden h-px w-full md:block" />

              {/* Passo 3 - Revisão da Equipe */}
              <div className="flex min-w-fit items-center gap-3">
                <div
                  className={cn(
                    "bg-muted text-muted-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    {
                      "bg-yellow-50 text-yellow-700": isProfileComplete,
                    }
                  )}
                >
                  3
                </div>
                <p
                  className={cn("text-muted-foreground text-sm", {
                    "text-muted-foreground": !isProfileComplete,
                    "text-foreground": isProfileComplete,
                  })}
                >
                  Revisão da Equipe (24-48 horas)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Status Card */}
      <div className="flex-[0.25]">
        <Card className="h-full border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="h-full space-y-2 p-4">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <h3 className="text-sm font-semibold">Conta em Análise</h3>
            </div>
            <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
              Sua página pública está atualmente oculta. Uma vez validada, você
              receberá um email e sua página entrará no ar.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
