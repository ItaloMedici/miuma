"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { STORY_MAX_LENGTH, StoryFormData } from "../schemas";
import { MarkdownEditor } from "./MarkdownEditor";

export function Story() {
  const form = useFormContext<StoryFormData>();

  const getCounter = (value: string | undefined) => {
    try {
      const parsed = JSON.parse(value || "{}");
      return parsed.characterCount || 0;
    } catch {
      return value?.length || 0;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
          Sua História
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Conte aos apoiadores sobre sua missão e porque você cuida de animais.
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
                  maxLength={STORY_MAX_LENGTH}
                  minHeight="200px"
                />
              </FormControl>
              <div className="mt-2 flex items-center justify-between">
                <FormMessage />
                <p className="text-muted-foreground text-xs">
                  {getCounter(field.value)}/{STORY_MAX_LENGTH}
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
