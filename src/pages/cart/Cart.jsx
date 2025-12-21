import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL, ROUTES } from "../../utility/constants";
import { useCreateOrderMutation } from "../../store/api/ordersApi";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slice/cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart.");
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared.");
  };
  const [formData, setFormData] = useState({
    pickUpName: user?.name || "",
    pickUpPhoneNumber: "",
    pickUpEmail: user?.email || "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!formData.pickUpName.trim()) {
      errors.push("Full Name is required");
    }
    if (!formData.pickUpEmail.trim()) {
      errors.push("Email is required");
    }
    if (!formData.pickUpPhoneNumber.trim()) {
      errors.push("Phone Number is required");
    }
    if (errors.length > 0) {
      toast.error(
        <div>
          <strong>Please correct the following:</strong>
          <ul className="mb-0 mt-1 ps-3">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
      return;
    }
    if (!user?.id) {
      toast.error("Unable to identify user. Please log in again.");
      return;
    }
    const orderData = {
      pickUpName: formData.pickUpName,
      pickUpPhoneNumber: formData.pickUpPhoneNumber,
      pickUpEmail: formData.pickUpEmail,
      applicationUserId: user?.id,
      orderTotal: totalAmount,
      totalItem: totalItems,
      orderDetailsDTO: items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        itemName: item.name,
        price: item.price,
      })),
    };
    try {
      const result = await createOrder(orderData).unwrap();
      if (result.isSuccess) {
        toast.success("Order placed successfully!");
        navigate(ROUTES.ORDER_CONFIRMATION, {
          state: {
            orderData: {
              orderNumber: result.result.orderHeaderId,
              pickUpName: formData.pickUpName,
              pickUpEmail: formData.pickUpEmail,
              pickUpPhoneNumber: formData.pickUpPhoneNumber,
              orderTotal: totalAmount,
              totalItems: totalItems,
            },
          },
        });
        //navigate(ROUTES.LOGIN);
      } else {
        toast.error(result.errorMessages?.[0] || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.data?.errorMessages?.[0] || "Failed to place order");
    }
  };
  if (items.length === 0) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="display-4 mb-3 text-muted">
              <i className="bi bi-cart"></i>
            </div>
            <h3 className="mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven't added any items yet.
            </p>
            <a href="/" className="btn btn-primary btn-lg">
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container-fluid p-4 " style={{ minHeight: "100vh" }}>
        {/* Dashboard Header */}
        <div className="row g-4 pt-3">
          {/* Left Column - Cart Management */}
          <div className="col-lg-8">
            <div className="card rounded shadow-sm">
              {/* Cart Header */}
              <div className="p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-cart3 me-2"></i>
                    Your Shopping Cart
                  </h5>
                  <div className="text-muted small">
                    <i className="bi bi-info-circle me-1"></i>
                    Review and modify your order
                  </div>
                </div>
              </div>
              {/* Cart Items */}
              <div
                className="p-4"
                style={{ maxHeight: "600px", overflowY: "auto" }}
              >
                <div className="row g-3">
                  {items.map((item) => (
                    <div className="col-12" key={item.id}>
                      <div className="border rounded p-3 border-light hover-shadow">
                        <div className="d-flex align-items-center gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={`${API_BASE_URL}/${item.image}`}
                              className="rounded"
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.src = "https://placehold.co/100";
                              }}
                            />
                          </div>
                          {/* Product Details */}
                          <div className="flex-grow-1">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <h6 className="mb-1 fw-semibold">
                                  {item.name}
                                </h6>
                                <div className="text-muted small">
                                  ${parseFloat(item.price).toFixed(2)} each
                                </div>
                              </div>
                              <div className="col-md-3">
                                <label className="form-label small text-muted">
                                  Quantity
                                </label>
                                <div className="input-group input-group-sm">
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item.id,
                                        e.target.value
                                      )
                                    }
                                    className="form-control text-center"
                                    min="1"
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <label className="form-label small text-muted">
                                  Subtotal
                                </label>
                                <div className="fw-bold text-primary fs-5">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                              <div className="col-md-2">
                                <button
                                  className="btn btn-outline-danger btn-sm w-100"
                                  title="Remove item"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <i className="bi bi-trash3"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Cart Total */}
              <div className="p-4 border-top border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold h6 mb-0">
                    <i className="bi bi-calculator me-2"></i>
                    Cart Total ({totalItems} items)
                  </span>
                  <span className="fw-bold text-primary h4 mb-0">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="border-top p-4">
                <div className="d-flex gap-3 justify-content-center">
                  <Link
                    to={ROUTES.HOME}
                    className="btn btn-outline-secondary px-4 rounded-pill"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Continue Shopping
                  </Link>
                  <button
                    className="btn btn-outline-danger px-4 rounded-pill"
                    onClick={handleClearCart}
                  >
                    <i className="bi bi-trash3 me-2"></i>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Sticky Checkout Panel */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "20px" }}>
              <form onSubmit={handleSubmit}>
                <div className="card rounded shadow-sm">
                  <div className="p-4">
                    {/* Order Summary */}
                    {/* Pickup Information */}
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3">
                        <i className="bi bi-person-check me-2"></i>
                        Pickup Details
                      </h5>
                      <div className="row g-3">
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="pickUpName"
                              name="pickUpName"
                              placeholder="Full Name"
                              value={formData.pickUpName}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpName">Full Name *</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="tel"
                              className="form-control"
                              id="pickUpPhoneNumber"
                              name="pickUpPhoneNumber"
                              placeholder="Phone Number"
                              value={formData.pickUpPhoneNumber}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpPhoneNumber">
                              Phone Number *
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="email"
                              className="form-control"
                              id="pickUpEmail"
                              name="pickUpEmail"
                              placeholder="Email"
                              value={formData.pickUpEmail}
                              onChange={handleChange}
                            />
                            <label htmlFor="pickUpEmail">Email Address *</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Place Order Button */}
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-credit-card me-2"></i>
                            Place Order (${totalAmount.toFixed(2)})
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Pickup Info */}
                  <div className="border-top p-4">
                    <div className="alert alert-info small mb-0">
                      <i className="bi bi-clock me-2"></i>
                      <strong>Ready in 15-20 mins</strong> after order
                      confirmation
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
