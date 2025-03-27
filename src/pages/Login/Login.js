import React, { useContext } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Login/Login.css';
import useLogin from '../../hooks/Login.hooks';
import { UserContext } from '../../providers/users/UserContext';

const { Title, Text, Link } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const { loading, error, handleLogin } = useLogin(loginUser);

  const onFinish = async (values) => {
    const success = await handleLogin(values.email, values.password);
    if (success) {
      message.success('Login successful');
      navigate('/dashboard'); // Redirige al dashboard después del login
    } else {
      message.error(error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="background-image"></div>
      <div className="background-overlay"></div>
      <div className="login-form-container">
        <div className="login-content">
          <img src="/techsolutions.png" alt="logo" className="login-logo" />
          <div>
            <Title level={2} className="login-title">
              !Hello, Welcome back¡
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
            <Link href="/register" className="login-footer-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;