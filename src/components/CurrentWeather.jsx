import "./CurrentWeather.css";

function formatDate(date) {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(date));
}

function formatTemperature(value) {
  return `${Math.round(value)}°C`;
}

function formatPrecipitation(value) {
  const percentage = value <= 1 ? value * 100 : value;
  return `${Math.round(percentage)}%`;
}

function CurrentWeather({ forecastData = [], cityName = "Localita selezionata" }) {
  const today = forecastData[0];

  if (!today) {
    return null;
  }

  return (
    <section className="current-weather" aria-label="Meteo di oggi">
      <div className="current-weather__header">
        <div>
          <p className="current-weather__eyebrow">Oggi</p>
          <h2 className="current-weather__city">{cityName}</h2>
          <p className="current-weather__date">{formatDate(today.date)}</p>
        </div>
        <p className="current-weather__description">{today.description}</p>
      </div>

      <div className="current-weather__temperatures">
        <span className="current-weather__temp current-weather__temp--max">
          {formatTemperature(today.temperatureMax)}
        </span>
        <span className="current-weather__temp current-weather__temp--min">
          {formatTemperature(today.temperatureMin)}
        </span>
      </div>

      <dl className="current-weather__details">
        <div className="current-weather__detail">
          <dt>Precipitazioni</dt>
          <dd>{formatPrecipitation(today.precipitationProbability)}</dd>
        </div>
        <div className="current-weather__detail">
          <dt>Vento</dt>
          <dd>{Math.round(today.windSpeed)} km/h</dd>
        </div>
      </dl>
    </section>
  );
}

export default CurrentWeather;
