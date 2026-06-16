import { useState } from 'react';
import { searchLocations, getWeatherForecast } from './services/weatherService.js';
import SearchBar from './components/SearchBar.jsx'; 
import LocationList from './components/LocationList.jsx'; 
// 👇 Importiamo i componenti grafici che ha generato Codex
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
      setLocations(data);
      if (data.length === 0) {
        setError('Nessuna località trovata. Riprova!');
      }
    } catch (err) {
      console.error("Dettaglio errore ricerca:", err);
      setError('Errore durante la ricerca della località. Controlla il backend.');
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
      setForecast(data);
    } catch (err) {
      console.error("Dettaglio errore forecast:", err);
      setError('Impossibile recuperare le previsioni meteo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>☀️ Dashboard Meteo</h1>
      
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {isLoading && <p className="loading">Caricamento in corso...</p>}
      {error && <p className="error-message">{error}</p>}

      <LocationList locations={locations} onSelectLocation={handleSelectLocation} />

      {/* 👇 Sostituito il vecchio tag <pre> con la UI reale di Codex */}
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