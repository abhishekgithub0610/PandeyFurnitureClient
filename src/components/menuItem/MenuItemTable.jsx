import { API_BASE_URL } from "../../utility/constants";
import { useState } from "react";
import Pagination from "../ui/Pagination";

function MenuItemTable({ menuItems, isLoading, error, onDelete, onEdit }) {
  // Pagination state - ONLY currentPage needed
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //  Pure derived state - NO useEffect, NO extra state

  const totalItems = menuItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Automatically clamp currentPage to valid range
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  // Compute pagination directly - super fast
  const paginatedMenuItems = menuItems.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );
  //myfix ends

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h5>Error Loading Menu Items</h5>
        <p>An error occurred while loading menu items.</p>
      </div>
    );
  }

  if (!menuItems?.length) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-basket text-muted" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 text-muted">No Menu Items</h4>
        <p className="text-muted">Start by adding your first menu item.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Special Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMenuItems.map((item) => (
              // {menuItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`${API_BASE_URL}/${item.image}`}
                    className="rounded"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "https://placehold.co/100";
                    }}
                  />
                </td>
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <small className="text-muted">{item.description}</small>
                </td>
                <td>
                  <span className="badge bg-secondary">{item.category}</span>
                </td>
                <td>
                  <strong>${item.price.toFixed(2)}</strong>
                </td>
                <td>
                  <strong>{item.quantity}</strong>
                </td>
                <td>
                  <span className="badge bg-warning ">{item.specialTag}</span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn btn-sm btn-outline-success"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add pagination component */}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(paginatedMenuItems.length / itemsPerPage)}
        onPageChange={handlePageChange}
        totalItems={paginatedMenuItems.length}
        itemsPerPage={itemsPerPage}
      /> */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

export default MenuItemTable;
