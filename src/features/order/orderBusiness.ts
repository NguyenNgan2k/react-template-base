import { StringToDouble } from "@/utils/format";
import type { StockInfo } from "../stock/stockType";

/**
 * Tính toán giá mới dựa trên các tham số đầu vào như giá hiện tại, bước nhảy, trần, sàn,tham chiếu.
 * Hàm này sẽ đảm bảo rằng giá mới không vượt quá trần và không thấp hơn sàn, đồng thời sẽ tăng giá hiện tại theo bước đã định.
 *
 * @param currentPrice - Giá hiện tại.
 * @param step - Bước nhảy. Mặc định là 0.1.
 * @param ceiling - Giá trần.
 * @param floor - Giá sàn.
 * @param ref - Giá tham chiếu.
 * @returns Giá mới sau khi đã được tính toán.
 */
export const plusPrice = (
  currentPrice: number,
  ceiling: number,
  floor: number,
  ref: number,
  step = 0.1,
): string => {
  let newPrice = currentPrice;
  if (newPrice === 0) {
    newPrice = ref;
  } else {
    newPrice = (newPrice * 1000 + step * 1000) / 1000;
    if (newPrice > ceiling) newPrice = ceiling;
    if (newPrice < floor) newPrice = floor;
  }
  return newPrice.toString();
};

/**
 * Tính toán giá mới dựa trên các tham số đầu vào như giá hiện tại,bước nhảy, trần, sàn,tham chiếu.
 * Hàm này sẽ đảm bảo rằng giá mới không vượt quá trần và không thấp hơn sàn, đồng thời sẽ giảm giá hiện tại theo bước đã định.
 *
 * @param currentPrice - Giá hiện tại.
 * @param ceiling - Giá trần.
 * @param floor - Giá sàn.
 * @param ref - Giá tham chiếu.
 * @param step - Bước nhảy. Mặc định là 0.1.
 * @returns Giá mới sau khi đã được tính toán.
 */
export const minusPrice = (
  currentPrice: number,
  ceiling: number,
  floor: number,
  ref: number,
  step = 0.1,
): string => {
  let newPrice = currentPrice;
  if (newPrice === 0) {
    newPrice = ref;
  } else {
    newPrice = (newPrice * 1000 - step * 1000) / 1000;
    if (newPrice < floor) newPrice = floor;
    if (newPrice > ceiling) newPrice = ceiling;
  }
  return newPrice.toString();
};

/**
 * Tính toán Khối lượng mới dựa trên các tham số đầu vào khối lượng hiện tại, bước nhảy
 * Hàm này sẽ đảm bảo sẽ tăng khối lượng hiện tại theo bước nhảy đã định.
 *
 * @param currentVolume - Khối lượng hiện tại.
 * @param step - Bước nhảy. Mặc định là 100.
 * @returns Khối lượng mới sau khi đã được tính toán.
 */
export const plusVolume = (currentVolume: number, step = 100): string => {
  return (currentVolume + step).toString();
};

/**
 * Tính toán Khối lượng mới dựa trên các tham số đầu vào khối lượng hiện tại, bước nhảy
 * Hàm này sẽ đảm bảo sẽ giảm khối lượng hiện tại theo bước nhảy đã định và không âm.
 *
 * @param currentVolume - Khối lượng hiện tại.
 * @param step - Bước nhảy. Mặc định là 100.
 * @returns Khối lượng mới sau khi đã được tính toán.
 */
export const minusVolume = (currentVolume: number, step = 100): string => {
  if (currentVolume === 0 || currentVolume - step < 0) {
    return "0";
  }
  return (currentVolume - step).toString();
};

/**
 * Hàm validatePrice được sử dụng để kiểm tra tính hợp lệ của giá nhập vào
 * Dựa trên các điều kiện như: giá phải là một trong các giá thị trường, không vượt quá trần và không thấp hơn sàn.
 *
 * @param price - Giá cần kiểm tra.
 * @param ceiling - Giá trần.
 * @param floor - Giá sàn.
 * @param marketPrice - Mảng các giá thị trường.
 * @returns Thông báo lỗi nếu giá không hợp lệ, ngược lại trả về true.
 */
export const validatePrice = (
  price: string,
  ceiling: number,
  floor: number,
  marketPrice: Array<string>,
): { isValid: boolean; message?: string } => {
  if (marketPrice.some((item) => item === price)) {
    return { isValid: true };
  } else if (StringToDouble(price) === 0) {
    return { isValid: false, message: "Giá không hợp lệ" };
  } else if (StringToDouble(price) > ceiling) {
    return { isValid: false, message: "Giá vượt quá trần" };
  } else if (StringToDouble(price) < floor) {
    return { isValid: false, message: "Giá thấp hơn sàn" };
  }
  return { isValid: true };
};

/** Sử dụng để kiểm tra tính hợp lệ của khối lượng nhập vào
 * Dựa trên các điều kiện như: khối lượng phải là số dương, không được bằng 0, và nếu lớn hơn 100 thì phải là bội số của 100.
 *
 * @param volume - Khối lượng cần kiểm tra.
 * @returns Thông báo lỗi nếu khối lượng không hợp lệ, ngược lại trả về true.
 */
export const validateVolume = (
  volume: string,
): { isValid: boolean; message?: string } => {
  if (StringToDouble(volume) > 100 && StringToDouble(volume) % 100 !== 0) {
    return { isValid: false, message: "Khối lượng không hợp lệ" };
  }
  return { isValid: true };
};
