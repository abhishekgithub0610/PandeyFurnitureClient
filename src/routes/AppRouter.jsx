import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import NotFound from "../pages/auth/NotFound";
import OrderManagement from "../pages/order/OrderManagement";
import MenuItemManagement from "../pages/menu/MenuItemManagement";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/cart/Checkout";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResendConfirmation from "../pages/auth/ResendConfirmation";
import EmailConfirmed from "../pages/auth/EmailConfirmed";
import OrderConfirmation from "../pages/order/OrderConfirmation";
import ProfilePage from "../pages/profile/ProfilePage";
import { ROLES, ROUTES } from "../utility/constants";
import MenuItemDetails from "../pages/menu/menuItemDetails";
import RoleBasedRoutes from "./RoleBasedRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.LOGIN} element={<Login />} />
    <Route path={ROUTES.REGISTER} element={<Register />} />
    <Route path={ROUTES.MENU_DETAIL} element={<MenuItemDetails />} />
    <Route path={ROUTES.PROFILE_PAGE} element={<ProfilePage />} />
    <Route
      path={ROUTES.ORDER_MANAGEMENT}
      element={
        <RoleBasedRoutes>
          <OrderManagement />
        </RoleBasedRoutes>
      }
    />
    <Route
      path={ROUTES.MENU_MANAGEMENT}
      element={
        <RoleBasedRoutes allowedRoles={[ROLES.ADMIN]}>
          <MenuItemManagement />
        </RoleBasedRoutes>
      }
    />
    <Route
      path={ROUTES.CART}
      element={
        <RoleBasedRoutes>
          <Cart />
        </RoleBasedRoutes>
      }
    />
    <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
    <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
    <Route path="*" element={<NotFound />} />
    <Route path={ROUTES.EMAIL_CONFIRMED} element={<EmailConfirmed />} />
    <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path={ROUTES.RESEND_CONFIRMATION} element={<ResendConfirmation />} />
  </Routes>
);
export default AppRoutes;
