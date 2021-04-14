import { Input, Button, Form } from "antd";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const { loading, login } = useAuth();
  const history = useHistory();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    if (loading) {
      return;
    }

    try {
      login(values.email, values.password);
      history.push("/list");
    } catch {
      // show error message
    }
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
