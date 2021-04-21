import {
  Editor,
  EditorState,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import "./styles.scss";
import { IArticleMode } from "../../types";

const compositeDecorator = (isPreview: boolean) => new CompositeDecorator([]);

interface Props {
  setContent?: (data: any) => void;
  text?: any;
  resetForm?: boolean;
  mode: IArticleMode;
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
  const [isTextSet, setIsTextSet] = useState(mode === "add");

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
      currentEditorState.getCurrentContent().hasText() || mode === "edit"
        ? JSON.stringify(convertToRaw(currentEditorState.getCurrentContent()))
        : undefined
    );
  };

  return (
    <Editor
      editorState={editorState}
      onChange={editorOnChange}
      placeholder='Content...'
    />
  );
};

export default DraftEditor;
