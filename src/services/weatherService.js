// 1. Modificato il nome della variabile in VITE_API_URL per combaciare con Vercel
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'; 

// 2. Uniamo l'URL di base con il pezzetto '/api' in modo sicuro
const BASE_URL = `${API_URL}/api`;

/**
 * Cerca le località (Endpoint backend: GET /api/weather/locations?q=...)
 */
export const searchLocations = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/weather/locations?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) throw new Error(`Errore server: ${response.status}`);
    
    const data = await response.json();
    console.log("Dati ricevuti dal backend su Render:", data); 
    return data;
  } catch (error) {
    console.error("Errore in searchLocations:", error);
    throw error;
  }
};

/**
 * Recupera le previsioni (Endpoint backend: GET /api/weather/forecast?lat=...&lon=...)
 */
export const getWeatherForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(`${BASE_URL}/weather/forecast?lat=${latitude}&lon=${longitude}`);
    if (!response.ok) throw new Error(`Errore server: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Errore in getWeatherForecast:", error);
    throw error;
  }
};