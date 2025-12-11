export const DataTable = ({ 
  columns, 
  data, 
  onRowClick,
  searchable = false,
  filterable = false,
  filters = [],
  onSearch,
  onFilter 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <div>
      {/* Header with Search and Filters */}
      {(searchable || filterable) && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <Input
                value={searchTerm}
                onChange={(val) => {
                  setSearchTerm(val);
                  onSearch && onSearch(val);
                }}
                placeholder="Rechercher..."
                icon={Search}
              />
            </div>
          )}
          {filterable && filters.length > 0 && (
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Select
                  key={filter.key}
                  value={activeFilters[filter.key] || ''}
                  onChange={(val) => {
                    const newFilters = { ...activeFilters, [filter.key]: val };
                    setActiveFilters(newFilters);
                    onFilter && onFilter(newFilters);
                  }}
                  options={filter.options}
                  placeholder={filter.label}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.length > 0 ? (
                data.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''} transition`}
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};