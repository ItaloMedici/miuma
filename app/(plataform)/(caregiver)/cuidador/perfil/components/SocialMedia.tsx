"use client";

import { Icons } from "@/components/icons";
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
import { Globe, Phone } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { SocialMediaFormData } from "../schemas";

export function SocialMedia() {
  const form = useFormContext<SocialMediaFormData>();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Suas redes sociais
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Compartilhe suas redes sociais para que os tutores possam conhecer
          mais sobre você.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Instagram */}
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Instagram{" "}
                <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Icons.Instagram className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="seu.usuario" {...field} />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Facebook */}
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Facebook{" "}
                <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Icons.Facebook className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="seu.usuario" {...field} />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* YouTube */}
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                YouTube{" "}
                <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Icons.Youtube className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="@seucanal" {...field} />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* WhatsApp */}
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                WhatsApp{" "}
                <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Phone className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="+5531987654321" {...field} />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tiktok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                TikTok <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Icons.Tiktok className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="@seutiktok" {...field} />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Website{" "}
                <span className="text-muted-foreground">(Opcional)</span>
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Globe className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="https://seusite.com"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
