import OrderBookForm from "./OrderBookForm";
import OrderBookTable from "./OrderBookTable";

const OrderBookPage = () => {
  return (
    <div className="flex flex-col">
      <OrderBookForm />
      <OrderBookTable />
    </div>
  );
}
export default OrderBookPage;