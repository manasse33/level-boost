export const ProfileCard = ({ profile, onClick, variant = 'grid' }) => {
  if (variant === 'list') {
    return (
      <Card hover onClick={onClick} className="flex items-center space-x-6">
        <img 
          src={profile.logo || 'https://via.placeholder.com/80'} 
          alt={profile.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-slate-900">{profile.title}</h3>
            <Badge variant="primary">{profile.type}</Badge>
          </div>
          <p className="text-slate-600 text-sm mb-2 line-clamp-2">{profile.description}</p>
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" /> {profile.views_count} vues
            </span>
            {profile.rating && (
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" /> {profile.rating}
              </span>
            )}
          </div>
        </div>
        <Badge variant={profile.status === 'active' ? 'success' : 'default'}>
          {profile.status}
        </Badge>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all"
    >
      <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
        {profile.cover_image ? (
          <img src={profile.cover_image} alt={profile.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant={profile.featured ? 'warning' : 'default'}>
            {profile.featured ? '⭐ Featured' : profile.type}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">
          {profile.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{profile.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" /> {profile.views_count}
            </span>
            {profile.rating && (
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-500 text-yellow-500" /> {profile.rating}
              </span>
            )}
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </motion.div>
  );
};
