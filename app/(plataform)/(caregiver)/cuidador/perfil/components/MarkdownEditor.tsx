"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { SerializedEditorState } from "lexical";
import { useState } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: string;
}

// Initial empty state
const emptyEditorState = {
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

// Function to extract plain text from editor state
function extractTextFromEditorState(state: SerializedEditorState): string {
  let text = "";

  function traverseNode(node: Record<string, unknown>): void {
    if (typeof node.text === "string") {
      text += node.text;
    }
    if (Array.isArray(node.children)) {
      node.children.forEach((child) =>
        traverseNode(child as Record<string, unknown>)
      );
    }
  }

  if (state.root?.children && Array.isArray(state.root.children)) {
    state.root.children.forEach((node) =>
      traverseNode(node as Record<string, unknown>)
    );
  }

  return text;
}

export function MarkdownEditor({
  value,
  onChange,
  minHeight = "300px",
}: MarkdownEditorProps) {
  // Initialize editor state from value
  const [editorState, setEditorState] = useState<SerializedEditorState>(() => {
    if (!value || typeof value !== "string" || !value.trim()) {
      return emptyEditorState;
    }

    try {
      // If value is JSON, parse it
      const parsed = JSON.parse(value);

      // If it has editorState property, use that
      if (parsed.editorState) {
        return parsed.editorState as SerializedEditorState;
      }

      // If it's already a valid editor state structure, use it
      if (parsed.root && Array.isArray(parsed.root.children)) {
        return parsed as SerializedEditorState;
      }

      // Otherwise treat as empty
      return emptyEditorState;
    } catch {
      // If value is plain text, create a simple editor state
      return {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: value,
                  type: "text",
                  version: 1,
                },
              ],
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
  });

  const handleChange = (state: SerializedEditorState) => {
    setEditorState(state);
    // Convert editor state to JSON string and pass plain text count
    const plainText = extractTextFromEditorState(state);
    const jsonWithMetadata = JSON.stringify({
      editorState: state,
      plainText,
      characterCount: plainText.length,
    });
    onChange(jsonWithMetadata);
  };

  return (
    <div style={{ minHeight }}>
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={handleChange}
      />
    </div>
  );
}

// Helper function to get character count from stored value
export function getCharacterCount(value: string): number {
  if (!value) return 0;

  try {
    const parsed = JSON.parse(value);
    if (parsed.characterCount !== undefined) {
      return parsed.characterCount;
    }
    if (parsed.editorState) {
      return extractTextFromEditorState(parsed.editorState).length;
    }
  } catch {
    return value.length;
  }

  return 0;
}
