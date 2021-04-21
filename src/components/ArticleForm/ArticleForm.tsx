import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useArticle, useAuth } from "../../hooks";
import { DraftEditor, ImageUpload } from "..";
import { PATH_APP } from "../../routes/paths";
import { useHistory, useLocation } from "react-router-dom";
import { IArticleMode } from "../../types";

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(150),
  content: yup.string().required(),
  image: yup.string(),
});

interface Props {
  mode: IArticleMode;
}

const ArticleForm = ({ mode }: Props) => {
  const { addArticle } = useArticle();
  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    content: any;
    title: string;
    image: string;
  }) => {
    try {
      await addArticle({
        title: data.title,
        content: data.content,
        // date: new Date().toISOString().slice(0, 10),
        date: new Date().toISOString().slice(0, 10),
        image: data.image,
        userId: user.id,
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
        defaultValue=''
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
        defaultValue=''
        render={({ field }) => (
          <Form.Item>
            <DraftEditor
              text={field.value}
              setContent={field.onChange}
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
        defaultValue=''
        render={({ field }) => {
          return (
            <Form.Item>
              <ImageUpload
                setBase64={field.onChange}
                resetForm={isSubmitSuccessful}
              />
              <ErrorMessage
                errors={errors}
                name='image'
                as={"p"}
                className='error-message'
              />
            </Form.Item>
          );
        }}
      />
      <Form.Item></Form.Item>
      <Button htmlType='submit' type='primary' shape='round'>
        Add article
      </Button>
    </Form>
  );
};

export default ArticleForm;
