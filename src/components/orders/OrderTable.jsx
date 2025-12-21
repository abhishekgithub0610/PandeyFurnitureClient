import { API_BASE_URL } from "../../utility/constants";
import { formatDate, getOrderStatusColor } from "../../utility/generalUtility";
import { useState, useEffect } from "react";
import Pagination from "../ui/Pagination";

function OrderTable({ orders, isLoading, error, onEdit }) {
  // Pagination state

  //myfix
  // // const [currentPage, setCurrentPage] = useState(1);
  // // const [itemsPerPage] = useState(4);
  // // const [paginatedOrders, setPaginatedOrders] = useState([]);

  // // // Calculate pagination whenever orders or currentPage changes
  // // useEffect(() => {
  // //   const indexOfLastOrder = currentPage * itemsPerPage;
  // //   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  // //   setPaginatedOrders(orders.slice(indexOfFirstOrder, indexOfLastOrder));

  // //   // Reset to page 1 if we're on a page that no longer exists
  // //   if (
  // //     currentPage > Math.ceil(orders.length / itemsPerPage) &&
  // //     orders.length > 0
  // //   ) {
  // //     setCurrentPage(1);
  // //   }
  // // }, [orders, currentPage, itemsPerPage]);

  // Pagination state - ONLY currentPage needed
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  //  Pure derived state - NO useEffect, NO extra state
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Automatically clamp currentPage to valid range
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  // Compute pagination directly - super fast
  const paginatedOrders = orders.slice(
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
        <p className="mt-2">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h5>Error Loading Orders</h5>
        <p>An error occurred while loading orders.</p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-basket text-muted" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 text-muted">No Orders</h4>
        <p className="text-muted">Start by adding your first order.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.orderHeaderId}>
                <td className="fw-semibold">#{order.orderHeaderId}</td>
                <td>
                  <small className="text-muted">
                    {formatDate(order.orderDate)}
                  </small>
                </td>
                <td>
                  <div className="small">
                    <div className="fw-semibold ">{order.pickUpName}</div>
                    <div className=" ">
                      {order.pickUpEmail} | {order.pickUpPhoneNumber}
                    </div>
                  </div>
                </td>
                <td>
                  <strong>{order.totalItem}</strong>
                </td>
                <td>${parseFloat(order.orderTotal || 0).toFixed(2)}</td>
                <td>
                  <span
                    className={`btn btn-sm disabled btn-${getOrderStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => onEdit(order)}
                      className="btn btn-sm btn-outline-success"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(orders.length / itemsPerPage)}
        onPageChange={handlePageChange}
        totalItems={orders.length}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

export default OrderTable;
