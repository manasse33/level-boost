// ============= POST FORM =============
export const PostForm = ({ post = null, profiles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    profile_id: post?.profile_id || '',
    type: post?.type || 'image',
    title: post?.title || '',
    content: post?.content || '',
    scheduled_at: post?.scheduled_at || '',
  });

  const [errors, setErrors] = useState({});

  const postTypes = [
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Vidéo' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'story', label: 'Story' },
    { value: 'article', label: 'Article' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.profile_id) newErrors.profile_id = 'Sélectionnez un profil';
    if (!formData.title) newErrors.title = 'Titre requis';
    if (!formData.content) newErrors.content = 'Contenu requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Select
        label="Profil"
        value={formData.profile_id}
        onChange={(val) => handleChange('profile_id', val)}
        options={profiles.map(p => ({ value: p.id, label: p.title }))}
        error={errors.profile_id}
        required
      />

      <Select
        label="Type de post"
        value={formData.type}
        onChange={(val) => handleChange('type', val)}
        options={postTypes}
        required
      />

      <Input
        label="Titre"
        value={formData.title}
        onChange={(val) => handleChange('title', val)}
        placeholder="Titre accrocheur..."
        error={errors.title}
        required
      />

      <Textarea
        label="Contenu"
        value={formData.content}
        onChange={(val) => handleChange('content', val)}
        placeholder="Votre message, hashtags..."
        error={errors.content}
        rows={6}
        required
      />

      <Input
        label="Programmer pour le"
        type="datetime-local"
        value={formData.scheduled_at}
        onChange={(val) => handleChange('scheduled_at', val)}
        icon={Calendar}
      />

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {post ? 'Mettre à jour' : 'Créer le post'}
        </Button>
      </div>
    </div>
  );
};