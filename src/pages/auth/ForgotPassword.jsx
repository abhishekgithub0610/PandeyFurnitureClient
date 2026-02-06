import { useState } from "react";
import { useForgotPasswordMutation } from "../../store/api/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utility/constants";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      toast.success(
        "If an account exists, a reset link has been sent to your email."
      );
      setEmail("");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-primary bg-opacity-10">
      <div
        className="card border-0 shadow-lg rounded-4 p-4 p-md-5"
        style={{ maxWidth: "560px", width: "100%" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-shield-lock text-primary fs-1 mb-2"></i>
          <h3 className="fw-bold mb-1">Forgot Password</h3>
          <p className="text-muted">
            Enter your registered email to receive a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email address</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <Link to={ROUTES.LOGIN} className="text-decoration-none small">
            <i className="bi bi-arrow-left me-1"></i>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
