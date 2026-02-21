import { setAccessToken, logout, setAuth } from "@/store/slice/authSlice";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "@/utility/constants";
import { getUserInfoFromToken } from "@/utility/jwtUtility";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          dispatch(logout());
          return;
        }

        const data = await res.json();
        const token = data.result?.accessToken || data.accessToken;

        if (!token) {
          dispatch(logout());
          return;
        }

        const user = getUserInfoFromToken(token);
        dispatch(setAuth({ user, token }));
      } catch (err) {
        console.error("Auth restore error:", err);
        dispatch(logout());
      } finally {
        // 🔴 THIS WAS MISSING: Tell the app we are done checking the session
        setIsReady(true);
      }
    };
    restoreSession();
  }, [dispatch]);
  if (!isReady) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading session...</span>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthInitializer;

// const AuthInitializer = ({ children }) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const restoreSession = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
//           method: "POST",
//           credentials: "include",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           dispatch(setAccessToken(data.accessToken));
//         }
//       } catch {
//         // silent fail
//       }
//     };
//     restoreSession();
//   }, [dispatch]);
//   return children;
// };
// export default AuthInitializer;
