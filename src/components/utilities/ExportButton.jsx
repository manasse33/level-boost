export const ExportButton = ({ onExport, formats = ['csv', 'pdf', 'xlsx'] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatLabels = {
    csv: 'CSV',
    pdf: 'PDF',
    xlsx: 'Excel',
    json: 'JSON',
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        icon={Download}
      >
        Exporter
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-20"
            >
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => {
                    onExport(format);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{formatLabels[format]}</span>
                  <File className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

