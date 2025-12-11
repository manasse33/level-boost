export const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirmer",
  cancelText = "Annuler",
  danger = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <Button onClick={onClose} variant="secondary" fullWidth>
            {cancelText}
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            variant={danger ? 'danger' : 'primary'} 
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

