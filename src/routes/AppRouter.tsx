import LoadingSpinner from "@/components/common/LoadingSpinner";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import MainLayout from "../layouts/DefaultLayout";

const NotFoundPage = lazy(() => import("../layouts/NotFound"));
const LoginPage = lazy(() => import("@/features/auth/login/ui/LoginPage"));
const OrderBookPage = lazy(
  () => import("@/features/orderBook/ui/OrderBookPage"),
);
const PutthroughLayout = lazy(
  () => import("@/features/putThrough/ui/PutthroughLayout"),
);
const PutthroughPage = lazy(
  () => import("@/features/putThrough/ui/putThrough/PutthroughPage"),
);
const AdvertisementPage = lazy(
  () => import("@/features/putThrough/ui/advertisement/AdvertisementPage"),
);
const PriceBoardPage = lazy(() => import("@/features/priceboard"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Public routes */}
          <Route element={<MainLayout />}></Route>
          {/* Protected routes  */}
          <Route element={<MainLayout />}>
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/price-board" element={<PriceBoardPage />} />
            <Route path="/order-book" element={<OrderBookPage />} />
            <Route path="/putthrough" element={<PutthroughLayout />}>
              <Route index element={<Navigate to="putthrough" replace />} />
              <Route path="putthrough" element={<PutthroughPage />} />
              <Route path="advertisement" element={<AdvertisementPage />} />
            </Route>
          </Route>
          {/* </Route> */}
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Tooltip
          id="global-tooltip"
          className="text-white! text-[10px]! lg:text-xs! px-2! py-1! rounded!"
        />
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
}
