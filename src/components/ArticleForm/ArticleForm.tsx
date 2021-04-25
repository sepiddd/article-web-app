import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useArticle, useAuth } from "../../hooks";
import { DraftEditor, ImageUpload } from "..";
import { PATH_APP } from "../../routes/paths";
import { useHistory } from "react-router-dom";
import { IArticleMode } from "../../types";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(150),
  content: yup.string().required(),
  image: yup.string(),
});

interface Props {
  mode: IArticleMode;
}

const ArticleForm = ({ mode }: Props) => {
  const { addArticle, articleItem, updateArticle } = useArticle();
  const { user } = useAuth();
  const history = useHistory();
  const [src, setSrc] = useState<any>();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (articleItem) {
      setValue("title", articleItem.title || "");
      setValue("content", articleItem.content || "");
      setValue("image", articleItem.image || "");
      setSrc(articleItem.image);
    }
  }, [articleItem, setValue]);

  const onSubmit = async (data: {
    content: any;
    title: string;
    image: string;
  }) => {
    try {
      mode === "add"
        ? await addArticle({
            title: data.title,
            content: data.content,
            date: new Date().toDateString(),
            image: data.image,
            userId: user.id,
          })
        : await updateArticle({
            title: data.title,
            content: data.content,
            date: articleItem.date,
            image: data.image,
            userId: user.id,
            id: articleItem.id,
          });
      reset();
      history.push(PATH_APP.articles);
    } catch (error) {}
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} name='article'>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <Form.Item>
            <Input
              name={field.name}
              value={field.value}
              type='text'
              placeholder='Article title...'
              onChange={field.onChange}
            />
            <ErrorMessage
              errors={errors}
              name='title'
              as={"p"}
              className='error-message'
            />
          </Form.Item>
        )}
      />
      <Controller
        name='content'
        control={control}
        render={({ field }) => (
          <Form.Item>
            <DraftEditor
              text={field.value}
              setContent={field?.onChange}
              resetForm={isSubmitSuccessful}
              mode={mode}
            />
            <ErrorMessage
              errors={errors}
              name='content'
              as={"p"}
              className='error-message'
            />
          </Form.Item>
        )}
      />

      <Controller
        name='image'
        control={control}
        render={({ field }) => (
          <Form.Item>
            <ImageUpload
              setBase64={field.onChange}
              resetForm={isSubmitSuccessful}
              base64={src}
              mode={mode}
            />
            <ErrorMessage
              errors={errors}
              name='image'
              as={"p"}
              className='error-message'
            />
          </Form.Item>
        )}
      />
      {mode !== "read" && (
        <Form.Item>
          <Button
            data-testid='submit-btn'
            htmlType='submit'
            type='primary'
            shape='round'>
            {mode === "add" ? "Add article" : "Apply changes"}
          </Button>

          <Button
            data-testid='cancel-btn'
            type='link'
            onClick={history?.goBack}
            style={{ marginLeft: 16 }}>
            cancel
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default ArticleForm;
