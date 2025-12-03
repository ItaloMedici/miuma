"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ProfileEssentialsFormData } from "../schemas";
import { ImageUploader } from "./ImageUploader";

export function ProfileEssentials() {
  const form = useFormContext<ProfileEssentialsFormData>();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Informações Essenciais do Perfil
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Vamos começar com suas informações básicas.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <FormField
          control={form.control}
          name="profilePhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de Perfil</FormLabel>
              <FormControl>
                <div className="flex items-center gap-6">
                  <ImageUploader
                    variant="profile"
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange(undefined)}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Adicione uma foto para seu perfil de cuidador
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG ou GIF. Máx 5MB.
                    </p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome de Perfil{" "}
                <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-1">
                  <Input placeholder="Nome de perfil" {...field} />
                  <span className="text-xs text-muted-foreground leading-0.5">
                    <Info className="inline-block w-3 h-3 mr-1" />
                    Pode ser diferente do seu nome real e será exibido
                    publicamente. Ex.: O nome do seu abrigo.
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio Curta</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte um pouco sobre você e seu trabalho..."
                  className="resize-none h-24"
                  maxLength={160}
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormMessage />
                <p className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/160
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
