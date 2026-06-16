import "./LocationList.css";

function LocationList({ locations = [], onSelectLocation }) {
  if (!locations.length) {
    return null;
  }

  return (
    <ul className="location-list" aria-label="Localita trovate">
      {locations.map((location) => {
        const label = `${location.name} - ${location.country} (${location.region})`;
        const key =
          location.id ??
          `${location.name}-${location.country}-${location.region}-${location.lat ?? ""}-${location.lon ?? ""}`;

        return (
          <li className="location-list__item" key={key}>
            <button
              className="location-list__button"
              type="button"
              aria-label={label}
              onClick={() => onSelectLocation(location)}
            >
              <span className="location-list__name">{location.name}</span>
              <span className="location-list__meta">
                {location.country} ({location.region})
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default LocationList;
