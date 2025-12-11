export const FilterPanel = ({ filters, activeFilters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        icon={Filter}
      >
        Filtres
        {Object.keys(activeFilters).length > 0 && (
          <Badge variant="primary" size="sm" className="ml-2">
            {Object.keys(activeFilters).length}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Filtres</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {filter.label}
                  </label>
                  
                  {filter.type === 'select' && (
                    <select
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="">Tous</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === 'date' && (
                    <input
                      type="date"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  )}

                  {filter.type === 'checkbox' && (
                    <div className="space-y-2">
                      {filter.options.map((opt) => (
                        <label key={opt.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(activeFilters[filter.key] || []).includes(opt.value)}
                            onChange={(e) => {
                              const current = activeFilters[filter.key] || [];
                              const updated = e.target.checked
                                ? [...current, opt.value]
                                : current.filter(v => v !== opt.value);
                              onFilterChange(filter.key, updated);
                            }}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-slate-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6 pt-6 border-t">
              <Button onClick={onReset} variant="secondary" fullWidth>
                Réinitialiser
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="primary" fullWidth>
                Appliquer
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

