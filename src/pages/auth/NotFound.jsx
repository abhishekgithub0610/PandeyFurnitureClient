import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "70vh" }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h3 className="mb-3">Page Not Found</h3>

      <p className="text-muted mb-4">
        Oops! The furniture you’re looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="btn btn-dark px-4 py-2">
        🛋️ Back to PandeyFurniture Home
      </Link>
    </div>
  );
};

export default NotFound;
