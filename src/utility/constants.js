export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  CHECKOUT: "/checkout",
  MENU_DETAIL: "/menu/:id",
  ORDER_CONFIRMATION: "/order-confirmation",
  MENU_MANAGEMENT: "/menu-management",
  ORDER_MANAGEMENT: "/order-management",
  EMAIL_CONFIRMED: "/email-confirmed",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE_PAGE: "/profile",
};

export const API_BASE_URL = "https://localhost:7188";
export const DESCRIPTION_LIMIT = 100;
export const VITE_GOOGLE_MAPS_API_KEY =
  "AIzaSyBOTXDsNYyBJ2AzGfPEjk7ZaXwVxFphNuU";

export const CATEGORY = [
  "Living Room",
  "Bedroom",
  "Office",
  "Dining",
  "Storage",
];

export const ROLES = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
};

export const SPECIAL_TAG = [
  "",
  "Best Seller",
  "Top Rated",
  "Chef's Special",
  "New",
];

export const STORAGE_KEYS = {
  TOKEN: "token-mango",
  USER: "user-mango",
};

export const ORDER_STATUS = {
  CONFIRMED: "Confirmed",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS.CONFIRMED,
    label: ORDER_STATUS.CONFIRMED,
    color: "warning",
  },
  {
    value: ORDER_STATUS.READY_FOR_PICKUP,
    label: ORDER_STATUS.READY_FOR_PICKUP,
    color: "info",
  },
  {
    value: ORDER_STATUS.COMPLETED,
    label: ORDER_STATUS.COMPLETED,
    color: "success",
  },
  {
    value: ORDER_STATUS.CANCELLED,
    label: ORDER_STATUS.CANCELLED,
    color: "danger",
  },
];
