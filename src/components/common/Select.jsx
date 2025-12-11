// ============= SELECT =============
export const Select = ({ 
  label, 
  value, 
  onChange, 
  options, 
  error,
  required = false,
  placeholder = 'Sélectionner...',
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full px-4 py-3 border rounded-lg outline-none transition bg-white
        ${error 
          ? 'border-red-300 focus:ring-2 focus:ring-red-500' 
          : 'border-slate-300 focus:ring-2 focus:ring-indigo-500'
        }
      `}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);