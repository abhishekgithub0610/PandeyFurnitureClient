import { ROLES, ROUTES } from "../../utility/constants";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../store/api/authApi";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ROLES.CUSTOMER,
  });

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    try {
      const result = await registerUser(registerData).unwrap();
      if (result.isSuccess) {
        toast.success("Registration successful! Please login to continue.");
        navigate(ROUTES.LOGIN);
      } else {
        toast.error(result.errorMessages?.[0] || "Registration failed");
      }
    } catch (error) {
      toast.error(error.data?.errorMessages?.[0] || "Registration failed");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row g-5 align-items-center justify-content-center">
          {/* Marketing Panel */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className="text-center px-4">
              <div className="mb-4">
                <i
                  className="bi bi-stars text-primary"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h2 className="fw-bold mb-3">Join MangoFusion</h2>
              <p className="text-muted mb-4">
                Create your account to discover fresh dishes and manage your
                orders.
              </p>
              <div className="text-start mx-auto" style={{ maxWidth: "360px" }}>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Personalized experience</span>
                </div>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Save favorites & re-order</span>
                </div>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Exclusive offers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-lg-6 col-xl-5">
            <div className="border rounded-4 shadow-sm p-4 p-lg-5  bg-body-tertiary">
              <div className="mb-4 text-center">
                <h3 className="fw-bold mb-1">Create Account</h3>
                <p className="text-muted small mb-0">Sign up to get started</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>

                <div className="row g-2 mb-2">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-uppercase text-muted">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value={ROLES.CUSTOMER}>{ROLES.CUSTOMER}</option>
                    <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Creating...{" "}
                    </>
                  ) : (
                    <>Create Account</>
                  )}
                </button>
              </form>
              <div className="text-center small">
                <span className="text-muted">Already have an account? </span>
                <Link to={ROUTES.LOGIN} className="fw-semibold">
                  Sign in
                </Link>
              </div>
              <div className="text-center mt-3 small">
                <Link to={ROUTES.HOME} className="text-decoration-none">
                  <i className="bi bi-arrow-left me-1"></i>Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
