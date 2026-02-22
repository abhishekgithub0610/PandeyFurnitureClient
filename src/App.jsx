import AppRoutes from "./routes/AppRouter";
import Header from "./components/layout/Header";
import { LoadScript } from "@react-google-maps/api";
import Footer from "./components/layout/Footer";
import { VITE_GOOGLE_MAPS_API_KEY } from "./utility/constants";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync, hydrateGuestCart } from "./store/slice/cartSlice";
function App() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const getThemeStyles = () => {
    if (theme === "dark") {
      return {
        background: `linear-gradient(135deg, #434343 0%, #000000 25%, #2d1b69 50%, #11998e 75%, #38ef7d 100%)`,
      };
    } else {
      return {
        background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #fef9d7 75%, #a8edea 100%)`,
      };
    }
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);
  // 🔥 NEW: Always fetch DB cart if user is logged in
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCartAsync());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (!accessToken) {
      const stored = JSON.parse(localStorage.getItem("cart-mango") || "[]");

      if (stored.length) {
        dispatch(hydrateGuestCart(stored));
      }
    }
  }, [accessToken, dispatch]);
  return (
    <LoadScript
      googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div
        className="d-flex flex-column min-vh-100 bg-body"
        style={getThemeStyles()}
      >
        <Header />
        <main className="flex-grow-1">
          <AppRoutes />
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </LoadScript>
  );
}

export default App;
