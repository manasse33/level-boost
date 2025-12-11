export const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange }) => (
  <div className="flex gap-3 items-center">
    <div className="flex-1">
      <label className="block text-sm font-medium text-slate-700 mb-1">Début</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
    <div className="pt-6">→</div>
    <div className="flex-1">
      <label className="block text-sm font-medium text-slate-700 mb-1">Fin</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  </div>
);

