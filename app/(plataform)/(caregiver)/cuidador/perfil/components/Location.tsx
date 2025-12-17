"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMask } from "@react-input/mask";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { fetchAddressByCep } from "../action";
import { LocationFormData } from "../schemas";

export function Location() {
  const form = useFormContext<LocationFormData>();
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const inputRef = useMask({ mask: "_____-___", replacement: { _: /\d/ } });

  const handleCepBlur = async () => {
    const cep = form.getValues("zipCode");
    if (!cep || cep.length < 8) return;

    setIsLoadingCep(true);
    const result = await fetchAddressByCep(cep);
    setIsLoadingCep(false);

    if (result.success && result.data) {
      form.setValue("street", result.data.street);
      form.setValue("neighborhood", result.data.neighborhood);
      form.setValue("city", result.data.city);
      form.setValue("state", result.data.state);
      form.setValue("country", result.data.country);

      form.trigger("street");
      form.trigger("neighborhood");
      form.trigger("city");
      form.trigger("state");
      form.trigger("country");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Localização
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Onde você está localizado? Isso ajuda tutores a encontrarem você.
        </p>
      </div>

      <div className="space-y-6">
        {/* CEP */}
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="00000-000"
                    {...field}
                    ref={inputRef}
                    onBlur={() => {
                      field.onBlur();
                      handleCepBlur();
                    }}
                  />
                  {isLoadingCep && (
                    <Loader2 className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-muted-foreground mt-1 text-xs">
                Digite o CEP para preencher automaticamente o endereço
              </p>
            </FormItem>
          )}
        />

        {/* Street and Number */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Rua/Avenida</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome da rua"
                    {...field}
                    readOnly
                    className="bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Complement and Neighborhood */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apto, bloco, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do bairro"
                    {...field}
                    readOnly
                    className="bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* City, State, and Country */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_1fr]">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sua cidade"
                      {...field}
                      readOnly
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      {...field}
                      placeholder="Seu estado"
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input readOnly className="bg-muted" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
