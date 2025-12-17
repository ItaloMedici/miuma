"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createEditorData,
  createEmptyParagraph,
  createHeading,
  createParagraph,
  serializeEditorData,
} from "@/lib/utils/editor";
import { User } from "better-auth";
import { useFormContext } from "react-hook-form";
import { useOnboarding } from "../context";
import { STORY_MAX_LENGTH, StoryFormData } from "../schemas";
import { MarkdownEditor } from "./MarkdownEditor";

export function Story() {
  const { user } = useOnboarding();
  const form = useFormContext<StoryFormData>();

  const getCounter = (value: string | undefined) => {
    try {
      const parsed = JSON.parse(value || "{}");
      return parsed.characterCount || 0;
    } catch {
      return value?.length || 0;
    }
  };

  const onFillPlaceholderStory = () => {
    form.setValue("story", generateStoryPlaceholder(user), {
      shouldValidate: true,
      shouldDirty: true,
    });
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
              {form.formState.errors.story && (
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground float-end p-0 text-xs underline"
                  onClick={onFillPlaceholderStory}
                >
                  Gerar texto inicial com IA
                </Button>
              )}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

const generateStoryPlaceholder = (user: User) => {
  const headline = `Olá, me chamo ${user.name} e cuido de animais! 👋`;

  const caregiverIntroduction =
    "Dedico meu tempo e cuidado aos animais que vivem sob minha responsabilidade. Cada um deles tem necessidades únicas, e trabalho diariamente para garantir que recebam alimentação adequada, cuidados veterinários e, acima de tudo, carinho e atenção.";
  const caregiverJourneyDescription =
    "Manter os animais bem cuidados exige dedicação constante. Estou aqui na plataforma Miuma para compartilhar essa jornada e receber o apoio necessário para continuar oferecendo o melhor cuidado possível aos meus companheiros. ❤️";

  const plainText = `${headline}\n\n${caregiverIntroduction}\n\n${caregiverJourneyDescription}`;

  const editorData = createEditorData(
    [
      createHeading(headline, "h2"),
      createEmptyParagraph(),
      createParagraph(caregiverIntroduction),
      createEmptyParagraph(),
      createParagraph(caregiverJourneyDescription),
    ],
    plainText
  );

  return serializeEditorData(editorData);
};
