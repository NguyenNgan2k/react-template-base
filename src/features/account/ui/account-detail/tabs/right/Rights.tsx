import RightsIssue from "./RightsIssue"
import DividendRights from "./DividendRights"

const Right = () => {

  return (
    <div className="flex flex-col gap-1">
      <div>
        <p className="font-bold">Quyền mua cổ phiếu phát hành thêm / Trái phiếu chuyển đổi</p>
        <RightsIssue />
      </div>
      <div>
        <p className="font-bold">Quyền cổ tức bằng tiền, bằng chứng khoán, chứng khoán thưởng</p>
        <DividendRights />
      </div>
    </div>
  )
}

export default Right