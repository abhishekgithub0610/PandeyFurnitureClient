import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utility/constants";

function OrderConfimration() {
  const location = useLocation();
  const naivgate = useNavigate();
  const orderData = location.state?.orderData;
  if (!orderData) {
    return null;
  }
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Success Header */}
          <div className="text-center mb-4">
            <div className="mb-3">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h2 className="fw-bold text-success mb-2">Order Confirmed!</h2>
            <p className="text-muted">Thank you for your order.</p>
          </div>
          {/* Order Details Card */}
          <div className="card border shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 text-center">Order Details</h5>
              <hr />
              <div className="mb-3">
                <strong>Order ID:</strong> #{orderData.orderNumber}
              </div>
              <div className="mb-3">
                <strong>Pickup Name:</strong> {orderData.pickUpName}
              </div>
              <div className="mb-3">
                <strong>Email:</strong>
                {orderData.pickUpEmail}
              </div>
              <div className="mb-3">
                <strong>Phone Number:</strong>
                {orderData.pickUpPhoneNumber}
              </div>
              <div className="mb-4">
                <strong>Number of Items:</strong>
                {orderData.totalItems}
              </div>
              <div className="mb-4">
                <strong>Order Total:</strong>${orderData.orderTotal}
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => naivgate(ROUTES.HOME)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfimration;
