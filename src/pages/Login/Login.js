import React, { useContext } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Login/Login.css';
import useLogin from '../../hooks/Login.hooks';
import { UserContext } from '../../providers/users/UserContext';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const { loading, error, handleLogin } = useLogin(loginUser);

  const onFinish = async (values) => {
    const success = await handleLogin(values.email, values.password);
    if (success) {
      message.success('Inicio de sesión exitoso');
      navigate('/dashboard'); // Redirige al dashboard después del login
    } else {
      message.error(error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-page">
      <div className="background-video">
        <video autoPlay muted loop>
          <source src="/backgroundLogin.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="background-overlay"></div>
      <div className="login-form-container">
        <div className="login-content">
          <img src="/techsolutions.png" alt="logo" className="login-logo" />
          <div>
            <Title level={2} className="login-title">
              ¡Hola, Bienvenido !
            </Title>
            <Text className="login-text">
              Ingresa tu correo electrónico abajo para iniciar sesión en tu cuenta
            </Text>
          </div>

          <Form form={form} className="login-form" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: '¡Por favor ingresa tu correo electrónico!' }]}
            >
              <Input
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Correo electrónico"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Contraseña"
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
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;