import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { useResetPasswordMutation } from "../../store/api/authApi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const isInvalidLink = !token || !email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isInvalidLink) {
      setError("Invalid or expired reset link.");
    }
  }, [isInvalidLink]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitted || isInvalidLink) return; // ✅ guard

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitted(true);

    try {
      const result = await resetPassword({
        email,
        token,
        newPassword,
      }).unwrap();

      if (result.isSuccess) {
        setSuccess("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        setError(result.errorMessages?.[0] || "Reset failed");
      }
    } catch (err) {
      setError(err?.data?.errorMessages?.[0] || "Reset failed");
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-card">
        <h2>Reset Password</h2>

        {error && <p className="reset-error">{error}</p>}
        {success && <p className="reset-success">{success}</p>}

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button disabled={loading || isInvalidLink}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
