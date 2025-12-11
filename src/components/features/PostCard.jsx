export const PostCard = ({ post, onEdit, onDelete, onPublish }) => (
  <Card className="relative">
    <div className="absolute top-4 right-4">
      <Badge variant={post.status === 'published' ? 'success' : 'default'}>
        {post.status}
      </Badge>
    </div>

    {post.media && post.media[0] && (
      <div className="aspect-video bg-slate-100 rounded-lg mb-4 overflow-hidden">
        <img src={post.media[0]} alt={post.title} className="w-full h-full object-cover" />
      </div>
    )}

    <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.content}</p>

    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
      <span className="flex items-center">
        <Eye className="w-4 h-4 mr-1" /> {post.views_count}
      </span>
      <span className="flex items-center">
        <Star className="w-4 h-4 mr-1" /> {post.likes_count}
      </span>
      <span className="flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" /> {post.shares_count}
      </span>
    </div>

    <div className="flex gap-2">
      {post.status === 'draft' && (
        <Button onClick={() => onPublish(post)} variant="primary" size="sm">
          Publier
        </Button>
      )}
      <Button onClick={() => onEdit(post)} variant="secondary" size="sm">
        Modifier
      </Button>
      <Button onClick={() => onDelete(post)} variant="danger" size="sm">
        Supprimer
      </Button>
    </div>
  </Card>
);
