import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL, ROUTES } from "../../utility/constants";
import { useCreateOrderMutation } from "../../store/api/ordersApi";
import {
  updateQuantityGuest,
  removeFromCartGuest,
  clearCartGuest,
  updateQuantityAsync,
  removeFromCartAsync,
  clearCartAsync,
  fetchCartAsync,
} from "../../store/slice/cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  // ➕ NEW
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // values: COD | RAZORPAY | STRIPE

  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);
  // ✅ UPDATED: Handle quantity differently for guest vs logged-in
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }

    if (user) {
      // 🔵 Logged-in → Update DB
      dispatch(updateQuantityAsync({ menuItemId: id, quantity }));
    } else {
      // 🟢 Guest → Update localStorage
      dispatch(updateQuantityGuest({ id, quantity }));
    }
  };

  // ✅ UPDATED: Remove logic split
  const handleRemoveItem = (id) => {
    if (user) {
      dispatch(removeFromCartAsync(id));
    } else {
      dispatch(removeFromCartGuest(id));
    }

    toast.success("Item removed from cart.");
  };

  // ✅ UPDATED: Clear logic split
  const handleClearCart = () => {
    if (user) {
      dispatch(clearCartAsync());
    } else {
      dispatch(clearCartGuest());
    }

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

  // ✅ UPDATED: Clear cart AFTER successful order
  const clearCartAfterSuccess = () => {
    if (user) {
      dispatch(clearCartAsync());
      dispatch(fetchCartAsync());
    } else {
      dispatch(clearCartGuest());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // COD → existing behavior (NO CHANGE)
    if (paymentMethod === "COD") {
      await placeOrderCOD();
      return;
    }

    // ➕ NEW: Razorpay flow
    if (paymentMethod === "RAZORPAY") {
      await startRazorpayPayment();
      return;
    }
  };

  // ➕ NEW
  const buildOrderPayload = () => ({
    pickUpName: formData.pickUpName,
    pickUpPhoneNumber: formData.pickUpPhoneNumber,
    pickUpEmail: formData.pickUpEmail,
    applicationUserId: user?.id,
    orderDetails: items.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity,
      itemName: item.name,
      price: item.price,
    })),
  });

  // ➕ NEW (this is your existing logic moved here)
  const placeOrderCOD = async () => {
    const orderData = buildOrderPayload();

    try {
      console.log(orderData);
      const result = await createOrder(orderData).unwrap();
      if (result.isSuccess) {
        clearCartAfterSuccess(); // ✅ important
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
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  // ➕ NEW
  const startRazorpayPayment = async () => {
    try {
      // 1️⃣ Create order in DB (status = PAYMENT_PENDING)
      //const orderResult = await createOrder(buildOrderPayload()).unwrap();
      if (isLoading) return; // 🔥 Prevent double click

      const orderResult = await createOrder(buildOrderPayload()).unwrap();

      const orderId = orderResult.result.orderHeaderId;

      // 2️⃣ Create Razorpay order linked to OrderHeaderId
      const res = await fetch(`${API_BASE_URL}/api/payments/razorpay/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: totalAmount,
          orderHeaderId: orderId,
        }),
      });

      // const token = user?.token;

      // fetch(`${API_BASE_URL}/api/payments/razorpay/create`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     amount: totalAmount,
      //     orderHeaderId: orderId,
      //   }),
      // });

      //const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Pandey Furniture",
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          await verifyPayment(response, orderId);
        },
        prefill: {
          name: formData.pickUpName,
          email: formData.pickUpEmail,
          contact: formData.pickUpPhoneNumber,
        },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Payment initiation failed");
    }
  };

  // ➕ NEW
  const verifyPayment = async (paymentResponse, orderHeaderId) => {
    const verifyRes = await fetch(
      `${API_BASE_URL}/api/payments/razorpay/verify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          orderHeaderId,
        }),
      },
    );

    if (!verifyRes.ok) {
      toast.error("Payment verification failed");
      return;
    }
    clearCartAfterSuccess(); // ✅ important

    toast.success("Payment successful!");
    //navigate(ROUTES.ORDER_CONFIRMATION);
    navigate(ROUTES.ORDER_CONFIRMATION, {
      state: {
        orderData: {
          orderNumber: orderHeaderId,
          orderTotal: totalAmount,
          totalItems,
        },
      },
    });
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
                                        item.quantity - 1,
                                      )
                                    }
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const qty = Math.max(
                                        1,
                                        Number(e.target.value) || 1,
                                      ); // 🔥 safe conversion
                                      handleQuantityChange(item.id, qty);
                                    }}
                                    // onChange={(e) =>
                                    //   handleQuantityChange(
                                    //     item.id,
                                    //     e.target.value,
                                    //   )
                                    // }
                                    className="form-control text-center"
                                    min="1"
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.id,
                                        item.quantity + 1,
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
                      {/* ➕ NEW: Payment Method Selection */}
                      <div className="mb-4">
                        <h6 className="fw-bold mb-2">
                          <i className="bi bi-wallet2 me-2"></i>
                          Payment Method
                        </h6>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="cod"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="cod">
                            Cash on Delivery
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="razorpay"
                            value="RAZORPAY"
                            checked={paymentMethod === "RAZORPAY"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="razorpay"
                          >
                            Card / UPI (Razorpay)
                          </label>
                        </div>

                        <div className="form-check text-muted">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            disabled
                          />
                          <label className="form-check-label">
                            Stripe (Coming soon)
                          </label>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isLoading || items.length === 0} // 🔥 Prevent empty order
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
