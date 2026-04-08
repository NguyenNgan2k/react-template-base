import Button from "@/components/common/Button";
import Text from "@/components/inputs/text/Text";
import { selectSnapshotBySymbol, selectSnapshotsBySymbols } from "@/features/stock/redux/stockSelector";
import { socketClient } from "@/networks/socket";
import { useAppSelector } from "@/store/hook";
import React from "react";

type StockInfoProps = {

}

const StockInfo: React.FC<StockInfoProps> = (props) => {
  const [symbol, setSymbol] = React.useState<string | null>(null)

  const snapshots = useAppSelector((state) =>
    selectSnapshotBySymbol(state, ['CEO:G1:STX']),
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
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Thấp</span>
              <span>-</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Trung bình</span>
              <span>-</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>NN mua</span>
              <span>-</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>Room NN</span>
              <span>-</span>
            </div>
            <div className='flex flex-col items-center'>
              <span>NN bán</span>
              <span>-</span>
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
            <div className="col-span-2 text-center">65%</div>
            <div className="col-span-8 flex items-center">
              <div className="h-1 w-full bg-bg-elevated-3 rounded-full" />
            </div>
            <div className="col-span-2 text-center">35%</div>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <Button className="col-span-2" variant="success">Mua</Button>
            <div className="px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
              <span>6.91</span>
              <span>7,50</span>
            </div>
            <div className="px-1 col-span-4 flex items-center justify-between border border-bd-default rounded">
              <span>6.91</span>
              <span>7,50</span>
            </div>
            <Button className="col-span-2" variant="danger">Bán</Button>
          </div>
        </div>
      </div>
    </div >
  )
}
export default StockInfo;