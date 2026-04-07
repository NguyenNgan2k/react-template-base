import { useEffect, useRef } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import OrderTable from "../../../../components/place-order/order-table";
import { useAppDispatch } from "../../../../store/hook";
import { setQuickOrderSymbol } from "../../../../store/slices/priceboard/slice";
// import QuickOrderForm from "./QuickOrderForm";

export default function QuickOrder({
  onClose,
  isAnimating,
}: {
  onClose: () => void;
  isAnimating: boolean;
}) {
  const dispatch = useAppDispatch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCloseQuickOrder();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseQuickOrder = () => {
    dispatch(setQuickOrderSymbol(null));
    onClose();
  };

  return (
    <div
      className={`w-full h-100 absolute bottom-0 bg-background-primary py-2 z-99 ${isAnimating ? "animate-slideInFromBottom" : "animate-slideOutToTop"
        }`}
      ref={wrapperRef}
    >
      <div className="h-full w-full rounded-xl grid grid-cols-5 gap-2 relative">
        <div className="col-span-2 bg-surface rounded-md">
          {/* <QuickOrderForm /> */}
        </div>
        <div className="col-span-3 bg-surface rounded-md h-[calc(var(--app-height)-512px)]">
          <OrderTable />
        </div>

        <div
          className="absolute top-0 translate-x-1/2 left-1/2 -translate-y-1/2 px-8 bg-DTND-700 rounded z-50 hover:bg-DTND-800 cursor-pointer"
          onClick={handleCloseQuickOrder}
        >
          <BsChevronCompactDown className="text-text-title size-5" />
        </div>
      </div>
    </div>
  );
}
