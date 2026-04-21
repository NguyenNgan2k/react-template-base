import Descriptions from "@/components/desctiption/Descriptions-v2";
import {
  fetchAccountStatusRequest,
  selectAccountSelected,
  selectAccountStatus,
} from "@/features/account/redux/accountSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { numberFormat } from "@/utils";
import { useEffect } from "react";
import PaymentValue from "../PaymentValueTable";

const AccountStatusRegular = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const accountStatus = useAppSelector(selectAccountStatus);

  useEffect(() => {
    if (!accountSelected) return;
    dispatch(fetchAccountStatusRequest({ account: accountSelected }));
  }, [accountSelected, dispatch]);

  const generalInfoItems = [
    { label: "Sản phẩm", children: "NORMAL" },
    { label: "Phí max", children: Number(accountStatus?.max_rate) + "%" },
  ];

  const moneyItems = [
    { label: "Tài sản ròng", children: numberFormat(accountStatus?.assets, 0, "-") },
    { label: "Số dư tiền", children: numberFormat(accountStatus?.cash_balance, 0, "-") },
    { label: "Số tiền phong toả", children: numberFormat(accountStatus?.cash_block, 0, "-") },
    { label: "Cổ tức tiền", children: numberFormat(accountStatus?.collateral, 0, "-") },
    { label: "Phí lưu ký", children: numberFormat(accountStatus?.deposit_fee, 0, "-") },
    { label: "Tiền có thể rút", children: numberFormat(accountStatus?.withdrawal_cash, 0, "-") },
    { label: "Tiền rút chờ duyệt", children: numberFormat(accountStatus?.cash_temp_day_out, 0, "-") },
    { label: "Tiền có thể ứng", children: numberFormat(accountStatus?.cash_advance_avai, 0, "-") },
    { label: "Hạn mức ứng", children: numberFormat(accountStatus?.temp_ee, 0, "-") },
    { label: "Hạn mức đã dùng", children: numberFormat(accountStatus?.tempee_used, 0, "-") },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-1 gap-2 flex flex-col">
        <div>
          <p className="text-sm font-bold">Thông tin chung</p>
          <Descriptions items={generalInfoItems} />
        </div>
        <div>
          <p className="text-sm font-bold">Tiền</p>
          <Descriptions items={moneyItems} />
        </div>
      </div>
      <div className="col-span-3">
        <p className="text-sm font-bold">Giá trị thanh toán Mua/Bán CK</p>
        {accountStatus && <PaymentValue accountStatus={accountStatus} />}
      </div>
    </div>
  );
}
export default AccountStatusRegular;