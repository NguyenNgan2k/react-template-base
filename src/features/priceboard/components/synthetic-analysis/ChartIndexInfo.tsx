import { FaSquare } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import type { IndexData } from "../../../../types";
import { mapIdToNameIndex, numberFormat } from "../../../../utils";

interface Props {
  dataIndex: IndexData | undefined;
}

export default function ChartIndexInfo(props: Props) {
  const { dataIndex } = props;

  return (
    <div className="flex flex-col gap-2 w-2/5 p-1">
      {/* Name, change, changePC */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-text-title uppercase">
          {dataIndex && mapIdToNameIndex(dataIndex.id)}
        </span>
        <div
          className={`flex flex-row gap-1 items-center whitespace-nowrap ${dataIndex?.indexCompare}`}
        >
          <div className="p-0.5 rounded grid place-items-center bg-status-index">
            <FaArrowUpLong className="text-sm" />
          </div>{" "}
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">
              {dataIndex && numberFormat(dataIndex.value, 2, "0")}
            </span>
            <span className="text-xs font-semibold w-full whitespace-normal">
              ({dataIndex && numberFormat(dataIndex?.change, 2, "0")}/
              {dataIndex && numberFormat(dataIndex?.changePct, 2, "0")}%)
            </span>
          </div>
        </div>
      </div>

      {/* value, volume */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-normal text-text-title">
          {numberFormat(dataIndex?.totalVol)}{" "}
          <span className="text-text-subtitle">CP</span>
        </span>
        <span className="text-xs font-normal text-text-title">
          {dataIndex &&
            dataIndex.totalAmountTraded &&
            numberFormat(dataIndex?.totalAmountTraded / 10e8)}{" "}
          <span className="text-text-subtitle">Tỷ</span>
        </span>
      </div>

      {/* Mã tăng giảm, phiên */}
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-3">
          <span className="text-[10px] font-semibold u flex flex-row items-center justify-center whitespace-nowrap">
            <TiArrowSortedUp className="w-3 h-3" />
            <span>
              {dataIndex && dataIndex.up} <span className="c"></span>
            </span>
          </span>
          <span className="text-[10px] font-semibold r flex flex-row items-center justify-center whitespace-nowrap">
            <FaSquare className="w-[7px] h-[7px] mr-0.5" />
            <span>{dataIndex && dataIndex.noChange}</span>
          </span>
          <span className="text-[10px] font-semibold d flex flex-row items-center justify-center whitespace-nowrap">
            <TiArrowSortedDown className="w-3 h-3" />
            <span>
              {dataIndex && dataIndex.down} <span className="f"></span>
            </span>
          </span>
        </div>
        <ul className="list-disc text-[10px] font-medium text-text-title ml-4">
          {/* <li className="">{getStatusIndex(dataIndex.tradingSessionId)}</li> */}
          <li>{dataIndex?.status}</li>
        </ul>
      </div>
    </div>
  );
}
