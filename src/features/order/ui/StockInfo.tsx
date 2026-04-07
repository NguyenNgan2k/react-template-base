import Button from "@/components/common/Button";
import Text from "@/components/inputs/text/Text";

type StockInfoProps = {

}

const StockInfo: React.FC<StockInfoProps> = (props) => {
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
              <span>-</span>
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