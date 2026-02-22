import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../utility/constants";
// 🔥 ADD THIS
import { apiFetch } from "../../utility/apiFetch";
const STORAGE_KEY_CART = "cart-mango";

/* =========================================================
   🟢 LOCAL STORAGE HELPERS (Guest Only)
========================================================= */

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

/* =========================================================
   🔵 ASYNC THUNKS (LOGGED-IN USERS → DB)
========================================================= */

// ➕ ADD ITEM (DB)
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ menuItemId, quantity }, { rejectWithValue, getState }) => {
    try {
      // ✅ GET TOKEN FROM REDUX
      const token = getState().auth?.accessToken;

      const response = await apiFetch(
        "/api/cart/add",
        {
          method: "POST",
          body: JSON.stringify({ menuItemId, quantity }),
        },
        token, // ✅ PASS TOKEN HERE
      );

      if (!response.ok) throw new Error("Failed to add item");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ➕ UPDATE QUANTITY (DB)  🔥 NEW
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async ({ menuItemId, quantity }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.accessToken;

      const response = await apiFetch(
        "/api/cart/update",
        {
          method: "PUT",
          body: JSON.stringify({ menuItemId, quantity }),
        },
        token,
      );

      if (!response.ok) throw new Error("Failed to update quantity");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ➕ REMOVE ITEM (DB) 🔥 NEW
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (menuItemId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.accessToken;

      const response = await apiFetch(
        `/api/cart/remove/${menuItemId}`,
        { method: "DELETE" },
        token,
      );

      if (!response.ok) throw new Error("Failed to remove item");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ➕ CLEAR CART (DB) 🔥 NEW
export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.accessToken;

      const response = await apiFetch(
        "/api/cart/clear",
        { method: "DELETE" },
        token,
      );

      if (!response.ok) throw new Error("Failed to clear cart");

      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ➕ FETCH FULL CART
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.accessToken;

      const response = await apiFetch("/api/cart", {}, token);

      if (!response.ok) throw new Error("Failed to fetch cart");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ➕ MERGE GUEST CART AFTER LOGIN (NEW)
export const mergeCartAsync = createAsyncThunk(
  "cart/mergeCartAsync",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.accessToken;

      // 🔥 Get guest cart from localStorage
      const guestCart = getStoredCart();

      if (!guestCart.length) return { items: [] };

      // 🔥 Convert to backend DTO format
      const mergePayload = {
        items: guestCart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await apiFetch(
        "/api/cart/merge",
        {
          method: "POST",
          body: JSON.stringify(mergePayload),
        },
        token,
      );

      if (!response.ok) throw new Error("Failed to merge cart");

      const data = await response.json();

      // 🔥 Clear guest localStorage AFTER successful merge
      localStorage.removeItem(STORAGE_KEY_CART);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
/* =========================================================
   🟣 SLICE
========================================================= */

//const initialItems = getStoredCart();

// 🔥 CHANGE: Do NOT automatically trust localStorage
// We start empty and decide later based on auth state
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // 🔥 Start empty always
    totalItems: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  },

  reducers: {
    /* =========================================================
       🟢 GUEST CART LOGIC (LOCAL STORAGE)
    ========================================================= */

    addToCartGuest: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      // 🔥 SAFER quantity handling
      const qty = Math.max(1, Number(action.payload.quantity) || 1);

      if (existingItem) {
        existingItem.quantity += qty;
      } else {
        state.items.push({
          ...action.payload,
          quantity: qty,
        });
      }

      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    updateQuantityGuest: (state, action) => {
      const { id, quantity } = action.payload;

      // 🔥 SAFE quantity conversion
      const qty = Math.max(1, Number(quantity) || 1);

      const item = state.items.find((item) => item.id === id);
      if (item) item.quantity = qty;

      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    removeFromCartGuest: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    clearCartGuest: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.removeItem(STORAGE_KEY_CART);
    },
    // ✅ NEW: Reset cart completely (used on logout)
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      state.loading = false;
      state.error = null;

      // ✅ Remove guest cart storage
      localStorage.removeItem(STORAGE_KEY_CART);
    },
    // 🔥 NEW: Hydrate guest cart from localStorage (clean load)
    hydrateGuestCart: (state, action) => {
      state.items = action.payload || [];
      Object.assign(state, calculateTotals(state.items));
    },
  },

  /* =========================================================
     🔵 BACKEND HANDLING (LOGGED-IN USERS)
  ========================================================= */

  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;

          // 🔥 CHANGE:
          // Always normalize backend response safely
          const backendItems = action.payload?.items || action.payload || [];

          state.items = Array.isArray(backendItems) ? backendItems : [];

          Object.assign(state, calculateTotals(state.items));
        },
      );
  },
});

