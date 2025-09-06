"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { EditorState, LexicalEditor as LexicalEditorType } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

type LexicalEditorProps = {
  value?: string;
  // -disable-next-line no-unused-vars
  onChange?: (value: string) => void;
};

// -disable-next-line no-unused-vars
function EditorContent({ onChange }: Readonly<LexicalEditorProps>) {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="editor-input min-h-[200px] px-4 py-2 focus:outline-none" />
        }
        placeholder={
          <div className="editor-placeholder">Enter job description...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin
        onChange={(editorState: EditorState) => {
          editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor);
            onChange?.(htmlString);
          });
        }}
      />
    </>
  );
}

// -disable-next-line import/no-unused-modules
export default function LexicalEditor({
  value,
  onChange,
}: Readonly<LexicalEditorProps>) {
  const initialConfig = {
    namespace: "JobDescription",
    theme: {
      paragraph: "mb-1",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError: (error: Error) => {
      console.error(error);
    },
    editorState: (editor: LexicalEditorType) => {
      // Get editor from parameter
      if (value) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, "text/html");
        return $generateNodesFromDOM(editor, dom); // Use the provided editor instance
      }
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container border rounded-md p-2">
        <EditorContent onChange={onChange} />{" "}
        {/* Use the EditorContent component */}
      </div>
    </LexicalComposer>
  );
}
