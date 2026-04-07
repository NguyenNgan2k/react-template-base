import Big from "big.js";
import { ID_HNX, ID_HOSE, ID_UPCOM, ID_VN30 } from "../configs";

export function numberFormat(
  input: string | number | undefined | null,
  decimals: number = 0,
  fallback: string = "",
  decimalSeparator?: string,
  thousandSeparator?: string
): string {
  if (
    input === null ||
    input === undefined ||
    input === "" ||
    input === " " ||
    input === "-" ||
    input === 0 ||
    input === "0" ||
    input === "NaN"
  ) {
    return fallback;
  }

  // Làm sạch input
  const cleaned = String(input)
    .replace(/[,\s]/g, "") // bỏ dấu phẩy và khoảng trắng
    .replace(/[^\d.-]/g, ""); // bỏ ký tự lạ

  // Nếu cleaned chỉ còn "." hoặc "-"  invalid
  if (
    cleaned === "" ||
    cleaned === "." ||
    cleaned === "-" ||
    cleaned === "-."
  ) {
    return fallback;
  }

  let bigNum: Big;
  try {
    bigNum = new Big(cleaned);
  } catch {
    return fallback;
  }

  // Làm tròn theo decimals
  const rounded = bigNum.round(decimals, 0);

  // Tách phần integer / decimal
  const [intStr, decStr] = rounded.toString().split(".");

  const dec = decimalSeparator ?? ".";
  const thou = thousandSeparator ?? ",";

  // Format phần nguyên
  const formattedInt = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, thou);

  if (!decimals) {
    return formattedInt;
  }

  const paddedDec = (decStr ?? "").padEnd(decimals, "0");

  return `${formattedInt}${dec}${paddedDec}`;
}

export function mapIdToNameIndex(id: string) {
  const map: { [key: string]: string } = {
    [ID_VN30]: "VN30-Index",
    [ID_HOSE]: "VN-Index",
    [ID_HNX]: "HNX-Index",
    [ID_UPCOM]: "UPCOM-Index",
  };

  return map[id] || id;
}

export function FormatCurrency(
  num: number | string,
  delimiter: string = ",", // dấu phân cách nghìn
  separate: string = "." // dấu phân cách thập phân
): string {
  if (num === null || num === undefined || num === "") return "0";

  // Bỏ ký tự không hợp lệ
  const cleaned = String(num).replace(/\$|,/g, "");

  let bigNum: Big;
  try {
    bigNum = new Big(cleaned);
  } catch {
    return "0";
  }

  // Lấy số dương/âm
  const sign = bigNum.gte(0) ? "" : "-";

  // Làm việc với số dương
  const absNum = bigNum.abs();

  const [intStr, decStrRaw] = absNum.toString().split(".");

  const formattedInt = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

  let decStr = decStrRaw || "";

  if (decStr && decStr.length < 2) {
    decStr = decStr + "0";
  }

  // Tạo output cuối
  const result = decStr
    ? `${sign}${formattedInt}${separate}${decStr}`
    : `${sign}${formattedInt}`;

  return result;
}

export function StringToInt(pString: string | number): number {
  if (pString === null || pString === undefined) return 0;

  // Chuyển sang string và bỏ dấu phẩy
  const cleaned = String(pString).replace(/,/g, "");

  try {
    const bigNum = new Big(cleaned);
    return bigNum.round(0, 0 /* RoundHalfUp */).toNumber();
  } catch {
    return 0;
  }
}

export function formatVolume10(number: string | number) {
  const vTemp = StringToInt(number) * 10;
  const vNumber = FormatCurrency(vTemp.toString(), ",", ".");
  return vNumber.substring(0, vNumber.length - 1);
}

export function formatVolPrice(vol: number) {
  return vol >= 1e6
    ? numberFormat(vol / 1e6, 0, "") + " M"
    : vol === 0
    ? ""
    : numberFormat(vol, 0, "");
}

export function formatVolPriceToChart(vol: number) {
  return vol >= 1e6
    ? numberFormat(vol / 1e6, 2, "") + " M"
    : vol === 0
    ? ""
    : numberFormat(vol, 0, "");
}

export function StringToDouble(pString: string | number): number {
  if (pString === null || pString === undefined) return 0;

  // Chuyển sang chuỗi + bỏ dấu phẩy
  const cleaned = String(pString).replace(/,/g, "");

  try {
    const bigNum = new Big(cleaned);
    return bigNum.toNumber();
  } catch {
    return 0;
  }
}

export const formatAccount = (inputStr: string) => {
  if (!inputStr) return;
  const lastDigit = inputStr.slice(-1);
  const firstDigit = inputStr.slice(0, -1);

  return `TK-${firstDigit}.${lastDigit}`;
};

export const formatAccountType = (inputStr: string) => {
  if (!inputStr) return null;
  const lastDigit = inputStr.slice(-1);

  let label = "";
  let color = "";

  switch (lastDigit) {
    case "1":
      label = "Thường";
      color = "bg-DTND-400 text-black-white-100";
      break;
    case "6":
    case "7":
      label = "Margin";
      color = "bg-type-margin text-orange-700";
      break;
    case "8":
      label = "Nâng cao";
      color = "bg-blue-200 text-blue-700";
      break;
    case "9":
      label = "Phái sinh";
      color = "bg-type-ps text-green-700";
      break;
  }

  return { type: lastDigit, label, color };
};

export const hideMiddleDigits = (number: string) => {
  const visibleDigits = 2; // Số chữ số ở đầu và cuối muốn hiển thị
  const hiddenDigitsCount = number.length - visibleDigits * 2;
  const hiddenDigits = "*".repeat(hiddenDigitsCount);
  return `${number.slice(0, visibleDigits)}${hiddenDigits}${number.slice(
    -visibleDigits
  )}`;
};

export const formatTime = (seconds: number): string => {
  if (seconds === 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  const mm = m < 10 ? `0${m}` : `${m}`;
  const ss = s < 10 ? `0${s}` : `${s}`;

  return `${mm}:${ss}`;
};

export function checkInvalidSession(rs: string | undefined | null) {
  if (
    rs &&
    (rs === "INVALID_ACCESSTOKEN" ||
      rs.includes("InvalidSessionException") ||
      rs.includes("NotLoginException"))
  )
    return true;

  return false;
}
export function getRandom() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 23; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const formatPrice = (value?: number | string | null): string => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === 0 ||
    value === "0" ||
    value === "0.0"
  ) {
    return "";
  }

  // Làm sạch chuỗi nếu có dấu phẩy
  const cleaned = String(value).replace(/,/g, "");

  let bigNum: Big;

  try {
    bigNum = new Big(cleaned);
  } catch {
    return "";
  }

  const price = bigNum.div(1000);

  // Trả về 2 chữ số thập phân
  return price.toFixed(2);
};
