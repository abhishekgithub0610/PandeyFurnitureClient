import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthInitializer from "./auth/AuthInitializer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthInitializer>
    </Provider>
  </StrictMode>
);
