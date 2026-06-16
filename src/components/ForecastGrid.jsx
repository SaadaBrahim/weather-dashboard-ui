import "./ForecastGrid.css";

function formatDate(date) {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

function formatTemperature(value) {
  return `${Math.round(value)}°C`;
}

function ForecastGrid({ forecastData = [] }) {
  const forecastDays = forecastData.slice(1);

  if (!forecastDays.length) {
    return null;
  }

  return (
    <section className="forecast-grid-section" aria-label="Previsioni prossimi giorni">
      <h2 className="forecast-grid-section__title">Prossimi giorni</h2>
      <div className="forecast-grid">
        {forecastDays.map((day) => (
          <article className="forecast-card" key={day.date}>
            <p className="forecast-card__date">{formatDate(day.date)}</p>
            <p className="forecast-card__description">{day.description}</p>
            <div className="forecast-card__temps">
              <span>{formatTemperature(day.temperatureMax)}</span>
              <span>{formatTemperature(day.temperatureMin)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ForecastGrid;
