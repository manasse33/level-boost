export const FileUploader = ({ 
  onUpload, 
  accept = "image/*",
  maxSize = 5, // MB
  multiple = false,
  preview = true 
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError('');

    // Validation
    const validFiles = selectedFiles.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        setError(`${file.name} dépasse la taille maximale de ${maxSize}MB`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);

    // Generate previews
    if (preview && accept.includes('image')) {
      const newPreviews = [];
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push({ name: file.name, url: e.target.result });
          if (newPreviews.length === validFiles.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (validFiles.length > 0) {
      onUpload(multiple ? validFiles : validFiles[0]);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    onUpload(multiple ? newFiles : newFiles[0] || null);
  };

  return (
    <div>
      <label className="block">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer">
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Cliquez pour télécharger ou glissez-déposez
          </p>
          <p className="text-xs text-slate-500">
            {accept.includes('image') ? 'Images' : 'Fichiers'} jusqu'à {maxSize}MB
          </p>
        </div>
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative group">
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeFile(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
