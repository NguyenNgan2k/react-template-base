import Button from "@/components/common/Button";
import Text from "@/components/inputs/text/Text";
import { selectSnapshotBySymbol, selectSnapshotsBySymbols } from "@/features/stock/redux/stockSelector";
import { socketClient } from "@/networks/socket";
import { useAppSelector } from "@/store/hook";
import { StringToDouble } from "@/utils";
import React from "react";

type StockInfoProps = {

}

const StockInfo: React.FC<StockInfoProps> = (props) => {
  let perBuy = 0
  let preSell = 0
  const [symbol, setSymbol] = React.useState<string | null>(null)

  const snapshot = useAppSelector((state) =>
    selectSnapshotBySymbol(state, 'CEO:G1:STX'),
  );

  const prevSymbolKeyRef = React.useRef<string | null>(null)
  React.useEffect(() => {
    socketClient.subscribe({ symbols: ['CEO:G1:STX'] });
  }, [])

  React.useEffect(() => {
    if (!symbol) return;
    // const currentSymbolKey = `${orderSymbol.value}:G1:${orderSymbol.post_to}`;
    const symbolKey = 'CEO:G1:STX'

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
  }, [symbol]);

  React.useEffect(() => {
    const totalBuy = StringToDouble(snapshot.volumeBuy1) + StringToDouble(snapshot.volumeBuy2) + StringToDouble(snapshot.volumeBuy3);
    const totalSell = StringToDouble(snapshot.volumeSell1) + StringToDouble(snapshot.volumeSell2) + StringToDouble(snapshot.volumeSell3);
    perBuy = totalBuy * 100 / totalBuy + totalSell;
  }, [snapshot])

  return (
    <div className="rounded border border-bd-default flex flex-col gap-2">
      <div className="h-6">
        <Text iClassName="w-25" />
      </div>
      <div className="px-1">
        <div className="border-b border-bd-default">
          <p>Công ty Cổ phần A32</p>
          <div className=" grid grid-cols-3">
            <div className='flex flex-col items-center'>
              <span>Cao</span>
              <span
                data-symbol='CEO:G1:STX'
                data-key='high'>
                {snapshot.high}
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Thấp</span>
              <span>{snapshot.low}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>{snapshot.avg}</span>
              <span>-</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>NN mua</span>
              <span>{snapshot.foreignBuy}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Room NN</span>
              <span>{snapshot.foreignRoom}</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>NN bán</span>
              <span>{snapshot.foreignSell}</span>
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
            <div className="col-span-2 text-center">{perBuy}%</div>
            <div className="col-span-8 flex items-center">
              <div className="h-1 w-full bg-bg-elevated-3 rounded-full" />
            </div>
            <div className="col-span-2 text-center">35%</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-12 gap-1">
              <Button className="col-span-2" variant="success">Mua</Button>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot.priceBuy1}</span>
                <span>{snapshot.volumeBuy1}</span>
              </div>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot.priceSell1}</span>
                <span>{snapshot.volumeSell1}</span>
              </div>
              <Button className="col-span-2" variant="danger">Bán</Button>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <Button className="col-span-2" variant="success">Mua</Button>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot.priceBuy2}</span>
                <span>{snapshot.volumeBuy2}</span>
              </div>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot.priceSell2}</span>
                <span>{snapshot.volumeSell2}</span>
              </div>
              <Button className="col-span-2" variant="danger">Bán</Button>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <Button className="col-span-2" variant="success">Mua</Button>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot.priceBuy3}</span>
                <span>{snapshot.volumeBuy3}</span>
              </div>
              <div className="text-[11px] px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
                <span>{snapshot.priceSell3}</span>
                <span>{snapshot.volumeSell3}</span>
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