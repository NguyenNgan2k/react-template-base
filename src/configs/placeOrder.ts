export const ArrStatusOrderBook = [
  {
    value: "ALL",
    label: "Tất cả trạng thái",
  },
  { value: "1", label: "Chờ khớp" },
  {
    value: "2",
    label: "Đã khớp",
  },
  {
    value: "3",
    label: "Đã hủy",
  },
  {
    value: "4",
    label: "Khớp 1 phần",
  },
];

export const MARKET_ORDERS = [
  "ATC",
  "ATO",
  "MP",
  "MOK",
  "MAK",
  "PLO",
  "MTL",
  "LO",
] as const;

export const MAX_NUMBER_TRADE = 500000;

export const PRICE_BY_MARKET_PRICE = [
  { market: "STO", value: ["MTL", "ATO", "ATC"] },
  { market: "STX", value: ["PLO", "ATC", "MTL", "MOK", "MAK"] },
];
