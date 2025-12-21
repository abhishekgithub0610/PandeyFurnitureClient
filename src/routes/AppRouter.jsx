import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import OrderManagement from "../pages/order/OrderManagement";
import MenuItemManagement from "../pages/menu/MenuItemManagement";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/cart/Checkout";
import Register from "../pages/auth/Register";
import OrderConfirmation from "../pages/order/OrderConfirmation";
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
  </Routes>
);
export default AppRoutes;
