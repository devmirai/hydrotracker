import { useNavigate } from 'react-router-dom';
import ConfiguracionUsuarioForm from '../components/ConfiguracionUsuarioForm';

function ConfiguracionUsuario() {
  const navigate = useNavigate();
  const username = localStorage.getItem('currentUser');

  const handleSubmit = (values: { metaDiaria: number }) => {
    localStorage.setItem(`metaDiaria_${username}`, values.metaDiaria.toString());
    navigate('/panel');
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', padding: '0 20px' }}>

      <h1>Configuración de Usuario</h1>
      <ConfiguracionUsuarioForm 
        onSubmit={handleSubmit}
        initialValues={{ 
          metaDiaria: Number(localStorage.getItem(`metaDiaria_${username}`)) || 2000 
        }}
      />
    </div>
  );
}

export default ConfiguracionUsuario;