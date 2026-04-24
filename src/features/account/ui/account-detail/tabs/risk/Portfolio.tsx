import Table from "@/components/table/Table";
import type { AccountPortfolio } from "@/features/account/accountType";
import { selectAccountPortfolio } from "@/features/account/redux/accountSlice";
import type { OrderValue } from "@/features/order/orderType";
import { setSelectedOrder } from "@/features/order/redux/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column } from "@/types/common";
import { numberFormat } from "@/utils/format";

const PortFolio = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector(selectAccountPortfolio);

  const portfolioColumns: Column<AccountPortfolio>[] = [
    {
      key: "symbol",
      title: "Mã CK",
      className: "text-center",
      render: (row) => row.symbol || "-",
    },
    {
      key: "marginRatio",
      title: "Tỷ lệ KQ",
      className: "text-center",
      render: (row) => Number(row.margin_rate) * 100 + "%",
    },
    {
      key: "volume",
      title: "KL",
      className: "text-center",
      render: (row) => numberFormat(row.actual_vol, 0, "-"),
    },
    {
      key: "availableVolume",
      title: "KL khả dụng",
      className: "text-center",
      render: (row) => numberFormat(row.avaiable_vol, 0, "-"),
    },
    {
      key: "marketValue",
      title: "Giá trị TT",
      className: "text-right",
      render: (row) => numberFormat(row.market_value, 0, "-"),
    },
    {
      key: "assetRatio",
      title: "% ghi nhận TS",
      className: "text-center",
      render: (row) => row.plg || '-',
    },
  ]

  const handleOnClickPortfolio = (row: AccountPortfolio) => {
    const order: OrderValue = {
      side: 'S',
      account: row.account,
      symbol: row.symbol,
      price: row.sellPrice,
      volume: row.avaiable_vol,
    }

    dispatch(setSelectedOrder(order))
  }

  return (
    <Table
      columns={portfolioColumns}
      data={portfolio}
      onClickRow={(row) => handleOnClickPortfolio(row)}
    />
  )
}

export default PortFolio;