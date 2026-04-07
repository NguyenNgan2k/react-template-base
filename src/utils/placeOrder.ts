import { MAX_NUMBER_TRADE, type MARKET_ORDERS } from "../configs";
import type { CashBalance } from "../types/placeOrder";
import { StringToDouble, StringToInt } from "./format";

export function _convertTradeTp(orderPrice: string) {
  if (!orderPrice) return "00";
  // log(orderPrice);
  const ordPrice = orderPrice ? (orderPrice + "").toUpperCase() : "";
  if (StringToDouble(orderPrice) > 0) return "01";

  switch (ordPrice) {
    case "ATO":
      return "02";

    case "ATC":
      return "03";

    case "MP":
      return "04";

    case "MTL":
      return "05";

    case "MOK":
      return "06";

    case "MAK":
      return "07";

    case "PLO":
      return "08";

    default:
      return "00";
  }
}

export const _validPriceHose = (
  price: number,
  setError: (msg: string) => void
) => {
  let step = 10;
  if (price < 10) step = 10;
  else if (price >= 10 && price < 50) step = 50;
  else step = 100;
  if (Math.round((price * 1000) % step) % 10 !== 0) {
    setError("Giá đặt không hợp lệ");
    return false;
  }
  return true;
};

export const _validPriceHnx = (
  price: number,
  setError: (msg: string) => void
) => {
  const step = 100;
  if (Math.round((price * 1000) % step) % 10 !== 0) {
    setError("Giá đặt không hợp lệ");
    return false;
  }
  return true;
};

export const _validVolHose = (vol: number, setError: (msg: string) => void) => {
  const step = 100;
  if (vol < 1 || vol > 500000) {
    setError("Khối lượng không hợp lệ");
    return false;
  }
  if (vol >= 100 && vol % step !== 0) {
    setError("Khối lượng không hợp lệ");
    return false;
  }

  return true;
};

export const _validVolHnx = (vol: number, setError: (msg: string) => void) => {
  const step = 100;
  if (vol === 0) {
    setError("Khối lượng không hợp lệ");
    return false;
  }
  if (vol >= 100 && vol % step !== 0) {
    setError("Khối lượng không hợp lệ");
    return false;
  }

  return true;
};

// Check loại giá theo sàn
export function validateTradeType(
  marketCode: string,
  tradeType: string,
  setErr: (msg: string) => void
) {
  if (tradeType === "00") {
    setErr("Giá đặt không hợp lệ");
    return false;
  }

  // HSX: không MOK/MAK/PLO
  if (
    ["HO", "STO"].includes(marketCode) &&
    ["06", "07", "08"].includes(tradeType)
  ) {
    setErr("HSX không đặt giá MOK/MAK/PLO");
    return false;
  }

  // HNX: không MP
  if (["HA", "STX"].includes(marketCode) && tradeType === "04") {
    setErr("HNX không đặt giá MP");
    return false;
  }

  // UPCOM: chỉ LO (ATO/ATC = 01)
  if (["UP", "UPX"].includes(marketCode) && tradeType !== "01") {
    setErr("UPCOM không đặt giá thị trường");
    return false;
  }

  return true;
}

// Check biên độ trần sàn
export function validatePriceRange(
  price: number,
  ceiling: number,
  floor: number,
  setErr: (msg: string) => void
) {
  const price1000 = Math.round(price * 1000);

  if (price1000 > ceiling || price1000 < floor) {
    setErr("Giá nằm ngoài biên độ Trần, Sàn");
    return false;
  }
  return true;
}

// Check khối lượng mua bán
export function validateVolumeBySide(
  orderSide: "B" | "S",
  volume: number,
  cashBalance: CashBalance | null,
  setTxtVolErr: (msg: string) => void,
  toast: (msg: string, type: "error" | "success") => void
) {
  if (orderSide === "B") {
    const available = StringToInt(cashBalance?.volumeAvaiable || "0");
    if (volume > available) {
      toast("Không đủ tiền để thực hiện giao dịch", "error");
      return false;
    }
  }

  if (orderSide === "S") {
    const sellable = StringToInt(cashBalance?.balance || "0");
    if (volume > sellable) {
      setTxtVolErr("Vượt khối lượng có thể bán");
      return false;
    }
  }

  return true;
}

// check KL theo sàn lô lẻ
export function validateVolumeByMarket(
  mc: string,
  tradeType: string,
  volume: number,
  setTxtVolErr: (msg: string) => void,
  toast: (msg: string, type: "error") => void
) {
  if (["HO", "STO"].includes(mc)) {
    if (volume > MAX_NUMBER_TRADE && volume % 100 === 0) {
      toast("Khối lượng không hợp lệ", "error");
      return false;
    }
    return _validVolHose(volume, setTxtVolErr);
  }

  // HNX/UPCOM
  const valid = _validVolHnx(volume, setTxtVolErr);
  if (!valid) return false;

  // Lô lẻ chỉ được đặt LO
  if (volume < 100 && tradeType !== "01") {
    setTxtVolErr("Lô lẻ chỉ đặt giá LO");
    return false;
  }

  return true;
}

export function getOrderStatus(
  sttCode: string,
  matchVol = 0,
  orderVol = 0,
  quote = "Y",
  index = "HOSE"
) {
  if (sttCode === "P") {
    return "Chờ khớp";
  } else if (sttCode.endsWith("W")) {
    return "Chờ hủy";
  } else if (sttCode.endsWith("M")) {
    if (StringToInt(matchVol) === StringToInt(orderVol)) return "Đã khớp";

    return "Khớp 1 phần";
  } else if (sttCode.endsWith("X")) {
    if (StringToInt(matchVol) > 0) return "Khớp 1 phần, 1 phần đã hủy";
    return "Đã hủy";
  } else if (sttCode.endsWith("C")) {
    if (index === "HNX" && quote === "G") return "Chờ sửa";
    if (index === "HNX" && quote === "Y") return "Chờ khớp";
    return "Đã sửa";
  } else if (sttCode.indexOf("R") > 0) {
    return "Từ chối";
  }

  return sttCode;
}

export function getOrderOvertime(sttCode: number | string) {
  switch (sttCode + "") {
    case "1":
      return "Đã hủy";
    case "2":
      return "Từ chối";
    case "0":
      return "Chờ gửi";
    default:
      return "";
  }
}

export function canDeleteOrder(
  ordrStatTp: string,
  ordrQty: string | number,
  matchedQty: string | number
) {
  if (ordrStatTp === "P" || ordrStatTp.endsWith("C")) return true;
  if (
    ordrStatTp.endsWith("M") &&
    StringToInt(matchedQty) < StringToInt(ordrQty)
  )
    return true;

  return false;
}

export function canEditOrder(
  ordrStatTp: string,
  ordrQty: string | number,
  matchedQty: string | number
) {
  if (ordrStatTp === "P" || ordrStatTp.endsWith("C")) return true;
  if (
    ordrStatTp.endsWith("M") &&
    StringToInt(matchedQty) < StringToInt(ordrQty)
  )
    return true;

  return false;
}

export type MarketOrder = (typeof MARKET_ORDERS)[number];
