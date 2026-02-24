import { getUserInfoFromToken, isTokenExpired } from "../../utility/jwtUtility";
import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../utility/constants";
// // const getInitialAuthState = () => {
// //   const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
// //   const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
// //   //clear invalid token

// //   if (
// //     !storedToken ||
// //     storedToken === "undefined" ||
// //     storedToken === "null" ||
// //     isTokenExpired(storedToken)
// //   ) {
// //     localStorage.removeItem(STORAGE_KEYS.TOKEN);
// //     localStorage.removeItem(STORAGE_KEYS.USER);
// //     return {
// //       user: null,
// //       token: null,
// //       isAuthenticated: false,
// //     };
// //   }

// //   let user = null;
// //   if (storedUser && storedUser !== "undefined" && storedUser != "null") {
// //     try {
// //       user = JSON.parse(storedUser);
// //     } catch {
// //       // If user data is corrupted, extract from token
// //       user = getUserInfoFromToken(storedToken);
// //       if (user) {
// //         localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
// //       }
// //     }
// //   }

// //   return {
// //     user,
// //     token: storedToken,
// //     isAuthenticated: !!storedToken && !!user,
// //   };
// // };

const getInitialAuthState = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (!token || isTokenExpired(token)) {
    //localStorage.removeItem(STORAGE_KEYS.TOKEN);
    return {
      user: null,
      accessToken: "",
      isAuthenticated: false,
      isLoading: false,
    };
  }

  //pending (uncomment and use commented code)
  const user = getUserInfoFromToken(token);
  // const { data: user } = await dispatch(
  //   authApi.endpoints.getCurrentUser.initiate(),
  // );
  // pending ends
  return {
    user,
    accessToken: token,
    isAuthenticated: true,
    isLoading: false,
  };
};

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   accessToken: "",
//   //myfix
//   //isLoading: true, // used while checking session
//   isLoading: false, // used while checking session
//   //myfix ends
// };

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  // // initialState: { ...getInitialAuthState() },
  reducers: {
    setAuth: (state, action) => {
      //my code
      //const { user, accessToken } = action.payload;
      const { user, token } = action.payload;
      state.accessToken = token;
      //my code ends

      //state.user = action.payload;
      //my code
      // // state.isAuthenticated = true;
      //state.isAuthenticated = !!action.payload;
      state.user = user; // ✅ FIX
      state.isAuthenticated = !!token; // ✅ FIX
      state.isLoading = false;
      //my code ends
      //localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      //console.log("settinggggg");
      //console.log(action);
      //console.log(action.payload);
      //localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload);
    },
    // // setAuth: (state, action) => {
    // //   const { user, token } = action.payload;
    // //   state.user = user;
    // //   state.token = token;
    // //   state.isAuthenticated = !!(user && token);

    // //   if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    // //   if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    // // },
    // // logout: (state) => {
    // //   localStorage.removeItem(STORAGE_KEYS.TOKEN);
    // //   localStorage.removeItem(STORAGE_KEYS.USER);
    // //   state.user = null;
    // //   state.token = null;
    // //   state.isAuthenticated = false;
    // // },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// // export const { setAuth, logout } = authSlice.actions;
export const { setAuth, logout, setAuthLoading, setAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
