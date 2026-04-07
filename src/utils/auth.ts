import CryptoJS from "crypto-js";
import { SESSION_ID_KEY, TOKEN_ID_KEY } from "../configs/auth";
import type { Token } from "../types";

export const validatePasswordRules = (password: string) => {
  return {
    length: password.length >= 8 && password.length <= 16,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?_\-=+]/.test(password),
  };
};

//Mã hóa token bằng sessionId
export const encryptToken = (
  token: Token | null,
  sessionId: string,
): string => {
  return CryptoJS.AES.encrypt(JSON?.stringify(token), sessionId).toString();
};

//Giải mã token bắng sessionId
export const decryptToken = (
  encrypted: string,
  sessionId: string,
): Token | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, sessionId);
    const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return token ?? null;
  } catch {
    return null;
  }
};

//Lấy token
export const loadTokenFromStorage = (): Token | null => {
  try {
    const encrypted = localStorage.getItem(TOKEN_ID_KEY);
    const sessionId = localStorage.getItem(SESSION_ID_KEY);

    return encrypted && sessionId ? decryptToken(encrypted, sessionId) : null;
  } catch {
    localStorage.removeItem(TOKEN_ID_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    return null;
  }
};
