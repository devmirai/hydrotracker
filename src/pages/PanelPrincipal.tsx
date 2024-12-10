import { useState, useEffect } from 'react';
import axios from 'axios';
import PanelPrincipalForm from '../components/PanelPrincipalForm';
import { Button, Spin, Card } from 'antd';
import { SettingOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IoWater } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

interface WeatherResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

function PanelPrincipal() {
  const navigate = useNavigate();
  const username = localStorage.getItem('currentUser');
  const [metaDiaria] = useState(() => {
    return Number(localStorage.getItem(`metaDiaria_${username}`)) || 2000;
  });
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '02178dfd4ecf4484857195531241012'; // Replace with your actual API key

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (err: GeolocationPositionError) => {
          setError(`Error getting location: ${err.message}`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get<WeatherResponse>(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
      );
      setWeather(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error fetching weather data: ${err.message}`);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfigClick = () => {
    navigate('/configuracion');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ 
      padding: '24px',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '24px',
        padding: '0 16px'
      }}>
        <h1 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <IoWater style={{ fontSize: '32px', color: '#108ee9' }} />
          Control de Agua Diaria
        </h1>
        
        <Card style={{ marginBottom: '20px' }}>
          {loading && <Spin />}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {weather && (
            <div>
              <h3><EnvironmentOutlined /> {weather.location.name}</h3>
              <p>Temperatura: {weather.current.temp_c}°C</p>
              <p>Condición: {weather.current.condition.text}</p>
              <img src={weather.current.condition.icon} alt="Weather icon" />
            </div>
          )}
        </Card>

        <Button 
          type="primary"
          onClick={handleConfigClick}
          size="large"
          icon={<SettingOutlined />}
          style={{ 
            minWidth: '200px',
            height: '45px',
            marginBottom: '10px'  // Add spacing between buttons
          }}
        >
          Cambiar Meta Diaria
        </Button>
        <Button 
          type="default"
          danger
          onClick={handleLogout}
          size="large"
          icon={<IoLogOut />}
          style={{ 
            minWidth: '200px',
            height: '45px'
          }}
        >
          Cerrar Sesión
        </Button>
      </div>
      <PanelPrincipalForm metaDiaria={metaDiaria} />
    </div>
  );
}

export default PanelPrincipal;