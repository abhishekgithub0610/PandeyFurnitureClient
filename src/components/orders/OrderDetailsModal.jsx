import { ORDER_STATUS } from "../../utility/constants";
import { formatDate, getOrderStatusColor } from "../../utility/generalUtility";
import Rating from "../../components/ui/Rating";
import { useUpdateOrderDetailsMutation } from "../../store/api/ordersApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function OrderDetailsModal({
  order,
  onSubmit,
  onClose,
  isSubmitting,
  onUpdateDataChange,
  updateData,
  isAdmin,
}) {
  const [updateOrderDetails] = useUpdateOrderDetailsMutation();
  const [ratings, setRatings] = useState(() => {
    const initialRatings = {};
    if (order?.orderDetails?.length > 0) {
      order.orderDetails.forEach((item) => {
        if (item.rating) {
          initialRatings[item.orderDetailId] = item.rating;
        }
      });
    }
    return initialRatings;
  });

  const { user } = useSelector((state) => state.auth);
  const canRate =
    order?.status === ORDER_STATUS.COMPLETED &&
    order?.applicationUserId === user?.id;
  const handleRatingChange = async (orderDetailId, newRating) => {
    try {
      await updateOrderDetails({
        orderDetailsId: orderDetailId,
        rating: newRating,
      }).unwrap();

      setRatings((prev) => ({
        ...prev,
        [orderDetailId]: newRating,
      }));
      toast.success(
        `Rating of ${newRating} star${
          newRating !== 1 ? "s" : ""
        } submitted successfully!`
      );
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">
                  Order #{order.orderHeaderId}
                </h5>
                <small className="text-muted">
                  Placed {formatDate(order.orderDate)}{" "}
                </small>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <form className="pt-2" onSubmit={onSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <div className="border rounded-3 p-3 h-100">
                      <h6 className="fw-bold mb-2">Order Info</h6>
                      <div className="small mb-1">
                        <strong>Total:</strong> $
                        {parseFloat(order?.orderTotal || 0).toFixed(2)}
                      </div>
                      <div className="small">
                        <strong>Status:</strong>
                        <span
                          className={`badge p-2 text-bg-${getOrderStatusColor(
                            order.status
                          )} ms-1`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border rounded-3 p-3 h-100">
                      <h6 className="fw-bold mb-2">Customer</h6>
                      <div className="small mb-1">
                        <strong>Name:</strong> {order?.pickUpName || "N/A"}
                      </div>
                      <div className="small mb-1">
                        <strong>Email:</strong>
                        {order?.pickUpEmail || "N/A"}
                      </div>
                      <div className="small">
                        <strong>Phone:</strong>
                        {order?.pickUpPhoneNumber || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                {isAdmin && (
                  <div className="border rounded-3 p-3 mb-3">
                    <h6 className="fw-bold mb-2">Update Status</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-uppercase text-muted">
                          Current
                        </label>
                        <div>
                          <span
                            className={`btn disabled btn-${getOrderStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-uppercase text-muted">
                          Change To
                        </label>
                        <select
                          className="form-select"
                          value={updateData.status || ""}
                          onChange={(e) =>
                            onUpdateDataChange({
                              ...updateData,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="">Select...</option>
                          {order?.status === ORDER_STATUS.CONFIRMED && (
                            <option value={ORDER_STATUS.READY_FOR_PICKUP}>
                              {ORDER_STATUS.READY_FOR_PICKUP}
                            </option>
                          )}
                          {order?.status === ORDER_STATUS.READY_FOR_PICKUP && (
                            <option value={ORDER_STATUS.COMPLETED}>
                              {ORDER_STATUS.COMPLETED}
                            </option>
                          )}
                          <option value={ORDER_STATUS.CANCELLED}>
                            {ORDER_STATUS.CANCELLED}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border rounded-3 p-3 mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fw-bold mb-0">Items</h6>
                    {canRate && (
                      <span className="badge bg-success-subtle text-success px-3 py-2">
                        <i className="bi bi-star me-1"></i>
                        You can now rate your items
                      </span>
                    )}
                  </div>
                  <div className="vstack gap-3">
                    {order?.orderDetails?.length > 0 ? (
                      order.orderDetails.map((item, index) => (
                        <div key={index} className="border rounded-2 p-3">
                          <div className="d-flex justify-content-between flex-wrap gap-3 mb-2">
                            <div className="flex-grow-1">
                              <div className="fw-semibold">{item.itemName}</div>
                              <div className="small text-muted">
                                Qty {item.quantity} × $
                                {parseFloat(item.price || 0).toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Rating section for completed orders */}
                          {canRate && (
                            <div className="mt-3 pt-3 border-top bg-light rounded p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h6 className="mb-1 fw-semibold small text-primary">
                                    <i className="bi bi-star me-1"></i>
                                    Rate this item
                                  </h6>
                                </div>
                                <div className="text-end">
                                  <Rating
                                    onChange={(rating) =>
                                      handleRatingChange(
                                        item.orderDetailId,
                                        rating
                                      )
                                    }
                                    value={ratings[item.orderDetailId] || 0}
                                    size="medium"
                                  />
                                  {(ratings[item.orderDetailId] ||
                                    item.rating > 0) && (
                                    <div className="mt-1">
                                      <small className="text-success">
                                        <i className="bi bi-check-circle-fill me-1"></i>{" "}
                                        Rated
                                      </small>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted">No items found</div>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {isAdmin && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting || !updateData.status}
                    >
                      {isSubmitting ? (
                        <>
                          {" "}
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Updating...
                        </>
                      ) : (
                        <>Update Order</>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsModal;
