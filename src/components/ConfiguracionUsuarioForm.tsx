import { Form, InputNumber, Button } from 'antd';
import { IoWater, IoSave } from "react-icons/io5";

interface ConfiguracionUsuarioFormValues {
  metaDiaria: number;
}

interface ConfiguracionUsuarioFormProps {
  onSubmit: (values: ConfiguracionUsuarioFormValues) => void;
  initialValues?: ConfiguracionUsuarioFormValues;
  loading?: boolean;
}

function ConfiguracionUsuarioForm({ 
  onSubmit, 
  initialValues = { metaDiaria: 2000 },
  loading = false 
}: ConfiguracionUsuarioFormProps) {
  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
      style={{ 
        width: '100%',
        maxWidth: '400px', 
        margin: '0 auto',
        padding: '0 16px'
      }}
    >
      <Form.Item
        label={<span style={{ color: '#1a1a1a' }}>Meta Diaria de Agua (ml)</span>}
        name="metaDiaria"
        rules={[
          { required: true, message: 'Por favor ingrese su meta diaria de agua' },
          { type: 'number', min: 1, message: 'La meta debe ser mayor a 0' }
        ]}
      >
        <InputNumber
          min={1}
          style={{ width: '100%' }}
          placeholder="Ingrese su meta en mililitros"
          addonAfter="ml"
          size="large"
          prefix={<IoWater style={{ color: '#108ee9' }} />}
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          block
          loading={loading}
          size="large"
          icon={<IoSave />}
          style={{ height: '48px' }}
        >
          Guardar Configuración
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ConfiguracionUsuarioForm;