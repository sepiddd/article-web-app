import { Input, Button, Form, notification, Space } from "antd";
import { useHistory } from "react-router";
import { useArticle, useAuth } from "../../hooks";
import { Link } from "react-router-dom";
import { PATH_APP, PATH_AUTH } from "../../routes/paths";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 24, span: 24 },
};

const Login = () => {
  const { loading, login, isAuthenticated, user } = useAuth();
  const { getArticlesList } = useArticle();
  const history = useHistory();

  if (isAuthenticated) {
    history.push(PATH_APP.articles);
  }

  const handleSubmit = (values: { email: string; password: string }) => {
    if (loading) {
      return;
    }

    try {
      login(values.email, values.password);
      getArticlesList();
      history.push("/list");
    } catch {
      notification["error"]({
        message: "An error occured",
      });
    }
  };

  return (
    <>
      <Form
        {...layout}
        name='login'
        initialValues={{ remember: true }}
        onFinish={handleSubmit}>
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

        <Form.Item>
          <Button type='primary' htmlType='submit' shape='round'>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Space align='center' style={{ justifyContent: "center", width: "100%" }}>
        <p>
          Dont Have an acoount? <Link to={PATH_AUTH.register}>register</Link>
        </p>
      </Space>
    </>
  );
};

export default Login;
