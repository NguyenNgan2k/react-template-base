# DTND_BROKER

**DTND_BROKER** là ứng dụng Web Trading dành cho Nhân viên và mô giới của [DTND], được xây dựng bằng **React 19**, **TypeScript**, và **Vite** nhằm mang lại hiệu năng cao, trải nghiệm mượt mà và dễ bảo trì.

---

## Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt & Chạy dự án](#-cài-đặt--chạy-dự-án)
- [Script hữu ích](#-script-hữu-ích)
- [Quy ước đặt tên](#-quy-ước-đặt-tên)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

---

## Giới thiệu

DTND_BROKER là nền tảng giao dịch chứng khoán trực tuyến:

- Đăng nhập/Quản lý tài khoản
- Bảng giá realtime
- Đặt lệnh mua/bán
- Thông báo realtime
- Biểu đồ và báo cáo giao dịch

Ứng dụng được tối ưu cho desktop và mobile.

---

## Công nghệ sử dụng

- [React 19](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- [Vite](https://vitejs.dev/) – Bundler & Dev Server
- [React Router v6+](https://reactrouter.com/) – Routing
- [Axios](https://axios-http.com/) – API client
- [Redux Toolkit/Zustand] – State management (tùy chọn)
- [Tailwind CSS / SCSS] – Styling
- [ESLint + Prettier] – Code style & linting

---

## Cấu trúc dự án

```bash
DTND_BROKER/
├─ public/                # File tĩnh: favicon, manifest...
├─ src/
│  ├─ api/                # Gọi API
│  ├─ assets/             # Hình ảnh, icon, font
│  ├─ components/         # Component tái sử dụng
│  ├─ configs/            # Config
│  ├─ context/            # Context
│  ├─ features/           # Chức năng chính
│  ├─ pages/              # Mỗi trang của ứng dụng
│  ├─ layouts/            # Layout chính (AuthLayout, MainLayout)
│  ├─ services/           # Gọi API, config axios
│  ├─ routes/             # Khai báo Router
│  ├─ store/              # Redux/Zustand
│  ├─ hooks/              # Custom hooks
│  ├─ utils/              # Hàm helper
│  ├─ types/              # TypeScript types & interfaces
│  ├─ worker/             # worker service
│  ├─ App.tsx
│  └─ main.tsx
├─ .env
├─ package.json
└─ vite.config.ts
```

TECHLICAL LOGIC
\*Login flow
1.User nhập user/password (có validate)
2.FE gọi API /login
3.Server trả về:
userData
4.FE:
Mã hóa Mã hóa userData bằng sessionId + Lưu userData vào storage
Set user state
Redirect dashboard
