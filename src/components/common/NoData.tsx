interface NoDataProps {
  message?: string;
  className?: string;
}

export default function NoData({ message, className }: NoDataProps) {
  return (
    <div
      className={`w-full h-full grid place-items-center text-sm ${className}`}
    >
      {message || "Không có dữ liệu!"}
    </div>
  );
}
