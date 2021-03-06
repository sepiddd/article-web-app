import { useCallback, useEffect, useState } from "react";
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

  const reset = useCallback(() => {
    setBase64("");
    setImagePreview("");
  }, [setBase64]);

  useEffect(() => {
    if (resetForm) {
      reset();
    }
  }, [reset, resetForm]);

  useEffect(() => {
    if (mode === "edit") setBase64(imagePreview);
  }, [imagePreview, mode, setBase64]);

  return mode === "read" && !base64 ? (
    <></>
  ) : (
    <Space
      style={{ width: "100%", justifyContent: "space-between" }}
      data-testid='upload-image-wrap'>
      {!imagePreview ? (
        <span data-testid='no-image'>No images ulpoaded yet!</span>
      ) : (
        <Image
          loading='lazy'
          data-testid='uploaded-image'
          width={200}
          src={imagePreview}
        />
      )}

      {mode !== "read" && (
        <div data-testid='upload-actions'>
          {imagePreview && (
            <Button
              data-testid='remove-img'
              style={{ marginRight: 10 }}
              onClick={reset}
              shape='round'
              danger
              type='primary'>
              Remove Image
            </Button>
          )}

          <Button
            data-testid='upload-img'
            onChange={() => {}}
            shape='round'
            style={{ alignSelf: "flex-end" }}>
            {imagePreview ? "Change Image" : "Uplaod Image"}
            <input
              data-testid='upload-img-input'
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
