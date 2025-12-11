// ============= BADGE =============
export const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variantClasses = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-orange-100 text-orange-700',
    danger: 'bg-red-100 text-red-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`inline-flex items-center font-bold rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};