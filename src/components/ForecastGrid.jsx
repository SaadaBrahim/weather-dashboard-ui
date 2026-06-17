import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog } from 'lucide-react';
import './ForecastGrid.css';

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

  const futureDays = forecastData.slice(1, 6);

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Prossimi 5 giorni</h3>
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
                <span className="forecast-temp-max">{Math.round(day.temperatureMax)}°C</span>
                <span className="forecast-temp-min">{Math.round(day.temperatureMin)}°</span>
              </div>
              <div className="forecast-description">
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
