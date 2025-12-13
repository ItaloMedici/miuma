"use client";

import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Lightbulb, QrCode } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { BillingInfoFormData } from "../schemas";

export function BillingInfo() {
  const form = useFormContext<BillingInfoFormData>();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Informações Financeiras
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Configure sua chave Pix para receber doações. Esta é a única
          informação obrigatória para receber contribuições.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary/10 text-primary h-9 w-9 rounded-lg p-2">
              <Icons.Pix className="text-primary" />
            </div>
            <div>
              <h3 className="text-foreground font-medium">
                Sua Chave Pix (Recebedor)
              </h3>
              <p className="text-muted-foreground text-xs">
                Esta chave será exibida para os doadores
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="pixKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chave Pix</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>
                        <QrCode className="h-4 w-4" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="email@exemplo.com, CPF, telefone ou chave aleatória"
                      {...field}
                    />
                  </InputGroup>
                </FormControl>
                <p className="text-muted-foreground mt-2 text-xs">
                  <Lightbulb className="mr-1 inline h-4 w-4" />{" "}
                  <strong>Dica:</strong> Verifique se a chave está correta antes
                  de continuar. Ela será usada para transferências diretas.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="border-blue-200 bg-blue-50/50 p-4">
          <div className="flex gap-3">
            <div className="shrink-0 text-blue-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-foreground mb-1 text-sm font-medium">
                Informação importante
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Você poderá trocar sua chave Pix a qualquer momento nas
                configurações do seu perfil. Certifique-se de manter suas
                informações atualizadas para garantir o recebimento das
                contribuições.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
