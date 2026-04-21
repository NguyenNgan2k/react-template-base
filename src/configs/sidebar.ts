import type { Option, SidebarItem } from "@/types";

export const sideBarItems: SidebarItem[] = [
  {
    id: "price_board",
    title: "Bảng giá",
    path: "/price-board",
  },
  {
    id: "order_book",
    title: "Sổ lệnh",
    path: "/order-book",
  },
  {
    id: "customer",
    title: "Khách hàng",
    path: "/customer",
  },
  {
    id: "account_management",
    title: "Quản trị tài khoản",
    path: "/account-management",
  },
  {
    id: "putthrough",
    title: "Thỏa thuận",
    path: "/putthrough",
  },
  {
    id: "summary",
    title: "Thống kê",
    path: "/summary",
  },
  {
    id: "stock_list",
    title: "Danh sách mã CK",
    path: "/stock-list",
  },
  {
    id: "message_session",
    title: "Message phiên",
    path: "/message-session",
  },
];

export const sideBarPutThroughItems: SidebarItem[] = [
  {
    id: "putthrough",
    title: "Thỏa thuận",
    path: "/putthrough/putthrough",
  },
  {
    id: "advertisement",
    title: "Quảng cáo",
    path: "/putthrough/advertisement",
  },
];

export const sideBarAccountManagementItems: SidebarItem[] = [
  {
    id: "regular-account",
    title: "Tài khoản thường",
    path: "/account-management/regular-account",
  },
  {
    id: "margin-account",
    title: "Tài khoản margin",
    path: "/account-management/margin-account",
  },
  {
    id: "stock-ownership",
    title: "Danh sách KH sở hữu chứng khoán",
    path: "/account-management/stock-ownership",
  },
  {
    id: "abnormal-limit",
    title: "Hạn mức bất thường",
    path: "/account-management/abnormal-limit",
  },
  {
    id: "loanable-securities",
    title: "Chứng khoán cho vay",
    path: "/account-management/loanable-securities",
  },
  {
    id: "resource-management",
    title: "Quản lý nguồn",
    path: "/account-management/resource-management",
  },
  {
    id: "collateral-assets",
    title: "Tài sản đảm bảo",
    path: "/account-management/collateral-assets",
  },
  {
    id: "account-filter",
    title: "Bộ lọc TK",
    path: "/account-management/filter",
  },
  {
    id: "ub-violation",
    title: "TK vi phạm UB",
    path: "/account-management/ub-violation",
  },
];

export const sideBarsummaryItems: SidebarItem[] = [
  {
    id: "transaction",
    title: "Thống kê giá trị giao dịch",
    path: "/summary/transaction",
  },
  {
    id: "stock",
    title: "Thống kê theo mã chứng khoán",
    path: "/summary/stock",
  },
];

export const sideBarStockListItems: SidebarItem[] = [
  {
    id: "trading",
    title: "Giao dịch",
    path: "/stock-list/trading",
  },
  {
    id: "halt",
    title: "Halt",
    path: "/stock-list/halt",
  },
];
