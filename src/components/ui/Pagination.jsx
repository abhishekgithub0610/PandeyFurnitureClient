import React from "react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Simple logic: just show max 5 pages
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="text-muted small">
        {totalItems > 0 ? (
          <>
            Showing {indexOfFirstItem} to {indexOfLastItem} of {totalItems}{" "}
            items
          </>
        ) : (
          <>No items to display</>
        )}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-sm mb-0">
            {/* Previous button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {/* Page numbers */}
            {getPageNumbers().map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(number)}
                >
                  {number}
                </button>
              </li>
            ))}

            {/* Next button */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Pagination;
