"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { checkSlugAvailability } from "../action";
import { normalizeSlug } from "../form-utils";
import { ProfileEssentialsFormData } from "../schemas";
import { ImageUploader } from "./ImageUploader";

export function ProfileEssentials() {
  const form = useFormContext<ProfileEssentialsFormData>();
  const [slugStatus, setSlugStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({
    checking: false,
    available: null,
    message: "",
  });

  const handleSlugValidation = async (slug: string) => {
    const isDirty = form.formState.dirtyFields.slug;
    if (!isDirty) return;

    if (!slug || slug.length < 3) {
      setSlugStatus({
        checking: false,
        available: null,
        message: "",
      });
      return;
    }

    setSlugStatus({ checking: true, available: null, message: "" });

    const result = await checkSlugAvailability(slug);

    setSlugStatus({
      checking: false,
      available: result.available,
      message: result.message,
    });

    if (!result.available) {
      form.setError("slug", {
        type: "manual",
        message: result.message,
      });
      return;
    }

    form.clearErrors("slug");
  };

  const handleSlugChange = (value: string) => {
    form.setValue("slug", normalizeSlug(value));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Informações Essenciais do Perfil
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
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
                    pathType="profile"
                  />
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Adicione uma foto para seu perfil de cuidador
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
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
                <Input placeholder="Seu nome" {...field} disabled />
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
                  <span className="text-muted-foreground text-xs leading-0.5">
                    <Info className="mr-1 inline-block h-3 w-3" />
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
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Perfil</FormLabel>
              <FormControl>
                <InputGroup
                  className={
                    slugStatus.available === false ? "border-red-500" : ""
                  }
                >
                  <InputGroupAddon>
                    <InputGroupText>miuma.com.br/</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="seu-slug-unico"
                    value={field.value}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    onBlur={(e) => {
                      field.onBlur();
                      handleSlugValidation(e.target.value);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    {slugStatus.checking && (
                      <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                    )}
                    {!slugStatus.checking && slugStatus.available === true && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        {slugStatus.message}
                      </span>
                    )}
                    {!slugStatus.checking && slugStatus.available === false && (
                      <span className="flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        {slugStatus.message}
                      </span>
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
              <span className="text-muted-foreground text-xs leading-0.5">
                <Info className="mr-1 inline-block h-3 w-3" />
                Use apenas letras minúsculas, números, hífens e underscores.
              </span>
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
                  className="h-24 resize-none"
                  maxLength={160}
                  {...field}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormMessage />
                <p className="text-muted-foreground text-xs">
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
