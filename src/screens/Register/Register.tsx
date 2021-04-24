import { Input, Button, Form, notification, Space } from "antd";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks";
import { User } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { PATH_APP, PATH_AUTH } from "../../routes/paths";
import { Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = () => {
  const { loading, register } = useAuth();
  const history = useHistory();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: User) => {
    if (loading) {
      return;
    }
    try {
      register(data);

      history.push(PATH_APP.articles);
    } catch {
      notification["error"]({
        message: "An error occured",
      });
    }
  };

  return (
    <>
      <Form {...layout} name='register' onFinish={handleSubmit(onSubmit)}>
        <Controller
          render={({ field }) => {
            return (
              <Form.Item
                name={field.name}
                label='First Name'
                rules={[
                  { required: true, message: "Please input your firstname!" },
                  { min: 3, message: "min length!" },
                  { max: 50, message: "max length!" },
                ]}>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </Form.Item>
            );
          }}
          name='firstName'
          control={control}
        />

        <Controller
          render={({ field }) => (
            <Form.Item
              name={field.name}
              label='Last Name'
              rules={[
                { required: true, message: "Please input your lastname!" },
                { min: 3, message: "min length!" },
                { max: 50, message: "max length!" },
              ]}>
              <Input
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            </Form.Item>
          )}
          name='lastName'
          control={control}
        />

        <Controller
          render={({ field }) => {
            return (
              <Form.Item
                name={field.name}
                label='Email Address'
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "your email address is not  valid",
                  },
                ]}>
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </Form.Item>
            );
          }}
          name='email'
          control={control}
        />

        <Controller
          render={({ field }) => (
            <Form.Item
              name={field.name}
              label='Password'
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Please input your password!" },
              ]}>
              <Input.Password
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            </Form.Item>
          )}
          name='password'
          control={control}
        />

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' shape='round'>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Space align='center' style={{ justifyContent: "center", width: "100%" }}>
        <p>
          Already Have an acoount? <Link to={PATH_AUTH.login}>Login</Link>
        </p>
      </Space>
    </>
  );
};

export default Register;
