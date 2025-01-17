import React, { useContext } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import '../../assets/styles/Login/Login.css';
import useLogin from '../../hooks/Login.hooks';
import { UserContext } from '../../providers/users/UserContext';
import withUserProvider from '../../providers/users/WithUserProvider';

const { Title, Text, Link } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const { loginUser } = useContext(UserContext);
  const { loading, error, handleLogin } = useLogin(loginUser);

  const onFinish = async (values) => {
    await handleLogin(values.email, values.password);
    if (error) {
      message.error(error);
    } else {
      message.success('Login successful');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <div>Login</div>
        </div>

        <div className="login-content">
          <div>
            <Title level={2} className="login-title">
              Login to your account
            </Title>
            <Text className="login-text">
              Enter your email below to login to your account
            </Text>
          </div>

          <Form form={form} className="login-form" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                icon={<ArrowRightOutlined />}
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <Text className="login-footer-text">Don't have an account? </Text>
            <Link href="#" className="login-footer-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="login-background">
        <div className="login-background-inner">
          <div className="login-background-blur" />
          <div className="login-background-content">
            <div className="login-background-icon">
              <MailOutlined />
            </div>
          </div>
        </div>

        <div className="login-background-blur-top-right" />
        <div className="login-background-blur-bottom-left" />
      </div>
    </div>
  );
};

export default withUserProvider(Login);