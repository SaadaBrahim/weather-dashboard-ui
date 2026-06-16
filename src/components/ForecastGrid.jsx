import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog } from 'lucide-react';

const getWeatherIcon = (code) => {
  if (code === 0) return Sun;
  if ([1, 2, 3].includes(code)) return Cloud;
  if ([45, 48].includes(code)) return CloudFog;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 85, 86].includes(code)) return Snowflake;
  if ([95, 96, 99].includes(code)) return CloudLightning;
  return Cloud;
};

const ForecastGrid = ({ forecastData }) => {
  if (!Array.isArray(forecastData) || forecastData.length <= 1) return null;

  // Usiamo .slice(1) per escludere oggi (indice 0) e prendere solo i giorni futuri
  const futureDays = forecastData.slice(1, 6);

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">PROJECTION // 5-DAY FORECAST</h3>
      <div className="forecast-grid">
        {futureDays.map((day, index) => {
          const DayIcon = getWeatherIcon(day.weatherCode);
          const dateObj = new Date(day.date);
          const dayName = dateObj.toLocaleDateString('it-IT', { weekday: 'short' }).toUpperCase();
          const dayNum = dateObj.toLocaleDateString('it-IT', { day: '2-digit' });

          return (
            <div key={index} className="forecast-card">
              <div className="forecast-date">{dayName} {dayNum}</div>
              <div className="forecast-icon-wrapper">
                <DayIcon size={32} className="main-weather-icon" />
              </div>
              <div className="forecast-temp-range">
                <span style={{ color: 'var(--neon-cyan)' }}>{Math.round(day.temperatureMax)}°C</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '6px' }}>
                  {Math.round(day.temperatureMin)}°
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '6px', textTransform: 'uppercase' }}>
                {day.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastGrid;