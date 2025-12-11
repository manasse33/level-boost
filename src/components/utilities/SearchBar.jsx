export const SearchBar = ({ onSearch, suggestions = [], placeholder = "Rechercher..." }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(query.length > 0 && suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50"
          >
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleSearch(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 transition"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

