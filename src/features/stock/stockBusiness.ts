/**
 * Lấy giá thị trường dựa trên tham số đầu vào sàn
 *
 * @param mc -  Sàn
 * @returns list giá thị trường
 */

const getMarketPrice = (mc: string) => {
  if (mc === "STO") {
    return ["ATO", "ATC", "MTL"];
  } else if (mc === "STX") {
    return ["ATC", "MTL", "MOK", "MAK", "PLO"];
  }
  return [];
};

/**
 * Lấy bước giá dựa trên tham số đầu vào như sàn, giá tham chiếu
 *
 * @param mc -  Sàn
 * @param ref - Giá tham chiếu.
 * @returns bước giá
 */

const getStepPrice = (mc: string, ref: number) => {
  if (mc === "STO") {
    // san HO
    if (ref < 10) {
      return 0.01;
    } else if (ref < 50) {
      return 0.05;
    } else {
      return 0.1;
    }
  } else if (mc === "STX") {
    return 0.1;
  } else {
    return 0.1;
  }
};
