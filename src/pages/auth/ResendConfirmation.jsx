import { useState } from "react";
import { useResendConfirmationMutation } from "../../store/api/authApi"; // ✅ Added
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utility/constants";

function ResendConfirmation() {
  const [email, setEmail] = useState("");

  // ✅ Using new mutation
  const [resendConfirmation, { isLoading }] = useResendConfirmationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      // ✅ Always generic response (security-safe)
      await resendConfirmation({ email }).unwrap();

      toast.success(
        "If an account exists, a confirmation email has been sent.",
      );

      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
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
          <i className="bi bi-envelope-check text-primary fs-1 mb-2"></i>
          <h3 className="fw-bold mb-1">Resend Confirmation Email</h3>
          <p className="text-muted">
            Enter your registered email to receive a new confirmation link
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
              "Send Confirmation Link"
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

export default ResendConfirmation;
