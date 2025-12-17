import { SerializedEditorState } from "lexical";

/**
 * Estrutura completa do editor com metadados
 */
export interface EditorData {
  editorState: SerializedEditorState;
  plainText: string;
  characterCount: number;
}

/**
 * Helper para criar um estado vazio do editor
 */
export function createEmptyEditorState(): SerializedEditorState {
  return {
    root: {
      children: [
        {
          children: [],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as unknown as SerializedEditorState;
}

/**
 * Helper para criar um heading (título)
 */
export function createHeading(
  text: string,
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h2"
) {
  return {
    children: [
      {
        detail: 0,
        format: 1,
        mode: "normal",
        style: "",
        text,
        type: "text",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "heading",
    version: 1,
    textFormat: 1,
    textStyle: "",
    tag,
  };
}

/**
 * Helper para criar um parágrafo vazio
 */
export function createEmptyParagraph() {
  return {
    children: [],
    direction: null,
    format: "",
    indent: 0,
    type: "paragraph",
    version: 1,
    textFormat: 0,
    textStyle: "",
  };
}

/**
 * Helper para criar um parágrafo com texto
 */
export function createParagraph(text: string) {
  return {
    children: [
      {
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        type: "text",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "paragraph",
    version: 1,
    textFormat: 0,
    textStyle: "",
  };
}

/**
 * Helper para criar um EditorData completo a partir de nós
 */
export function createEditorData(
  children: unknown[],
  plainText: string
): EditorData {
  const editorState: SerializedEditorState = {
    root: {
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as unknown as SerializedEditorState;

  return {
    editorState,
    plainText,
    characterCount: plainText.length,
  };
}

/**
 * Helper para serializar EditorData para string JSON
 */
export function serializeEditorData(data: EditorData): string {
  return JSON.stringify(data);
}

/**
 * Helper para parsear string JSON em EditorData
 */
export function parseEditorData(value: string): EditorData | null {
  if (!value || typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);

    if (parsed.editorState && parsed.plainText !== undefined) {
      return parsed as EditorData;
    }

    // Formato antigo - apenas editorState
    if (parsed.root && Array.isArray(parsed.root.children)) {
      return {
        editorState: parsed as SerializedEditorState,
        plainText: "",
        characterCount: 0,
      };
    }

    return null;
  } catch {
    return null;
  }
}
