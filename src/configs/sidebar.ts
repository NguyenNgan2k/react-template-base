import type { SidebarItem } from "@/types";

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
    id: "statistical",
    title: "Thống kê",
    path: "/statistical",
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
