import { useState } from 'react';
import { searchLocations, getWeatherForecast } from './services/weatherService.js';
import SearchBar from './components/SearchBar.jsx';
import LocationList from './components/LocationList.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import ForecastGrid from './components/ForecastGrid.jsx';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setLocations([]);
    setForecast(null);

    try {
      const data = await searchLocations(query);

      const locationsArray = data.locations || [];
      setLocations(locationsArray);

      if (locationsArray.length === 0) {
        setError('Nessuna localita trovata. Riprova!');
      }
    } catch (err) {
      console.error('Dettaglio errore ricerca:', err);
      setError('Errore durante la ricerca della localita. Controlla il backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = async (location) => {
    setSelectedLocation(location);
    setLocations([]);
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherForecast(location.latitude, location.longitude);

      const forecastData = data.forecast || data;
      setForecast(forecastData);
    } catch (err) {
      console.error('Dettaglio errore forecast:', err);
      setError('Impossibile recuperare le previsioni meteo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-hero">
        <span className="app-eyebrow">Live Weather</span>
        <h1>Dashboard Meteo</h1>
        <p className="app-subtitle">Previsioni nitide, superfici frosted e dettagli pensati per ogni schermo.</p>
      </header>

      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {isLoading && <p className="status-panel loading">Caricamento in corso...</p>}
      {error && <p className="status-panel error-message">{error}</p>}

      <LocationList locations={locations} onSelectLocation={handleSelectLocation} />

      {forecast && (
        <div className="forecast-results">
          <CurrentWeather forecastData={forecast} cityName={selectedLocation?.name} />
          <ForecastGrid forecastData={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;
