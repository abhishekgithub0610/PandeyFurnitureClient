import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "@/utility/constants";
import { setAccessToken } from "@/store/slice/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setAccessToken(data.accessToken));
        }
      } catch {
        // silent fail
      }
    };
    restoreSession();
  }, [dispatch]);
  return children;
};
export default AuthInitializer;
