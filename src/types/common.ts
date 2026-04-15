export interface ApiStatus {
  loading: boolean;
  error: string | null;
  success?: boolean;
}

export interface Option {
  value: string;
  label: string;
  subLabel?: string;
  colorClass?: string;
  disabled?: boolean;
}

// lấy một hoặc nhieu key trong object chuyển sang ?:
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type ValueSelect = {
  value: string;
  label: string;
};

/* ==== Base API Response===== */

export type ApiResponse<T> = {
  rc: number;
  msg?: string;
  data: T | null;
};

export type ApiPayloadWithOtp<T> = {
  params: T;
  otp: string;
};

export type ValueFromKey<
  T extends readonly Record<string, unknown>[],
  K extends keyof T[number],
> = T[number][K];
export interface Column<T> {
  key: string;
  title: string;
  className?: string;
  render: (row: T) => React.ReactNode;
  tooltip?: Array<string>;
}

export interface ErrorInput {
  message?: string;
}

export type PaginationParams = {
  page: number;
  size: number;
};
