import { useEffect, useState } from "react";
import { Button, Image, Space } from "antd";
import { IArticleMode } from "../../types";

interface Props {
  setBase64: (data: any) => void;
  resetForm?: boolean;
  base64?: string;
  mode: IArticleMode;
}

const ImageUpload: React.FC<Props> = ({
  setBase64,
  resetForm,
  base64,
  mode,
}: Props) => {
  const [file, setFile] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<any>("");
  const [name, setName] = useState<string>();
  const [size, setSize] = useState<string>();

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(binaryString);
  };

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    if (reader !== undefined && file !== undefined) {
      reader.onload = _handleReaderLoaded;
      reader.onloadend = () => {
        setFile(file);
        setSize(file.size);
        setName(file.name);
        setImagePreview(reader.result);
      };
    }
  };

  useEffect(() => {
    if (base64) {
      setImagePreview(base64);
    }
  }, [base64]);

  const reset = () => {
    setFile("");
    setImagePreview("");
    setBase64("");
    setName("");
    setSize("");
  };

  useEffect(() => {
    if (resetForm) {
      reset();
    }
  }, [resetForm]);

  return (
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      {!imagePreview ? (
        <span>No images ulpoaded yet!</span>
      ) : (
        <Image width={200} src={imagePreview} />
      )}

      {mode !== "read" && (
        <Button
          onChange={() => {}}
          shape='round'
          style={{ alignSelf: "flex-end" }}>
          {base64 ? "Change Image" : "Uplaod Image"}
          <input
            type='file'
            id='file'
            accept='.jpeg, .png, .jpg'
            onChange={photoUpload}
            src={imagePreview}
            style={{
              opacity: 0,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </Button>
      )}
    </Space>
  );
};

export default ImageUpload;
