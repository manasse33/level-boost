export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4',
    title: 'h-8',
    button: 'h-10',
    card: 'h-48',
    avatar: 'h-12 w-12 rounded-full',
  };

  return (
    <div className={`bg-slate-200 animate-pulse rounded ${variants[variant]} ${className}`} />
  );
};
export const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <Skeleton variant="title" className="mb-4 w-3/4" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" className="mb-2 w-5/6" />
    <Skeleton variant="text" className="w-2/3" />
    <div className="mt-6">
      <Skeleton variant="button" className="w-32" />
    </div>
  </div>
);