import { useEffect, useState } from "react";
import { Button, Image, message, Space } from "antd";
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
  const [imagePreview, setImagePreview] = useState<any>("");

  const _handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(binaryString);
  };

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file.size > 4194304) {
      message.error("the image size is larger than 4MB.");
      return false;
    }
    reader.readAsDataURL(file);
    if (reader !== undefined && file !== undefined) {
      reader.onload = _handleReaderLoaded;
      reader.onloadend = () => {
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
    setBase64("");
    setImagePreview("");
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
        <div>
          {imagePreview && (
            <Button
              style={{ marginRight: 10 }}
              onClick={reset}
              shape='round'
              danger
              type='primary'>
              Remove Image
            </Button>
          )}

          <Button
            onChange={() => {}}
            shape='round'
            style={{ alignSelf: "flex-end" }}>
            {imagePreview ? "Change Image" : "Uplaod Image"}
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
        </div>
      )}
    </Space>
  );
};

export default ImageUpload;
