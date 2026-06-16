import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Wind, Droplets } from 'lucide-react';

const getWeatherDetails = (code, backendDesc) => {
  if (code === 0) return { icon: Sun, label: backendDesc || 'SERENO' };
  if ([1, 2, 3].includes(code)) return { icon: Cloud, label: backendDesc || 'NUVOLOSO' };
  if ([45, 48].includes(code)) return { icon: CloudFog, label: 'NEBBIA' };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { icon: CloudRain, label: 'PIOGGIA' };
  if ([71, 73, 75, 85, 86].includes(code)) return { icon: Snowflake, label: 'NEVE' };
  if ([95, 96, 99].includes(code)) return { icon: CloudLightning, label: 'TEMPORALE' };
  return { icon: Cloud, label: backendDesc || 'OPERATIVO' };
};

const CurrentWeather = ({ forecastData, cityName }) => {
  // Validazione: controlliamo che arrivi un array valido
  if (!Array.isArray(forecastData) || forecastData.length === 0) return null;

  // Il primo oggetto dell'array (indice 0) corrisponde a OGGI
  const todayData = forecastData[0];

  const { icon: WeatherIcon, label: weatherLabel } = getWeatherDetails(todayData.weatherCode, todayData.description);

  const todayStr = new Date(todayData.date).toLocaleDateString('it-IT', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className="current-weather-card">
      <div className="card-header">
        <div>
          <span className="badge-today">DATALINK // LIVE</span>
          <h2 className="city-title">{cityName}</h2>
          <p className="date-text">STARDATE: {todayStr}</p>
        </div>
        <div className="weather-status-wrapper">
          <WeatherIcon className="main-weather-icon" size={54} />
          <span className="status-label">SYSTEM: {weatherLabel.toUpperCase()}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="temp-section">
          <span className="main-temp">{Math.round(todayData.temperatureMax)}°C</span>
          <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            MIN: {Math.round(todayData.temperatureMin)}°C // MAX: {Math.round(todayData.temperatureMax)}°C
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <Droplets size={18} className="text-blue" />
            <div>
              <p className="stat-label">HUMIDITY.PROB</p>
              <p className="stat-value">{todayData.precipitationProbability}%</p>
            </div>
          </div>

          <div className="stat-item">
            <Wind size={18} className="text-teal" />
            <div>
              <p className="stat-label">WIND.VECTOR</p>
              <p className="stat-value">{Math.round(todayData.windSpeed)} KM/H</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;