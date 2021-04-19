import {
  Editor,
  EditorState,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import { IArticleMode } from "../../types";

import "./styles.scss";

const compositeDecorator = (isPreview: boolean) => new CompositeDecorator([]);

interface Props {
  setContent?: (data: any) => void;
  mode: IArticleMode;
  text?: any;
  resetForm?: boolean;
}

const DraftEditor: React.FC<Props> = ({
  setContent,
  mode,
  text,
  resetForm,
}: Props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isTextSet, setIsTextSet] = useState(mode === "create");

  useEffect(() => {
    const newState = !!text && convertFromRaw(JSON.parse(text));
    if (!isTextSet && newState && newState?.hasText?.()) {
      editorOnChange(
        EditorState.createWithContent(
          newState,
          compositeDecorator(mode === "read")
        )
      );
      setIsTextSet(true);
    }
  }, [isTextSet, mode, text]);

  useEffect(() => {
    if (resetForm) setEditorState(EditorState.createEmpty());
  }, [resetForm]);

  const editorOnChange = (currentEditorState: EditorState) => {
    setEditorState(currentEditorState);

    setContent?.(
      // convertToRaw(editorState.getCurrentContent()).blocks
      currentEditorState.getCurrentContent().hasText() || mode === "edit"
        ? JSON.stringify(convertToRaw(currentEditorState.getCurrentContent()))
        : undefined
    );
  };

  //   const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  //   const value = blocks
  //     .map((block) => (!block.text.trim() && "\n") || block.text)
  //     .join("\n");

  return (
    <Editor
      editorState={editorState}
      onChange={editorOnChange}
      placeholder='Content...'
    />
  );
};

export default DraftEditor;
