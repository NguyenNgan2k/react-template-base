import packageJson from "@/../package.json";
import SocketStatus from "./SocketStatus";
import Button from "@/components/common/Button";
import OrderPage from "@/features/order/ui/OrderPage";
import React from "react";
import { useAppDispatch } from "@/store/hook";
import { setSelectedOrder } from "@/features/order/redux/orderSlice";
import type { OrderValue } from "@/features/order/orderType";

const Footer = () => {
  const dispatch = useAppDispatch()
  const [isOpenOrderPage, setIsOpenOrderPage] = React.useState(false);

  const handleOnClickButtonBuySell = (side: "B" | "S") => {
    const order: OrderValue = {
      side: side,
      account: '',
      symbol: '',
      price: '',
      volume: '',
    }

    dispatch(setSelectedOrder(order))
    setIsOpenOrderPage(true)
  }

  return (
    <div className='footer h-8 px-2 py-1 flex bg-indigo-1000 justify-between items-center relative'>
      <div className="flex gap-2">
        <Button variant="buy" onClick={() => handleOnClickButtonBuySell('B')}>Mua</Button>
        <Button variant="sell" onClick={() => handleOnClickButtonBuySell("S")}>Bán</Button>
      </div>
      <div className="flex gap-2">
        <span>Cung cấp bởi DTND</span>
        <span>v.{packageJson.version}</span>
        <SocketStatus />
      </div>
      {
        isOpenOrderPage && <OrderPage onClose={() => setIsOpenOrderPage(false)} />
      }

    </div>
  )
}
export default Footer;