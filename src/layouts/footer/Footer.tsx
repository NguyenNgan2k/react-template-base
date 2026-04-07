import packageJson from "@/../package.json";
import SocketStatus from "./SocketStatus";
import Button from "@/components/common/Button";
import OrderPage from "@/features/order/ui/OrderPage";
import React from "react";

const Footer = () => {
  const [isOpenOrderPage, setIsOpenOrderPage] = React.useState(false);
  return (
    <div className='footer h-8 px-2 py-1 flex bg-indigo-1000 justify-between items-center relative'>
      <div className="flex gap-2">
        <Button variant="buy" onClick={() => setIsOpenOrderPage(true)}>Mua</Button>
        <Button variant="sell" onClick={() => setIsOpenOrderPage(true)}>Bán</Button>
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