import { Icon } from "@iconify/react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  scrollToId = null,
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, and pages around current
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // Middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page) => {
    onPageChange(page);
    
    // Scroll to specific element or top of page
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        const offset = 100; // Offset for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ 
          top: elementPosition - offset, 
          behavior: 'smooth' 
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  const pages = getPageNumbers();
  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-12">
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-paan-red hover:text-white shadow-md'
          }`}
          aria-label="Previous page"
        >
          <Icon icon="heroicons:chevron-left" className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-paan-red text-white shadow-lg scale-110'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-paan-red hover:text-white shadow-md'
          }`}
          aria-label="Next page"
        >
          <Icon icon="heroicons:chevron-right" className="w-5 h-5" />
        </button>
      </div>

      {/* Results Summary */}
      {totalItems > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {startItem} - {endItem} of {totalItems} articles
        </div>
      )}
    </div>
  );
}
