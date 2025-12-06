import { createHeadlessEditor } from "@lexical/headless";
import { ListItemNode, ListNode } from "@lexical/list";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { SerializedEditorState } from "lexical";

export function lexicalToMarkdown(
  serializedState: string | SerializedEditorState
): string {
  try {
    let state: SerializedEditorState;

    if (typeof serializedState === "string") {
      const parsed = JSON.parse(serializedState);

      if (parsed.editorState) {
        state = parsed.editorState;
      } else if (parsed.root) {
        state = parsed;
      } else {
        return serializedState;
      }
    } else {
      state = serializedState;
    }

    if (!state.root?.children) {
      return "";
    }

    const editor = createHeadlessEditor({
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
      onError: (error) => {
        console.error("Erro no editor headless:", error);
      },
    });

    const editorStateFromJSON = editor.parseEditorState(state);
    editor.setEditorState(editorStateFromJSON);

    let markdown = "";
    editor.getEditorState().read(() => {
      markdown = $convertToMarkdownString(TRANSFORMERS);
    });

    return markdown;
  } catch (error) {
    console.error("Erro ao converter Lexical para Markdown:", error);
    try {
      const parsed = JSON.parse(serializedState as string);
      return parsed.plainText || "";
    } catch {
      return typeof serializedState === "string" ? serializedState : "";
    }
  }
}

export function extractPlainText(serializedState: string): string {
  try {
    const parsed = JSON.parse(serializedState);

    if (parsed.plainText) {
      return parsed.plainText;
    }

    const markdown = lexicalToMarkdown(serializedState);
    return markdown
      .replace(/[*_~`#>\-]/g, "")
      .replace(/\n+/g, " ")
      .trim();
  } catch {
    return "";
  }
}
