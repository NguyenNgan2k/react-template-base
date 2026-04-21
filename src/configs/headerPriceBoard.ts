export const ROW_HEIGHT = 29;
export const HEADER_HEIGHT = 58;

export const KEYS_COLOR = [
  "lastPrice",
  "lastVolume",
  "priceBuy1",
  "volumeBuy1",
  "priceBuy2",
  "volumeBuy2",
  "priceBuy3",
  "volumeBuy3",
  "priceSell1",
  "volumeSell1",
  "priceSell2",
  "volumeSell2",
  "priceSell3",
  "volumeSell3",
  "change",
  "changePc",
  "symbol",
  "high",
  "avg",
  "low",
  "totalVol",
  "foreignRoom",
  "foreignSell",
  "foreignBuy",
  "change",
  "changePc",
] as const;

export const KEYS_QUICK_ORDER = [
  "lastPrice",
  "lastVolume",
  "priceBuy1",
  "volumeBuy1",
  "priceBuy2",
  "volumeBuy2",
  "priceBuy3",
  "volumeBuy3",
  "priceSell1",
  "volumeSell1",
  "priceSell2",
  "volumeSell2",
  "priceSell3",
  "volumeSell3",
  "ceil",
  "floor",
  "ref",
];

//TODO: Bảng giá cơ sở
export const ALL_COLUMNS_BASE = [
  { key: "symbol", label: "CK", default: true, width: "4%" },
  { key: "ceil", label: "Trần", default: true, width: "4%" },
  { key: "floor", label: "Sàn", default: true, width: "4%" },
  { key: "ref", label: "TC", default: true, width: "4%" },
  {
    key: "buy",
    label: "Bên mua",
    default: true,
    width: "23%", // width parent, children không cần width
    children: [
      { key: "priceBuy3", label: "Giá 3", default: true },
      { key: "volumeBuy3", label: "KL 3", default: true },
      { key: "priceBuy2", label: "Giá 2", default: true },
      { key: "volumeBuy2", label: "KL 2", default: true },
      { key: "priceBuy1", label: "Giá 1", default: true },
      { key: "volumeBuy1", label: "KL 1", default: true },
    ],
  },
  {
    key: "match",
    label: "Khớp lệnh",
    default: true,
    width: "17%",
    children: [
      { key: "lastPrice", label: "Khớp", default: true },
      { key: "lastVolume", label: "KL", default: true },
      { key: "change", label: "+/-", default: true },
      { key: "changePc", label: "%", default: true },
    ],
  },
  {
    key: "sell",
    label: "Bên bán",
    default: true,
    width: "23%",
    children: [
      { key: "priceSell1", label: "Giá 1", default: true },
      { key: "volumeSell1", label: "KL 1", default: true },
      { key: "priceSell2", label: "Giá 2", default: true },
      { key: "volumeSell2", label: "KL 2", default: true },
      { key: "priceSell3", label: "Giá 3", default: true },
      { key: "volumeSell3", label: "KL 3", default: true },
    ],
  },
  { key: "high", label: "Cao", default: false, width: "4%" },
  { key: "avg", label: "TB", default: false, width: "4%" },
  { key: "low", label: "Thấp", default: false, width: "4%" },
  { key: "totalVol", label: "Tổng KL", default: true, width: "5%" },
  {
    key: "foreign",
    label: "GD NĐT NN",
    default: false,
    width: "14%",
    children: [
      { key: "foreignBuy", label: "Mua", default: true },
      { key: "foreignSell", label: "Bán", default: true },
      { key: "foreignRoom", label: "Room", default: true },
    ],
  },
];

//TODO: Bảng giá chứng quyền
export const ALL_COLUMNS_CW = [
  { key: "symbol", label: "CK", default: true, width: "6%" },
  { key: "tcph", label: "TCPH", default: true, width: "6%" },
  { key: "gdcc", label: "GDCC", default: true, width: "6%" },
  { key: "ceil", label: "Trần", default: true, width: "3%" },
  { key: "floor", label: "Sàn", default: true, width: "3%" },
  { key: "ref", label: "TC", default: true, width: "3%" },
  {
    key: "buy",
    label: "Bên mua",
    default: true,
    width: "22%", // width parent, children không cần width
    children: [
      { key: "priceBuy3", label: "Giá 3", default: true },
      { key: "volumeBuy3", label: "KL 3", default: true },
      { key: "priceBuy2", label: "Giá 2", default: true },
      { key: "volumeBuy2", label: "KL 2", default: true },
      { key: "priceBuy1", label: "Giá 1", default: true },
      { key: "volumeBuy1", label: "KL 1", default: true },
    ],
  },
  {
    key: "match",
    label: "Khớp lệnh",
    default: true,
    width: "14%",
    children: [
      { key: "lastPrice", label: "Khớp", default: true },
      { key: "lastVolume", label: "KL", default: true },
      { key: "change", label: "+/-", default: true },
      { key: "changePc", label: "%", default: true },
    ],
  },
  {
    key: "sell",
    label: "Bên bán",
    default: true,
    width: "22%",
    children: [
      { key: "priceSell1", label: "Giá 1", default: true },
      { key: "volumeSell1", label: "KL 1", default: true },
      { key: "priceSell2", label: "Giá 2", default: true },
      { key: "volumeSell2", label: "KL 2", default: true },
      { key: "priceSell3", label: "Giá 3", default: true },
      { key: "volumeSell3", label: "KL 3", default: true },
    ],
  },
  { key: "high", label: "Cao", default: false, width: "3%" },
  { key: "low", label: "Thấp", default: false, width: "3%" },
  { key: "totalVol", label: "Tổng KL", default: true, width: "5%" },
  {
    key: "stockBase",
    label: "CK cơ sở",
    default: false,
    width: "8%",
    children: [
      { key: "symbolStockunderlyingSymbol", label: "CK", default: true },
      { key: "lastPriceUnderlyingSymbol", label: "Giá", default: true },
    ],
  },
  { key: "th", label: "TH", default: true, width: "4%" },
];

