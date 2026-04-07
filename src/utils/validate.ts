import { VIETNAMESE_LETTERS_REGEX } from "@/configs";

export function isTitleCaseVietnamese(value: string): boolean {
  if (!value || !VIETNAMESE_LETTERS_REGEX.test(value)) {
    return false; // rỗng hoặc chứa ký tự không hợp lệ
  }

  // Tách theo khoảng trắng và kiểm tra chữ cái đầu mỗi từ
  const words = value.trim().split(/\s+/);

  return words.every((word) => {
    // Mỗi từ phải có ít nhất 1 ký tự và chữ cái đầu phải là chữ hoa
    return word.length > 0 && word[0] === word[0].toUpperCase();
  });
}
