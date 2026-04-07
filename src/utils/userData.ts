import CryptoJS from "crypto-js";
import { SESSION_ID_KEY, USER_DATA_KEY } from "@/configs/auth";
import type { UserData } from "@/features/auth/login/loginType";

/**
 * Mã hóa user data bằng sessionId.
 *
 * @param user - Dữ liệu người dùng cần mã hóa.
 * @param sessionId - Chuỗi sessionId dùng làm khóa mã hóa.
 * @returns Dữ liệu người dùng sau khi đã được mã hóa.
 */
export const encryptUserData = (user: UserData, sessionId: string): string => {
  return CryptoJS.AES.encrypt(JSON?.stringify(user), sessionId).toString();
};

/**
 * Giải mã user data bằng sessionId.
 *
 * @param user - Dữ liệu người dùng cần giải mã.
 * @param sessionId - Chuỗi sessionId dùng làm khóa giải mã.
 * @returns Dữ liệu người dùng sau khi đã được giải mã.
 */
export const decryptUserData = (
  encrypted: string,
  sessionId: string,
): UserData | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, sessionId);
    const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return user ?? null;
  } catch {
    return null;
  }
};

/**
 * Lấy user data từ storage.
 *
 * @returns Dữ liệu người dùng sau khi đã được tải từ storage  .
 */
export const loadUserDataFromStorage = (): UserData | null => {
  try {
    const encrypted = localStorage.getItem(USER_DATA_KEY);
    const sessionId = localStorage.getItem(SESSION_ID_KEY);

    return encrypted && sessionId
      ? decryptUserData(encrypted, sessionId)
      : null;
  } catch {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    return null;
  }
};
