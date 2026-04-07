import type { UserData } from "./loginType";

/**
 * Kiểm tra quy tắc đăng nhập.
 *
 * @param data - Dữ liệu người dùng cần kiểm tra.
 * @returns Một đối tượng chứa các quy tắc đăng nhập đã được kiểm tra.
 */
export const checkLoginRules = (data: UserData) => {
  return {
    forceChangePass: data.cResetPwdFlag === 1,
  };
};
