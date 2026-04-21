import type { Option } from "@/types";

export const orderTypeOptions: Option[] = [
  { value: "ALL", label: "Tất cả" },
  { value: "B", label: "Mua" },
  { value: "S", label: "Bán" },
];

export const orderStatusOptions: Option[] = [
  { value: "ALL", label: "Tất cả" },
  { value: "1", label: "Chưa khớp" },
  { value: "2", label: "Đã khớp" },
  { value: "3", label: "Đã hủy" },
  { value: "4", label: "Khớp 1 phần" },
];
