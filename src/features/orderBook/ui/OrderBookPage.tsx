import OrderBookForm from "./OrderBookForm";
import OrderBookTable from "./OrderBookTable";

const OrderBookPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <OrderBookForm />
      <OrderBookTable />
    </div>
  );
}
export default OrderBookPage;