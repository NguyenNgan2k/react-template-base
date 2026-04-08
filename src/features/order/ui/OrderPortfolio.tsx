import Table from "@/components/table/Table"
import type { AccountPortfolio } from "@/features/account/accountType";
import { selectAccountPortfolio } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat, StringToDouble } from "@/utils";


const columns: Column<AccountPortfolio>[] = [
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => <div className={StringToDouble(row.gain_loss_value) > 0 ? 'u' : 'd'}>{row.symbol}</div>
  },
  {
    key: "actual_vol",
    title: "Tổng",
    className: "text-right",
    render: (row) => numberFormat(row.actual_vol, 0)
  },
  {
    key: "avaiable_vol",
    title: "Khả dụng",
    className: "text-right",
    render: (row) => numberFormat(row.avaiable_vol, 0)
  },
  {
    key: "right_vol",
    title: "Quyền",
    className: "text-right",
    render: (row) => numberFormat(row.right_vol, 0)
  },
  {
    key: "buy_t2",
    title: "T2 Mua",
    className: "text-right",
    render: (row) => numberFormat(row.buy_t2, 0)
  },
  {
    key: "sell_t2",
    title: "T2 Bán",
    className: "text-right",
    render: (row) => numberFormat(row.sell_t2, 0)
  },
  {
    key: "buy_t1",
    title: "T1 Mua",
    className: "text-right",
    render: (row) => numberFormat(row.buy_t1, 0)
  },
  {
    key: "sell_t1",
    title: "T1 Bán",
    render: (row) => numberFormat(row.sell_t1, 0)
  },
  {
    key: "buy_t0",
    title: "T0 Mua",
    className: "text-right",
    render: (row) => numberFormat(row.buy_t0, 0)
  },
  {
    key: "sell_t0",
    title: "T0 Bán",
    className: "text-right",
    render: (row) => numberFormat(row.sell_t0, 0)
  },
  {
    key: "avg_price",
    title: "Giá TB",
    className: "text-right",
    render: (row) => row.avg_price
  },
  {
    key: "market_value",
    title: "Giá trị TT",
    className: "text-right",
    render: (row) => numberFormat(row.market_value, 0)
  },
  {
    key: "market_price",
    title: "Giá TT",
    className: "text-right",
    render: (row) => row.market_price
  },
  {
    key: "gain_loss_value",
    title: "Lãi/Lỗ",
    className: "text-right",
    render: (row) => <div className={StringToDouble(row.gain_loss_value) > 0 ? 'u' : 'd'}>{numberFormat(row.gain_loss_value)}</div>
  },
  {
    key: "gain_loss_per",
    title: "% Lãi/Lỗ",
    className: "text-right",
    render: (row) => <div className={StringToDouble(row.gain_loss_value) > 0 ? 'u' : 'd'}>{row.gain_loss_per}</div>
  },
];

const Portfolio = () => {
  const accountPortfolio = useAppSelector(selectAccountPortfolio)

  return (
    <div className="h-[140px]">
      <Table
        classWrapper="max-h-[140px] overflow-auto"
        columns={columns}
        data={accountPortfolio || []}
      />
    </div>
  )
}
export default Portfolio