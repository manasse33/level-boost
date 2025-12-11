export const Checklist = ({ items, onToggle }) => (
  <div className="space-y-2">
    {items.map((item, idx) => (
      <label
        key={idx}
        className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition"
      >
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(idx)}
          className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        />
        <span className={`ml-3 text-sm ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {item.label}
        </span>
      </label>
    ))}
  </div>
);