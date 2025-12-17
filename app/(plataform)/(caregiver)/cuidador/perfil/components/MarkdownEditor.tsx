"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { createEmptyEditorState, parseEditorData } from "@/lib/utils/editor";
import { SerializedEditorState } from "lexical";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: string;
}

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

function parseEditorValue(val: string): SerializedEditorState {
  const data = parseEditorData(val);

  if (data) {
    return data.editorState;
  }

  return createEmptyEditorState();
}

export function MarkdownEditor({
  value,
  onChange,
  minHeight = "300px",
}: MarkdownEditorProps) {
  // Deriva o estado diretamente da prop value, sem usar useState
  const editorState = parseEditorValue(value);

  const handleChange = (state: SerializedEditorState) => {
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
        key={value} // Force re-render when value changes externally
        editorSerializedState={editorState}
        onSerializedChange={handleChange}
      />
    </div>
  );
}

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
