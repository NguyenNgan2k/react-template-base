import { useAppDispatch } from "@/store/hook";
import { openLoginModal } from "@/store/slices/client/slice";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("USER_DATA_KEY");
  console.log("isAuthenticated", isAuthenticated, localStorage.getItem("USER_DATA_KEY"));

  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      localStorage.setItem("direct", location.pathname);
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/price-board" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
