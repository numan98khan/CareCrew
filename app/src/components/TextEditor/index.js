// RichTextEditor.jsx
import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichTextEditor.css";

function RichTextEditor({ editorState, onEditorStateChange }) {
  return (
    <Editor
      wrapperClassName="h-full bg-PRIMARY_NEUTRAL_COLOR rounded"
      editorClassName="editorClassName px-4"
      toolbarClassName="toolbar-class"
      editorState={editorState}
      onBlur={() => {
        window.getSelection().removeAllRanges();
      }}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "image",
          "emoji",
          "history",
        ],
        inline: { options: ["bold", "italic", "underline"] },
        list: { options: ["unordered", "ordered"] },
        textAlign: { options: ["left", "center", "right"] },
      }}
    />
  );
}

export default RichTextEditor;
