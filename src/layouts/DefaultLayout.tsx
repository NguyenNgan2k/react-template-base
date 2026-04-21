import { ModePriceBoardProvider } from "@/context/ModePriceBoardContext";
import { selectUserData } from "@/features/auth/login/redux/loginSlice";
import { fetchStockListRequest } from "@/features/stock/redux/stockSlice";
import { socketClient } from "@/networks/socket";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { WindowContextProvider } from "../context/WindowContext";
import QuickOrder from "../features/priceboard/components/quick-order";
import { useAnimationDelay } from "../hooks/useAnimationDelay";
import { useIdleLogout } from "../hooks/useIdleLogout";
import { usePrevious } from "../hooks/usePrevious";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { logout } from "../store/slices/auth/slice";
import { selectQuickOrderSymbol } from "../store/slices/priceboard/selector";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import SessionExpiredModal from "./notification/SessionExpired";

export default function DefaultLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const quickOrderSymbol = useAppSelector(selectQuickOrderSymbol);
  const { isVisible, isAnimating, open, close } = useAnimationDelay();
  const preQuickOrderSymbol = usePrevious(quickOrderSymbol);
  const userData = useAppSelector(selectUserData);

  const preUserData = usePrevious(userData);

  //auto logout sau 60 phút
  useIdleLogout(() => {
    dispatch(logout());
    navigate("/login");
  });

  // Lấy list mã chứng khoán
  useEffect(() => {
    dispatch(fetchStockListRequest());
  }, []);

  useEffect(() => {
    if (!userData || !quickOrderSymbol) return;
    open();
  }, [userData, quickOrderSymbol, preQuickOrderSymbol]);

  //TODO: connect socket
  useEffect(() => {
    if (!userData || userData === preUserData) return;
    socketClient.connect();
  }, [userData]);

  return (
    <WindowContextProvider>
      <div className="h-[calc(var(--app-height))] overflow-hidden bg-background-primary text-text-base">
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
