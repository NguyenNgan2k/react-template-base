import { FaCartShopping } from "react-icons/fa6"
import { IoIosCloseCircleOutline } from "react-icons/io";
import OrderPortfolio from "./OrderPortfolio.tsx";
import OrderAccountInfo from "./OrderAccountInfo.tsx";
import OrderForm from "./OrderForm.tsx";
import OrderStockInfo from "./OrderStockInfo.tsx";

type OrderPageProps = {
  onClose: () => void;
}

const OrderPage = (props: OrderPageProps) => {
  return (
    <div className="panel absolute left-0 bottom-8 h-80 w-full bg-dark-blue">
      <div className="h-full grid grid-cols-[auto_350px]">
        <div>
          <div className="h-8 flex justify-between items-center">
            <div className="h-full bg-bg-elevated-3 flex items-center gap-1 px-4">
              <FaCartShopping className="mr-2" />
              <div className="text-sm">Đặt lệnh</div>
            </div>
            <IoIosCloseCircleOutline className="text-xl mr-4 cursor-pointer" onClick={props.onClose} />
          </div>
          <OrderPortfolio />
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-7">
              <OrderForm />
            </div>
            <div className="col-span-5">
              <OrderAccountInfo />
            </div>
          </div>
        </div>
        <OrderStockInfo />
      </div>
    </div>
  )
}
export default OrderPage
