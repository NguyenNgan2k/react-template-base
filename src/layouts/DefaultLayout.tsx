import { ModePriceBoardProvider } from "@/context/ModePriceBoardContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SessionExpiredModal from "./notification/SessionExpired";
import { WindowContextProvider } from "../context/WindowContext";
import QuickOrder from "../features/priceboard/components/quick-order";
import { useAnimationDelay } from "../hooks/useAnimationDelay";
import { useIdleLogout } from "../hooks/useIdleLogout";
import { usePrevious } from "../hooks/usePrevious";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { logout } from "../store/slices/auth/slice";
import { selectQuickOrderSymbol } from "../store/slices/priceboard/selector";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { selectUserData } from "@/features/auth/login/redux/loginSlice";
import { fetchStockListRequest } from "@/features/stock/redux/stockSlice";

export default function DefaultLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const quickOrderSymbol = useAppSelector(selectQuickOrderSymbol);
  const { isVisible, isAnimating, open, close } = useAnimationDelay();
  const preQuickOrderSymbol = usePrevious(quickOrderSymbol);
  const userData = useAppSelector(selectUserData);

  //auto logout sau 60 phút
  useIdleLogout(() => {
    dispatch(logout());
    navigate("/login");
  });

  // Lấy list mã chứng khoán
  useEffect(() => {
    dispatch(fetchStockListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!userData || !quickOrderSymbol) return;
    open();
  }, [userData, quickOrderSymbol, preQuickOrderSymbol]);

  return (
    <WindowContextProvider>
      <div
        className="h-[calc(var(--app-height))] overflow-hidden bg-background-primary text-text-base"
      >
        <Header />
        <ModePriceBoardProvider>
          <motion.div
            className="flex flex-col w-full overflow-hidden h-[calc(var(--app-height)-72px)]"
            layout
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
              restDelta: 0.001,
            }}
          >
            <main className="flex-1 w-full relative">
              <Outlet />
              {isVisible && (
                <QuickOrder onClose={close} isAnimating={isAnimating} />
              )}
            </main>
            <SessionExpiredModal />
          </motion.div>
        </ModePriceBoardProvider>
        <Footer />
      </div>
    </WindowContextProvider>
  );
}
