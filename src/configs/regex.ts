export const EMAIL_REGEX =
  /^(?=.{6,254}$)(?!.*\.$)(?!^\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /^0\d{9}$/;
export const CART_ID = /^\d{12}$/;
export const VIETNAMESE_LETTERS_REGEX = /^[\p{L}\p{M}\s]+$/u;
export const ADDRESS_REGEX = /^[\p{L}\p{M}\d\s\/\-\.,]+$/u;
export const TAX_CODE_REGEX = /^\d{10}$|^\d{13}$/;
