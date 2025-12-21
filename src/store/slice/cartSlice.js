import { createSlice } from "@reduxjs/toolkit";
const STORAGE_KEY_CART = "cart-mango";
const getStoredCart = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEY_CART);
    const parsed = cart ? JSON.parse(cart) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY_CART);
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
  } catch (error) {
    //myfix
    //   catch  {
    //myfix ends
    console.warn("Failed to save cart:", error);
  }
};

const calculateTotals = (items = []) => {
  let totalItems = 0;
  let totalAmount = 0;

  for (const item of items) {
    totalItems += item.quantity;
    totalAmount += item.price * item.quantity;
  }

  return { totalItems, totalAmount };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getStoredCart() || [],
    ...calculateTotals(getStoredCart()),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) item.quantity = quantity;
      }

      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.removeItem(STORAGE_KEY_CART);
    },
  },
});

export const { addToCart, clearCart, updateQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
