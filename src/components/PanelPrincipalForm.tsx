import { Button, Progress, Typography, Space, Card } from 'antd';
import { useState, useEffect } from 'react';
import { IoWater, IoAdd, IoSettings } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";

const { Title, Text } = Typography;

interface PanelPrincipalFormProps {
  metaDiaria: number;
}

function PanelPrincipalForm({ metaDiaria = 2000 }: PanelPrincipalFormProps) {
  const [consumido, setConsumido] = useState(() => {
    const username = localStorage.getItem('currentUser');
    return Number(localStorage.getItem(`aguaConsumida_${username}`)) || 0;
  });

  useEffect(() => {
    const username = localStorage.getItem('currentUser');
    localStorage.setItem(`aguaConsumida_${username}`, consumido.toString());
  }, [consumido]);

  const agregarAgua = (cantidad: number) => {
    setConsumido(prev => prev + cantidad);
  };

  const porcentaje = Math.min((consumido / metaDiaria) * 100, 100);
  const metaAlcanzada = consumido >= metaDiaria;

  return (
    <Card 
      style={{ 
        maxWidth: 600, 
        margin: '0 auto',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        width: '100%'
      }}
      bodyStyle={{ 
        padding: '24px',
      }}
    >
      <Space 
        direction="vertical" 
        size={window.innerWidth <= 480 ? 'middle' : 'large'} 
        style={{ width: '100%' }}
      >
        <div>
          <Title level={4} style={{ marginBottom: '24px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <IoWater style={{ fontSize: '24px', color: '#108ee9' }} />
            Progreso Diario
          </Title>
          <Progress
            percent={porcentaje}
            status={metaAlcanzada ? 'success' : 'active'}
            format={() => `${consumido}ml / ${metaDiaria}ml`}
            strokeWidth={10}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          {metaAlcanzada && (
            <Text type="success" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
              <FaTrophy style={{ color: '#52c41a' }} />
              ¡Felicitaciones! Has alcanzado tu meta diaria
            </Text>
          )}
        </div>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={5} style={{ color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <IoAdd style={{ fontSize: '20px', color: '#108ee9' }} />
            Registrar consumo de agua
          </Title>
          <Space wrap style={{ width: '100%', justifyContent: 'center' }}>
            <Button 
              type="primary" 
              onClick={() => agregarAgua(250)}
              size="large"
              style={{ 
                minWidth: '120px',

              }}
              icon={<IoWater />}
            >
              250ml
            </Button>
            <Button 
              type="primary"
              onClick={() => agregarAgua(500)}
              size="large"
              style={{ minWidth: '120px' }}
              icon={<IoWater />}
            >
              500ml
            </Button>
          </Space>
        </Space>
      </Space>
    </Card>
  );
}

export default PanelPrincipalForm;