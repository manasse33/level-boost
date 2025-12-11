// ============= PAGINATION =============
export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
    >
      Précédent
    </button>
    
    <div className="flex space-x-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium ${
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
    
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
    >
      Suivant
    </button>
  </div>
);