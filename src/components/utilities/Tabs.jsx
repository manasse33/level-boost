export const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="border-b border-slate-200">
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`pb-4 px-1 border-b-2 font-medium transition ${
            activeTab === tab.value
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.value
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);
