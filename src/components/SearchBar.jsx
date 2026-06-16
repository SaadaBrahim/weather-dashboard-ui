import "./SearchBar.css";

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form className="search-bar" onSubmit={onSearch}>
      <input
        className="search-bar__input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Cerca una citta..."
        aria-label="Cerca una citta"
      />
      <button className="search-bar__button" type="submit">
        Cerca
      </button>
    </form>
  );
}

export default SearchBar;
