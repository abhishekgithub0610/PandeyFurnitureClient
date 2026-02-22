import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../../store/api/menuItemApi";
import { useState, useEffect } from "react";
import {
  API_BASE_URL,
  ROUTES,
  DESCRIPTION_LIMIT,
} from "../../utility/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// 🔥 NEW IMPORTS
import { addToCartGuest, addToCartAsync } from "../../store/slice/cartSlice";
import { useSelector } from "react-redux";
import Rating from "../../components/ui/Rating";
function MenuItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);

  const navigate = useNavigate();
  const itemId = parseInt(id);
  const isValidItemId = !isNaN(itemId) && itemId > 0;
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);

  // ✅ Fetch product
  const {
    data: selectedMenuItem,
    isLoading,
    error,
  } = useGetMenuItemByIdQuery(itemId, {
    skip: !isValidItemId,
  });

  // ✅ Find if already in cart (AFTER product loaded)
  const existingCartItem = selectedMenuItem
    ? cartItems.find(
        (item) =>
          item.menuItemId === selectedMenuItem.id ||
          item.id === selectedMenuItem.id,
      )
    : null;

  // ✅ If already in cart → preload quantity
  useEffect(() => {
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    }
  }, [existingCartItem]);

  // ✅ Add to cart handler
  const handleAddToCart = async () => {
    if (!selectedMenuItem) return;

    // 🚫 Stock validation
    if (quantity > selectedMenuItem.quantity) {
      toast.error("Not enough stock available");
      return;
    }

    try {
      if (accessToken) {
        await dispatch(
          addToCartAsync({
            menuItemId: selectedMenuItem.id,
            quantity,
          }),
        ).unwrap();
      } else {
        dispatch(
          addToCartGuest({
            id: selectedMenuItem.id,
            name: selectedMenuItem.name,
            price: selectedMenuItem.price,
            image: selectedMenuItem.image,
            quantity,
          }),
        );
      }

      toast.success(`${selectedMenuItem.name} added to cart!`);

      // ✅ NEW: Auto redirect to cart after add
      setTimeout(() => {
        navigate(ROUTES.CART);
      }, 800);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const handleNotify = (id) => {
    // dispatch(
    //   addToCart({
    //     id: item.id,
    //     name: item.name,
    //     price: item.price,
    //     image: item.image,
    //     quantity: 1,
    //   })
    // );
    toast.success(`We will notify you when the item is back in stock!`);
  };

  if (!isValidItemId) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Invalid Menu Item ID</h4>
          <p>
            The menu item ID provided is not valid. Please check the URL and try
            again.
          </p>
          <button className="btn btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading menu item...</p>
      </div>
    );
  }

  if (error || !selectedMenuItem) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Error Loading Menu Item</h4>
          <p>
            Menu item not found. It may have been removed or the ID is
            incorrect.
          </p>
          <button className="btn btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  // ========================
  // UI HELPERS
  // ========================

  const isOutOfStock = selectedMenuItem.quantity < 1;
  const maxAllowed = selectedMenuItem.quantity;

  const description = selectedMenuItem.description || "";
  const isLong = description.length > DESCRIPTION_LIMIT;
  const visibleText = expanded
    ? description
    : description.slice(0, DESCRIPTION_LIMIT);
  //my code

  const productUrl = `${window.location.origin}${ROUTES.MENU_DETAIL.replace(
    ":id",
    selectedMenuItem.id,
  )}`;

  const shareText = encodeURIComponent(
    `Check out this product:\n${selectedMenuItem.name}\nPrice: $${selectedMenuItem.price}\n`,
  );

  const whatsappShareUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(
    productUrl,
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    productUrl,
  )}`;

  //my code ends
  return (
    <>
      <div className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-house-door me-1"></i>Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">
                Menu
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {selectedMenuItem.name}
            </li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Product Image */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="rounded-4 overflow-hidden shadow-lg border bg-body position-relative">
                <img
                  className="img-fluid"
                  src={`${API_BASE_URL}/${selectedMenuItem.image}`}
                  style={{
                    height: "500px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/100";
                  }}
                />
                {selectedMenuItem.specialTag && (
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-warning px-3 py-2 rounded-pill shadow-sm fs-6">
                      {selectedMenuItem.specialTag}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <div className="h-100 d-flex flex-column">
              {/* Header Section */}
              <div className="mb-4">
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div>
                    <h1 className="display-6 fw-bold mb-2 ">
                      {selectedMenuItem.name}
                    </h1>
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-3 py-2 fs-6">
                        {selectedMenuItem.category}
                      </span>

                      {isOutOfStock ? (
                        <span className="text-danger small fw-semibold">
                          <i className="bi bi-x-circle-fill me-1"></i>
                          Out of Stock
                        </span>
                      ) : (
                        <span className="text-success small fw-semibold">
                          <i className="bi bi-check-circle-fill me-1"></i>
                          Available
                        </span>
                      )}
                      {/* <span className="text-success small fw-semibold">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Available
                      </span> */}
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="h2 text-primary fw-bold mb-0">
                      ${selectedMenuItem.price.toFixed(2)}
                    </div>
                    {/* my code */}
                    {/* Share Buttons */}
                    <div className="mt-3 d-flex align-items-center gap-2">
                      <span className="text-muted small fw-semibold">
                        Share:
                      </span>

                      {/* WhatsApp */}
                      <a
                        href={whatsappShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success btn-sm rounded-circle"
                        title="Share on WhatsApp"
                      >
                        <i className="bi bi-whatsapp"></i>
                      </a>

                      {/* Facebook */}
                      <a
                        href={facebookShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm rounded-circle"
                        title="Share on Facebook"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>

                      {/* Instagram (Copy link) */}
                      <button
                        className="btn btn-danger btn-sm rounded-circle"
                        title="Copy link for Instagram"
                        onClick={() => {
                          navigator.clipboard.writeText(productUrl);
                          toast.success(
                            "Product link copied! Paste it on Instagram 📸",
                          );
                        }}
                      >
                        <i className="bi bi-instagram"></i>
                      </button>
                    </div>
                    {/* my code ends */}
                  </div>
                </div>
                {selectedMenuItem.rating > 0 && (
                  <div className="d-flex align-items-center">
                    <Rating value={selectedMenuItem.rating} size="small" />
                    <span className="ms-1 text-muted small fw-semibold">
                      {selectedMenuItem.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {/* <div className="mb-4">
                <h5 className="fw-semibold mb-3 text-muted small text-uppercase">
                  Description
                </h5>
                <p
                  className="text-muted lead mb-0"
                  style={{ lineHeight: "1.6" }}
                >
                  {selectedMenuItem.description}
                </p>
              </div> */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3 text-muted small text-uppercase">
                  Description
                </h5>

                <p
                  className="text-muted lead mb-1"
                  style={{ lineHeight: "1.6" }}
                >
                  {visibleText}
                  {!expanded && isLong && "..."}
                </p>

                {isLong && (
                  <button
                    className="btn btn-link p-0 fw-semibold"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              {/* Add to Cart Section */}
              <div className="mt-auto">
                <div className="card border-0">
                  <div className="card-body p-4">
                    <div className="row g-3 align-items-end">
                      {/* QUANTITY */}
                      <div className="mt-4">
                        <label className="form-label">Quantity</label>
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary"
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(quantity - 1)}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            className="form-control text-center"
                            value={quantity}
                            min="1"
                            max={maxAllowed}
                            onChange={(e) =>
                              setQuantity(
                                Math.max(
                                  1,
                                  Math.min(
                                    maxAllowed,
                                    parseInt(e.target.value) || 1,
                                  ),
                                ),
                              )
                            }
                          />

                          <button
                            className="btn btn-outline-secondary"
                            disabled={quantity >= maxAllowed}
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* ADD BUTTON */}
                      <div className="mt-4">
                        {isOutOfStock ? (
                          <div className="alert alert-danger">Out of stock</div>
                        ) : (
                          <button
                            className="btn btn-primary btn-lg w-100"
                            onClick={handleAddToCart}
                            disabled={cartStatus === "loading"}
                          >
                            {cartStatus === "loading"
                              ? "Adding..."
                              : existingCartItem
                                ? "Update Cart"
                                : "Add to Cart"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="row g-3 mt-3">
                  <div className="col-md-6">
                    <div className="card border-0 bg-success-subtle">
                      <div className="card-body p-3 text-center">
                        <i
                          className="bi bi-clock text-success mb-2 d-block"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <small className="fw-semibold text-success">
                          Ready in 15-20 mins
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-info-subtle">
                      <div className="card-body p-3 text-center">
                        <i
                          className="bi bi-geo-alt text-info mb-2 d-block"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <small className="fw-semibold text-info">
                          Free Pickup
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Card */}
        <div className="row mt-5">
          <div className="col">
            <div className="card border shadow-sm">
              <div className="card-header bg-primary-subtle">
                <h5 className="fw-bold mb-0 text-primary">
                  <i className="bi bi-info-circle me-2"></i>
                  Product Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4 text-center">
                  <div className="col-lg-3 col-md-6">
                    <div className="border-end border-light-subtle pe-3">
                      <i
                        className="bi bi-tag text-secondary mb-2 d-block"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div className="text-muted text-uppercase fw-semibold small mb-1">
                        Category
                      </div>
                      <div className="fw-semibold">
                        {selectedMenuItem.category}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="border-end border-light-subtle pe-3">
                      <i
                        className="bi bi-star text-warning mb-2 d-block"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div className="text-muted text-uppercase fw-semibold small mb-1">
                        Special Tag
                      </div>
                      <div className="fw-semibold">
                        {selectedMenuItem.specialTag}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="border-end border-light-subtle pe-3">
                      <i
                        className="bi bi-currency-dollar text-success mb-2 d-block"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div className="text-muted text-uppercase fw-semibold small mb-1">
                        Price
                      </div>
                      <div className="text-primary fw-bold">
                        ${selectedMenuItem.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <i
                      className="bi bi-check-circle text-success mb-2 d-block"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <div className="text-muted text-uppercase fw-semibold small mb-1">
                      Availability
                    </div>
                    <div
                      className={`fw-semibold ${
                        isOutOfStock ? "text-danger" : "text-success"
                      }`}
                    >
                      {isOutOfStock ? "Out of Stock" : "In Stock"}
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuItemDetails;