//TODO: Bảng giá danh mục yêu thích
export const ALL_COLUMNS_FAVORITE = [
  { key: "symbol", label: "CK", default: true, width: "4.5%" },
  { key: "ceil", label: "Trần", default: true, width: "3.5%" },
  { key: "floor", label: "Sàn", default: true, width: "3.5%" },
  { key: "ref", label: "TC", default: true, width: "3.5%" },
  {
    key: "buy",
    label: "Bên mua",
    default: true,
    width: "24%", // width parent, children không cần width
    children: [
      { key: "priceBuy3", label: "Giá 3", default: true },
      { key: "volumeBuy3", label: "KL 3", default: true },
      { key: "priceBuy2", label: "Giá 2", default: true },
      { key: "volumeBuy2", label: "KL 2", default: true },
      { key: "priceBuy1", label: "Giá 1", default: true },
      { key: "volumeBuy1", label: "KL 1", default: true },
    ],
  },
  {
    key: "match",
    label: "Khớp lệnh",
    default: true,
    width: "16%",
    children: [
      { key: "lastPrice", label: "Khớp", default: true },
      { key: "lastVolume", label: "KL", default: true },
      { key: "change", label: "+/-", default: true },
      { key: "changePc", label: "%", default: true },
    ],
  },
  {
    key: "sell",
    label: "Bên bán",
    default: true,
    width: "24%",
    children: [
      { key: "priceSell1", label: "Giá 1", default: true },
      { key: "volumeSell1", label: "KL 1", default: true },
      { key: "priceSell2", label: "Giá 2", default: true },
      { key: "volumeSell2", label: "KL 2", default: true },
      { key: "priceSell3", label: "Giá 3", default: true },
      { key: "volumeSell3", label: "KL 3", default: true },
    ],
  },
  { key: "high", label: "Cao", default: false, width: "3.7%" },
  { key: "avg", label: "TB", default: false, width: "3.7%" },
  { key: "low", label: "Thấp", default: false, width: "3.6%" },
  { key: "totalVol", label: "Tổng KL", default: true, width: "5%" },
  {
    key: "foreign",
    label: "GD NĐT NN",
    default: false,
    width: "13%",
    children: [
      { key: "foreignBuy", label: "Mua", default: true },
      { key: "foreignSell", label: "Bán", default: true },
      { key: "foreignRoom", label: "Room", default: true },
    ],
  },
];

//TODO: Bảng giá phái sinh
export const ALL_COLUMNS_DERIVATIVE = [
  { key: "mahd", label: "Mã HĐ", default: true, width: "6%" },
  { key: "ndh", label: "NGày ĐH", default: true, width: "8%" },
  { key: "ceil", label: "Trần", default: true, width: "3%" },
  { key: "floor", label: "Sàn", default: true, width: "3%" },
  { key: "ref", label: "TC", default: true, width: "3%" },
  { key: "dl", label: "Độ lệch", default: true, width: "5%" },
  { key: "dklm", label: "KL mở", default: true, width: "5%" },

  {
    key: "buy",
    label: "Bên mua",
    default: true,
    width: "22%", // width parent, children không cần width
    children: [
      { key: "priceBuy3", label: "Giá 3", default: true },
      { key: "volumeBuy3", label: "KL 3", default: true },
      { key: "priceBuy2", label: "Giá 2", default: true },
      { key: "volumeBuy2", label: "KL 2", default: true },
      { key: "priceBuy1", label: "Giá 1", default: true },
      { key: "volumeBuy1", label: "KL 1", default: true },
    ],
  },
  {
    key: "match",
    label: "Khớp lệnh",
    default: true,
    width: "14%",
    children: [
      { key: "lastPrice", label: "Khớp", default: true },
      { key: "lastVolume", label: "KL", default: true },
      { key: "change", label: "+/-", default: true },
    ],
  },
  {
    key: "sell",
    label: "Bên bán",
    default: true,
    width: "22%",
    children: [
      { key: "priceSell1", label: "Giá 1", default: true },
      { key: "volumeSell1", label: "KL 1", default: true },
      { key: "priceSell2", label: "Giá 2", default: true },
      { key: "volumeSell2", label: "KL 2", default: true },
      { key: "priceSell3", label: "Giá 3", default: true },
      { key: "volumeSell3", label: "KL 3", default: true },
    ],
  },
  { key: "high", label: "Cao", default: false, width: "3%" },
  { key: "low", label: "Thấp", default: false, width: "3%" },
  { key: "totalVol", label: "Tổng KL", default: true, width: "5%" },
  {
    key: "foreign",
    label: "GD NĐT NN",
    default: false,
    width: "8%",
    children: [
      { key: "foreignBuy", label: "Mua", default: true },
      { key: "foreignSell", label: "Bán", default: true },
    ],
  },
];

export const KEYS_COLOR_BASE = [
  "totalVol",
  "foreignRoom",
  "foreignSell",
  "foreignBuy",
];
