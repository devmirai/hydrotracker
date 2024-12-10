import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ConfiguracionUsuario from './pages/ConfiguracionUsuario';
import PanelPrincipal from './pages/PanelPrincipal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/configuracion" element={<ConfiguracionUsuario />} />
        <Route path="/panel" element={<PanelPrincipal />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;