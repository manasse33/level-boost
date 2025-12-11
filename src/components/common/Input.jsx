// ============= INPUT =============
export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  disabled = false,
  icon: Icon,
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg outline-none transition
          ${Icon ? 'pl-11' : ''}
          ${error 
            ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
            : 'border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
          }
          ${disabled ? 'bg-slate-50 cursor-not-allowed' : 'bg-white'}
        `}
      />
    </div>
    
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);