import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar flex gap-2 p-2 border-b">
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className="toolbar-item px-3 py-1 rounded hover:bg-gray-100"
      >
        Bold
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className="toolbar-item px-3 py-1 rounded hover:bg-gray-100"
      >
        Italic
      </button>
    </div>
  );
}
