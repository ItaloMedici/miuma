"use client";

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
import { Facebook, Instagram, Phone, Youtube } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { StoryAndSocialFormData } from "../schemas";
import { MarkdownEditor } from "./MarkdownEditor";

export function StoryAndSocial() {
  const form = useFormContext<StoryAndSocialFormData>();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Sua História
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Conte aos apoiadores sobre sua missão. Markdown é suportado.
        </p>
      </div>

      <div className="space-y-6">
        {/* Story */}
        <FormField
          control={form.control}
          name="story"
          render={({ field }) => (
            <FormItem>
              <FormLabel>História Completa</FormLabel>
              <FormControl>
                <MarkdownEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Conte sua história de cuidado com animais..."
                  maxLength={5000}
                  minHeight="200px"
                />
              </FormControl>
              <div className="flex justify-between items-center mt-2">
                <FormMessage />
                <p className="text-xs text-muted-foreground">
                  {(() => {
                    try {
                      const parsed = JSON.parse(field.value || "{}");
                      return parsed.characterCount || 0;
                    } catch {
                      return field.value?.length || 0;
                    }
                  })()}
                  /5000
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Social Media */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Redes Sociais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <Instagram className="w-4 h-4" />
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
                          <Facebook className="w-4 h-4" />
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
                          <Youtube className="w-4 h-4" />
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
                          <Phone className="w-4 h-4" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="+5531987654321"
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
      </div>
    </div>
  );
}
