export const Timeline = ({ events }) => (
  <div className="space-y-6">
    {events.map((event, idx) => (
      <div key={idx} className="flex">
        <div className="flex flex-col items-center mr-4">
          <div className={`w-3 h-3 rounded-full ${event.completed ? 'bg-indigo-600' : 'bg-slate-300'}`} />
          {idx < events.length - 1 && (
            <div className={`w-0.5 h-full mt-2 ${event.completed ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          )}
        </div>
        <div className="flex-1 pb-8">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-900">{event.title}</h4>
            <span className="text-sm text-slate-500">{event.date}</span>
          </div>
          <p className="text-sm text-slate-600">{event.description}</p>
        </div>
      </div>
    ))}
  </div>
);
