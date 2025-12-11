// ============= TEXTAREA =============
export const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  rows = 4,
  className = ''
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full px-4 py-3 border rounded-lg outline-none transition resize-none
        ${error 
          ? 'border-red-300 focus:ring-2 focus:ring-red-500' 
          : 'border-slate-300 focus:ring-2 focus:ring-indigo-500'
        }
      `}
    />
    
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);