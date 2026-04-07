export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-9999">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-DTND-500 border-t-transparent" />
    </div>
  );
}
