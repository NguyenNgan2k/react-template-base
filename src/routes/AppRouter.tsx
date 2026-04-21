import LoadingSpinner from "@/components/common/LoadingSpinner";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import MainLayout from "../layouts/DefaultLayout";


const NotFoundPage = lazy(() => import("../layouts/NotFound"));
const LoginPage = lazy(() => import("@/features/auth/login/ui/LoginPage"));
const OrderBookPage = lazy(() => import("@/features/order-book/ui/OrderBookPage"));
const PutthroughLayout = lazy(() => import("@/features/putthrough/ui/PutthroughLayout"));
const PutthroughPage = lazy(() => import("@/features/putthrough/ui/putthrough/PutthroughPage"));
const AdvertisementPage = lazy(() => import("@/features/putthrough/ui/advertisement/AdvertisementPage"));
const AccountPage = lazy(() => import("@/features/account/ui/AccountPage"));
const MsgSessionPage = lazy(() => import("@/features/msg-session/ui/MsgSessionPage"));
const SummaryLayout = lazy(() => import("@/features/summary/ui/SummaryLayout"));
const TransactionSummaryPage = lazy(() => import("@/features/summary/ui/transaction-summary/TransactionSummaryPage"));
const StockSummaryPage = lazy(() => import("@/features/summary/ui/stock-summary/StockSummaryPage"));
const StockListLayout = lazy(() => import("@/features/stock_list/ui/StockListLayout"));
const TradingPage = lazy(() => import("@/features/stock_list/ui/trading/TradingPage"));
const HaltPage = lazy(() => import("@/features/stock_list/ui/halt/HaltPage"));
const AccountManagementLayout = lazy(() => import("@/features/account-mgmt/ui/AccountManagementLayout"));
const AbnormalLimitPage = lazy(() => import("@/features/account-mgmt/ui/abnormal-limit/AbnormalLimitPage"));
const AccountFilterPage = lazy(() => import("@/features/account-mgmt/ui/account-filter/AccountFilterPage"));
const CollateralAssetsPage = lazy(() => import("@/features/account-mgmt/ui/collateral-assets/CollateralAssetsPage"));
const LoanableSecuritiesPage = lazy(() => import("@/features/account-mgmt/ui/loanable-securities/LoanableSecuritiesPage"));
const MarginAccountPage = lazy(() => import("@/features/account-mgmt/ui/margin-account/MarginAccountPage"));
const RegularAccountPage = lazy(() => import("@/features/account-mgmt/ui/regular-account/RegularAccountPage"));
const ResourceManagementPage = lazy(() => import("@/features/account-mgmt/ui/resource-management/ResourceManagementPage"));
const StockOwnershipPage = lazy(() => import("@/features/account-mgmt/ui/stock-ownership/StockOwnershipPage"));
const UbViolationPage = lazy(() => import("@/features/account-mgmt/ui/ub-violation/UbViolationPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Public routes */}
          <Route element={<MainLayout />}>
          </Route>
          {/* Protected routes  */}
          <Route element={<MainLayout />}>
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/price-board" element={<div>Priceboard</div>} />
            <Route path="/order-book" element={<OrderBookPage />} />
            <Route path="/putthrough" element={<PutthroughLayout />} >
              <Route index element={<Navigate to="putthrough" replace />} />
              <Route path="putthrough" element={<PutthroughPage />} />
              <Route path="advertisement" element={<AdvertisementPage />} />
            </Route>
            <Route path="/customer" element={<AccountPage />} />
            <Route path="/message-session" element={<MsgSessionPage />} />
            <Route path="/summary" element={<SummaryLayout />}>
              <Route index element={<Navigate to="transaction" replace />} />
              <Route path="transaction" element={<TransactionSummaryPage />} />
              <Route path="stock" element={<StockSummaryPage />} />
            </Route>
            <Route path="/stock-list" element={<StockListLayout />}>
              <Route index element={<Navigate to="trading" replace />} />
              <Route path="trading" element={<TradingPage />} />
              <Route path="halt" element={<HaltPage />} />
            </Route>
            <Route path="/account-management" element={<AccountManagementLayout />} >
              <Route index element={<Navigate to="regular-account" replace />} />
              <Route path="collateral-assets" element={<CollateralAssetsPage />} />
              <Route path="abnormal-limit" element={<AbnormalLimitPage />} />
              <Route path="filter" element={<AccountFilterPage />} />
              <Route path="loanable-securities" element={<LoanableSecuritiesPage />} />
              <Route path="margin-account" element={<MarginAccountPage />} />
              <Route path="regular-account" element={<RegularAccountPage />} />
              <Route path="resource-management" element={<ResourceManagementPage />} />
              <Route path="stock-ownership" element={<StockOwnershipPage />} />
              <Route path="ub-violation" element={<UbViolationPage />} />
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
