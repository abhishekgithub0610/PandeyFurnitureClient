import { ROLES, ROUTES } from "../../utility/constants";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
// ✅ IMPORT resetCart
import { resetCart } from "../../store/slice/cartSlice";
import { toggleTheme } from "../../store/slice/themeSlice";
import {
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} from "../../store/api/authApi";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //my code
  // // const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );
  //my code ends

  const { totalItems } = useSelector((state) => state.cart);

  // const { data: user, isLoading } = useGetCurrentUserQuery();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (err) {
      console.error("Logout failed", err);
    }
    //my code
    // ✅ FIRST: clear auth state
    dispatch(logout());

    // ✅ SECOND: reset cart to 0 (Redux + localStorage cleared)
    dispatch(resetCart());

    // ✅ THIRD: navigate home
    navigate("/");
    //my code ends
  };

  if (isLoading) return null; // or a loader
  // // const handleLogout = () => {
  // //   dispatch(logout());
  // //   navigate(ROUTES.HOME);
  // // };

  return (
    <nav className="navbar navbar-expand-lg  border-bottom shadow-sm">
      <div className="container py-2">
        <NavLink
          to={ROUTES.HOME}
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <i className="bi bi-fire text-primary fs-4"></i>
          <span className="fw-bold">Pandey Furniture</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={ROUTES.ORDER_MANAGEMENT} className="nav-link">
                My Orders
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {/* Theme toggle visible for all users */}

            <li className="nav-item me-lg-2">
              <NavLink
                to={ROUTES.CART}
                className={`nav-link position-relative d-flex align-items-center justify-content-center bg-primary-subtle border-0 rounded-circle `}
                style={{ width: "44px", height: "44px" }}
              >
                <i className="bi bi-cart3 fs-5"></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white shadow-sm"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalItems > 0 ? totalItems : 0}
                </span>
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link d-flex align-items-center gap-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle fs-5 text-primary"></i>
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "120px" }}
                    >
                      Hello {user?.name?.split(" ")?.[0] || "User"}
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow border rounded-3 p-2 small"
                    style={{
                      minWidth: "220px",
                      zIndex: 1050,
                      "--bs-dropdown-link-active-bg":
                        "rgba(var(--bs-primary-rgb), .12)",
                      "--bs-dropdown-link-active-color": "var(--bs-body-color)",
                      "--bs-dropdown-link-hover-bg":
                        "rgba(var(--bs-primary-rgb), .08)",
                    }}
                  >
                    {/* Removed header (avatar/name/role) for a cleaner minimal dropdown */}
                    {user?.role == ROLES.ADMIN && (
                      <>
                        <li>
                          <NavLink
                            to={ROUTES.ORDER_MANAGEMENT}
                            className="dropdown-item d-flex align-items-center gap-2 rounded-2"
                          >
                            <i className="bi bi-speedometer2 text-primary"></i>
                            <span>Order Management</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={ROUTES.MENU_MANAGEMENT}
                            className="dropdown-item d-flex align-items-center gap-2 rounded-2"
                          >
                            <i className="bi bi-list-ul text-primary"></i>
                            <span>Menu Management</span>
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider my-2" />
                        </li>
                      </>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item d-flex align-items-center gap-2 text-danger rounded-2"
                      >
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to={ROUTES.LOGIN} className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={ROUTES.REGISTER} className="nav-link">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item me-lg-2">
              <button
                type="button"
                className="nav-link btn btn-link d-flex align-items-center p-0"
                onClick={() => dispatch(toggleTheme())}
              >
                <i className="bi bi-moon-stars fs-5"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
