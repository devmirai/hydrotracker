import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { IoMail, IoLockClosed, IoLogIn } from "react-icons/io5";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // Simple validation - in real app this would be an API call
      if (values.username === values.password) {
        localStorage.setItem('currentUser', values.username);
        // Initialize metaDiaria for new users
        const userMetaKey = `metaDiaria_${values.username}`;
        if (!localStorage.getItem(userMetaKey)) {
          localStorage.setItem(userMetaKey, '2000');
        }
        navigate('/panel');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ 
      maxWidth: 400, 
      margin: '20px auto',
      padding: '20px',
      width: '90%'
    }}>
      <h1 className="title">Iniciar Sesión</h1>
      <Form 
        onFinish={onFinish} 
        layout="vertical"
        size="large"
      >
        <Form.Item
          label={<span style={{ color: '#1a1a1a' }}>Usuario</span>}
          name="username"
          rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
        >
          <Input prefix={<IoMail style={{ color: '#108ee9' }} />} />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: '#1a1a1a' }}>Contraseña</span>}
          name="password"
          rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
        >
          <Input.Password prefix={<IoLockClosed style={{ color: '#108ee9' }} />} />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block
            icon={<IoLogIn />}
            style={{ height: '48px' }}
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;