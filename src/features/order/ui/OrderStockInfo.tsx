import Button from "@/components/common/Button";
import Text from "@/components/inputs/text/Text";
import { selectStockList, selectSnapshotBySymbol } from "@/features/stock/redux/stockSelector";
import { socketClient } from "@/networks/socket";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { StringToDouble } from "@/utils";
import _ from "lodash";
import React from "react";
import type { Stock } from "@/features/stock/stockType";
import { getSymbolKey } from "@/features/stock/stockBusiness";
import { selectSelectedSymbol } from "../redux/orderSlice";

type StockInfoProps = {

}

const StockInfo: React.FC<StockInfoProps> = (props) => {
  const dispatch = useAppDispatch()
  const [stock, setStock] = React.useState<Stock | null>(null)

  const snapshot = useAppSelector((state) =>
    stock ? selectSnapshotBySymbol(state, getSymbolKey(stock)) : undefined,
  );
  const stockList = useAppSelector(selectStockList)
  const selectedSymbol = useAppSelector(selectSelectedSymbol)

  const prevSymbolKeyRef = React.useRef<string | null>(null)

  const buyPercent = React.useMemo(() => {
    if (!snapshot) return 0;
    const buy =
      StringToDouble(snapshot.volumeBuy1) +
      StringToDouble(snapshot.volumeBuy2) +
      StringToDouble(snapshot.volumeBuy3);

    const sell =
      StringToDouble(snapshot.volumeSell1) +
      StringToDouble(snapshot.volumeSell2) +
      StringToDouble(snapshot.volumeSell3);

    const total = buy + sell;
    return total ? Math.round((buy * 100) / total) : 0;
  }, [snapshot]);

  React.useEffect(() => {
    handleGetStock(selectedSymbol)
  }, [selectedSymbol, dispatch]);

  React.useEffect(() => {
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
  }, [stock]);

  const handleOnBlurSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleGetStock(e.target.value)
  }

  const handleGetStock = (symbol: string) => {
    if (!symbol) return;
    const stock = stockList?.find((stock: Stock) => stock.shareCode === symbol)
    if (!stock) return
    setStock(stock)
  }

  return (
    <div className="rounded border border-bd-default flex flex-col gap-2">
      <div className="h-6">
        <Text iClassName="w-25" onBlur={(e) => handleOnBlurSymbol(e)} />
      </div>
      <div className="px-1">
        <div className="border-b border-bd-default">
          <p>{stock?.shareName}</p>
          <div className=" grid grid-cols-3">
            <div className='flex flex-col items-center'>
              <span>Cao</span>
              <span
                data-symbol='CEO:G1:STX'
                data-key='high'>
                {snapshot?.high}
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Thấp</span>
              <span>{snapshot?.low}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>{snapshot?.avg}</span>
              <span>-</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>NN mua</span>
              <span>{snapshot?.foreignBuy}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Room NN</span>
              <span>{snapshot?.foreignRoom}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>NN bán</span>
              <span>{snapshot?.foreignSell}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-12">
            <span className="col-span-2" />
            <span className="col-span-4">Giá bán tốt nhất</span>
            <span className="col-span-4">Giá mua tốt nhất</span>
            <span className="col-span-2" />
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-2 text-center">{buyPercent}%</div>
            <div className="col-span-8 flex items-center">
              <div className="h-1 w-full bg-bg-sell rounded-full" >
                <div
                  className="h-full bg-bg-buy rounded-full"
                  style={{ width: `${buyPercent}%` }}
                />
              </div>
            </div>
            <div className="col-span-2 text-center">{100 - buyPercent}%</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-12 gap-1">
              <Button className="col-span-2" variant="success">Mua</Button>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot?.priceBuy1}</span>
                <span>{snapshot?.volumeBuy1}</span>
              </div>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot?.priceSell1}</span>
                <span>{snapshot?.volumeSell1}</span>
              </div>
              <Button className="col-span-2" variant="danger">Bán</Button>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <Button className="col-span-2" variant="success">Mua</Button>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot?.priceBuy2}</span>
                <span>{snapshot?.volumeBuy2}</span>
              </div>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot?.priceSell2}</span>
                <span>{snapshot?.volumeSell2}</span>
              </div>
              <Button className="col-span-2" variant="danger">Bán</Button>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <Button className="col-span-2" variant="success">Mua</Button>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot?.priceBuy3}</span>
                <span>{snapshot?.volumeBuy3}</span>
              </div>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot?.priceSell3}</span>
                <span>{snapshot?.volumeSell3}</span>
              </div>
              <Button className="col-span-2" variant="danger">Bán</Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default StockInfo;