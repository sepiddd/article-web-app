import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message";
import { useArticle } from "../../hooks";
import { DraftEditor } from "..";
import { IArticleMode } from "../../types";

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(150),
  content: yup.string().required(),
});

interface Props {
  mode: IArticleMode;
}

const ArticleForm: React.FC<Props> = ({ mode }: Props) => {
  const { addArticle } = useArticle();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { content: any; title: string }) => {
    try {
      await addArticle({
        title: data.title,
        content: data.content,
        date: new Date().toString(),
      });
      reset();
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
              mode={mode}
              setContent={field.onChange}
              resetForm={isSubmitSuccessful}
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

      <Button htmlType='submit' type='primary'>
        Add article
      </Button>
    </Form>
  );
};

export default ArticleForm;
