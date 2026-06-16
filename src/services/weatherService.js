// Recupera l'URL di Render o usa il localhost come fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'; 

/**
 * Cerca le località (Endpoint backend: GET /api/weather/locations?q=...)
 */
export const searchLocations = async (query) => {
  try {
    // Proviamo a passare il parametro pulito. 
    // NOTA: Se il tuo backend Node si aspetta 'name' anziché 'q', cambia 'q=${...}' in 'name=${...}'
    const response = await fetch(`${BASE_URL}/weather/locations?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) throw new Error(`Errore server: ${response.status}`);
    
    const data = await response.json();
    console.log("Dati ricevuti dal backend su Render:", data); // 👇 Questo ci serve per controllare nei log del browser!
    return data;
  } catch (error) {
    console.error("Errore in searchLocations:", error);
    throw error;
  }
};

/**
 * Recupera le previsioni (Endpoint backend: GET /api/weather/forecast?lat=...&lon=...)
 * NOTA: Verifica se il tuo backend si aspetta 'lat'/'lon' o 'latitude'/'longitude' nei parametri!
 */
export const getWeatherForecast = async (latitude, longitude) => {
  try {
    // Adattato sui parametri standard del backend (?lat=...&lon=...)
    const response = await fetch(`${BASE_URL}/weather/forecast?lat=${latitude}&lon=${longitude}`);
    if (!response.ok) throw new Error(`Errore server: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Errore in getWeatherForecast:", error);
    throw error;
  }
};