export const {
  addToCartGuest,
  updateQuantityGuest,
  removeFromCartGuest,
  clearCartGuest,
  resetCart,
  hydrateGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_BASE_URL } from "../../utility/constants";

// const STORAGE_KEY_CART = "cart-mango";

// /* =========================================================
//    🟢 LOCAL STORAGE HELPERS (Guest Only)
// ========================================================= */

// const getStoredCart = () => {
//   try {
//     const cart = localStorage.getItem(STORAGE_KEY_CART);
//     const parsed = cart ? JSON.parse(cart) : [];
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     localStorage.removeItem(STORAGE_KEY_CART);
//     return [];
//   }
// };

// const saveCart = (items) => {
//   try {
//     localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(items));
//   } catch (error) {
//     console.warn("Failed to save cart:", error);
//   }
// };

// const calculateTotals = (items = []) => {
//   let totalItems = 0;
//   let totalAmount = 0;

//   for (const item of items) {
//     totalItems += item.quantity;
//     totalAmount += item.price * item.quantity;
//   }

//   return { totalItems, totalAmount };
// };

// /* =========================================================
//    🔵 NEW: ASYNC THUNKS FOR LOGGED-IN USERS (DB STORAGE)
// ========================================================= */

// // ➕ NEW: Add to cart (DB)
// export const addToCartAsync = createAsyncThunk(
//   "cart/addToCartAsync",
//   async ({ menuItemId, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
//         method: "POST",
//         credentials: "include", // IMPORTANT: required for cookie (GuestCartId / Auth)
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ menuItemId, quantity }),
//       });

//       if (!response.ok) throw new Error("Failed to add item");

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// // ➕ NEW: Fetch full cart from backend (on login or refresh)
// export const fetchCartAsync = createAsyncThunk(
//   "cart/fetchCartAsync",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/cart`, {
//         credentials: "include",
//       });

//       if (!response.ok) throw new Error("Failed to fetch cart");

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// /* =========================================================
//    🟣 SLICE
// ========================================================= */

// const initialItems = getStoredCart();

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: initialItems,
//     ...calculateTotals(initialItems),
//     loading: false, // ➕ NEW: loading state
//     error: null, // ➕ NEW: error state
//   },

//   reducers: {
//     /* =========================================================
//        🟢 GUEST CART LOGIC (LOCAL STORAGE ONLY)
//        This reducer is ONLY used if user NOT logged in
//     ========================================================= */
//     addToCartGuest: (state, action) => {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id,
//       );

//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity || 1;
//       } else {
//         state.items.push({
//           ...action.payload,
//           quantity: action.payload.quantity || 1,
//         });
//       }

//       Object.assign(state, calculateTotals(state.items));
//       saveCart(state.items); // 🟢 Save only for guest
//     },

//     removeFromCartGuest: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);

//       Object.assign(state, calculateTotals(state.items));
//       saveCart(state.items);
//     },

//     updateQuantityGuest: (state, action) => {
//       const { id, quantity } = action.payload;

//       if (quantity <= 0) {
//         state.items = state.items.filter((item) => item.id !== id);
//       } else {
//         const item = state.items.find((item) => item.id === id);
//         if (item) item.quantity = quantity;
//       }

//       Object.assign(state, calculateTotals(state.items));
//       saveCart(state.items);
//     },

//     clearCart: (state) => {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalItems = 0;

//       localStorage.removeItem(STORAGE_KEY_CART); // 🟢 guest clear
//     },
//   },

//   /* =========================================================
//      🔵 HANDLE BACKEND CART (LOGGED IN USERS)
//   ========================================================= */
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         state.loading = false;

//         // 🔵 Replace state with backend cart response
//         state.items = action.payload?.items || [];
//         Object.assign(state, calculateTotals(state.items));
//       })
//       .addCase(addToCartAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchCartAsync.fulfilled, (state, action) => {
//         state.items = action.payload?.items || [];
//         Object.assign(state, calculateTotals(state.items));
//       });
//   },
// });

// export const {
//   addToCartGuest,
//   removeFromCartGuest,
//   updateQuantityGuest,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;
