import { API_BASE_URL } from "../../utility/constants";

function MenuItemTable({ menuItems, isLoading, error, onDelete, onEdit }) {
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
            {menuItems.map((item) => (
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
    </>
  );
}

export default MenuItemTable;
