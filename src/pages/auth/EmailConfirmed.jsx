import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utility/constants";

function EmailConfirmed() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>

        <h2 style={styles.title}>Email Confirmed</h2>

        <p style={styles.message}>
          Your email has been successfully verified.
          <br />
          You can now log in to your Pandey Furniture account.
        </p>

        <button style={styles.button} onClick={() => navigate(ROUTES.LOGIN)}>
          Go to Login
        </button>
      </div>
    </div>
  );
}
const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #f4f6f8, #e8ecf1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  title: {
    marginBottom: "10px",
    color: "#2c3e50",
  },
  message: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  button: {
    backgroundColor: "#27ae60",
    border: "none",
    padding: "12px 20px",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px",
    width: "100%",
  },
};

export default EmailConfirmed;
