import { StringToInt } from "@/utils";

/**
 * Lấy trạng thái lệnh dựa trên tham số đầu vào như: mã trạng thái, ,
 *
 * @param statusCode -  Mã trạng thái
 * @param orderVol -  Khối lượng đặt
 * @param matchVol -  Khối lượng khớp
 * @returns - Trạng thái lệnh
 */
export const getStatusOrderName = (
  statusCode: string,
  orderVol = 0,
  matchVol = 0,
): string => {
  if (statusCode === "P") {
    return "Chờ khớp";
  } else if (statusCode.endsWith("W")) {
    return "Chờ huỷ";
  } else if (statusCode.endsWith("M")) {
    if (StringToInt(matchVol) === StringToInt(orderVol)) return "Đã khớp";
    return "Khớp một phần";
  } else if (statusCode.endsWith("X")) {
    if (StringToInt(matchVol) > 0) return "Khớp một phần, 1 phần đã huỷ";
    return "Đã huỷ";
  } else if (statusCode.endsWith("C")) {
    return "Đã sửa";
  } else if (statusCode.indexOf("R") > 0) {
    return "Bị từ chối";
  }
  return "-";
};
