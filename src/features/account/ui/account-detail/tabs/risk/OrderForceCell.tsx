import Button from "@/components/common/Button";
import Table from "@/components/table/Table-v2";
import { selectSnapshotBySymbol, selectStockList } from "@/features/stock/redux/stockSelector";
import { getSymbolKey } from "@/features/stock/stockBusiness";
import { socketClient } from "@/networks/socket";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types"
import { use, useEffect, useMemo, useRef } from "react";
import Form from "@/components/form/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextFormField from "@/components/inputs/text/TextFormField";
import MaskFormField from "@/components/inputs/mask/MaskFormField";
import { selectSelectedOrder } from "@/features/order/redux/orderSlice";
import type { SnapShot, Stock } from "@/features/stock/stockType";
import { StringToDouble } from "@/utils/format";
import type { BidAskQuotes } from "@/features/order/orderType";

type FormValues = {
  price: string;
  volume: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  price: yup
    .string()
    .required("Nhập giá"),
  volume: yup
    .string()
    .required("Nhập khối lượng")
    .matches(/^\d+$/, "Khối lượng phải là số nguyên dương")
})

const OrderForceCell = () => {
  const selectedOrder = useAppSelector(selectSelectedOrder)
  const prevSymbolKeyRef = useRef<string>('')
  const stockList = useAppSelector(selectStockList)
  const snapshot = useAppSelector((state) => selectSnapshotBySymbol(state, prevSymbolKeyRef.current));

  const bidAskQuotesColumns: Column<BidAskQuotes>[] = [
    {
      key: "bid",
      title: "Mua",
      className: "text-center",
      children: [
        {
          key: "volumeBuy",
          title: "KL",
          className: "text-center",
          render: (row) => row?.volumeBuy,
        },
        {
          key: "priceBuy",
          title: "Giá",
          className: "text-center",
          render: (row) => row?.priceBuy,
        },
        {
          key: "valueBuy",
          title: "Giá trị",
          className: "text-center",
          render: (row) => row?.valueBuy,
        },
      ]
    },
    {
      key: "ask",
      title: "Bán",
      className: "text-center",
      render: () => <></>,
      children: [
        {
          key: "volumeSell",
          title: "KL",
          className: "text-center",
          render: (row) => row?.volumeSell,
        },
        {
          key: "priceSell",
          title: "Giá",
          className: "text-center",
          render: (row) => row?.priceSell,
        },
        {
          key: "valueSell",
          title: "Giá trị",
          className: "text-center",
          render: (row) => row.valueSell,
        },
      ]
    },
  ]

  const form = useForm<FormValues>({
    defaultValues: {
      price: selectedOrder?.price,
      volume: selectedOrder?.volume
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!selectedOrder?.symbol) return;
    handleFetchSnapshot(selectedOrder.symbol)
  }, [selectedOrder?.symbol])

  useEffect(() => {

  }, [snapshot])

  const bidAskQuotes: BidAskQuotes[] = useMemo(() => {
    if (!snapshot) return [];
    return [
      {
        priceBuy: snapshot.priceBuy1,
        volumeBuy: snapshot.volumeBuy1,
        valueBuy:
          StringToDouble(snapshot.volumeBuy1) *
          StringToDouble(snapshot.priceBuy1),
        priceSell: snapshot.priceSell1,
        volumeSell: snapshot.volumeSell1,
        valueSell:
          StringToDouble(snapshot.volumeSell1) *
          StringToDouble(snapshot.priceSell1),
      },
      {
        priceBuy: snapshot.priceBuy2,
        volumeBuy: snapshot.volumeBuy2,
        valueBuy:
          StringToDouble(snapshot.volumeBuy2) *
          StringToDouble(snapshot.priceBuy2),
        priceSell: snapshot.priceSell2,
        volumeSell: snapshot.volumeSell2,
        valueSell:
          StringToDouble(snapshot.volumeSell2) *
          StringToDouble(snapshot.priceSell2),
      },
      {
        priceBuy: snapshot.priceBuy3,
        volumeBuy: snapshot.volumeBuy3,
        valueBuy:
          StringToDouble(snapshot.volumeBuy3) *
          StringToDouble(snapshot.priceBuy3),
        priceSell: snapshot.priceSell3,
        volumeSell: snapshot.volumeSell3,
        valueSell:
          StringToDouble(snapshot.volumeSell3) *
          StringToDouble(snapshot.priceSell3),
      },
    ];
  }, [snapshot]);

  const handleFetchSnapshot = (symbol: string) => {
    if (!symbol) return;
    const stock = stockList?.find((stock: Stock) => stock.shareCode === symbol)
    if (!stock) return;
    const symbolKey = getSymbolKey(stock)
    if (prevSymbolKeyRef.current !== symbolKey) {
      // Unsubscribe mã cũ
      if (prevSymbolKeyRef.current) {
        socketClient.unsubscribe({ symbols: [prevSymbolKeyRef.current] });
      }
      // Subscribe mã mới
      socketClient.subscribe({ symbols: [symbolKey] });
      // Cập nhật ref để theo dõi
      prevSymbolKeyRef.current = symbolKey;
    }
  }

  const onSubmit = (data: FormValues) => { }

  return (
    <div className="">
      <p className="font-bold text-center">Đặt lệnh</p>
      <Form form={form} onSubmit={onSubmit}>
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Giá</th>
              <th>KL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{selectedOrder?.symbol}</td>
              <td>
                <TextFormField name='price' />
              </td>
              <td>
                <MaskFormField name='volume' />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="flex gap-1 justify-end">
                  <Button variant="secondary">Kiểm tra</Button>
                  <Button type="submit" variant="sell">Xác nhận</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Table
        columns={bidAskQuotesColumns}
        data={bidAskQuotes}
      />
    </div >
  )
}
export default OrderForceCell;