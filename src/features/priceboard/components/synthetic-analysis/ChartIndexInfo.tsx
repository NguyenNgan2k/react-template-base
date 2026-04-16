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
        <div className="text-xs font-bold text-text-title uppercase">
          {dataIndex && mapIdToNameIndex(dataIndex.id)}
        </div>
        <div
          className={`flex flex-row gap-1 items-center whitespace-nowrap ${dataIndex?.indexCompare}`}
        >
          <div className="p-0.5 rounded grid place-items-center bg-status-index">
            <FaArrowUpLong
              className={`text-sm ${dataIndex?.indexCompare === "d" ? "rotate-180" : ""}`}
            />
          </div>{" "}
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold">
              {dataIndex && numberFormat(dataIndex.value, 2, "0")}
            </div>
            <div className="text-xs font-semibold w-full whitespace-normal">
              ({dataIndex && numberFormat(dataIndex?.change, 2, "0")}/
              {dataIndex && numberFormat(dataIndex?.changePct, 2, "0")}%)
            </div>
          </div>
        </div>
      </div>

      {/* value, volume */}
      <div className="flex flex-col gap-1">
        <div className="text-xs font-normal text-text-title flex flex-row gap-0.5">
          {numberFormat(dataIndex?.totalVol)}{" "}
          <div className="text-text-subtitle">CP</div>
        </div>
        <div className="text-xs font-normal text-text-title flex flex-row gap-0.5">
          {dataIndex &&
            dataIndex.totalAmountTraded &&
            numberFormat(dataIndex?.totalAmountTraded / 10e8)}{" "}
          <div className="text-text-subtitle">Tỷ</div>
        </div>
      </div>

      {/* Mã tăng giảm, phiên */}
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-3">
          <div className="text-[10px] font-semibold u flex flex-row items-center justify-center whitespace-nowrap">
            <TiArrowSortedUp className="w-3 h-3" />
            <div>
              {dataIndex && dataIndex.up} <div className="c"></div>
            </div>
          </div>
          <div className="text-[10px] font-semibold r flex flex-row items-center justify-center whitespace-nowrap">
            <FaSquare className="w-[7px] h-[7px] mr-0.5" />
            <div>{dataIndex && dataIndex.noChange}</div>
          </div>
          <div className="text-[10px] font-semibold d flex flex-row items-center justify-center whitespace-nowrap">
            <TiArrowSortedDown className="w-3 h-3" />
            <div>
              {dataIndex && dataIndex.down} <div className="f"></div>
            </div>
          </div>
        </div>
        <ul className="list-disc text-[10px] font-medium text-text-title ml-4">
          {/* <li className="">{getStatusIndex(dataIndex.tradingSessionId)}</li> */}
          <li>{dataIndex?.status}</li>
        </ul>
      </div>
    </div>
  );
}
