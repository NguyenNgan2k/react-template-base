import {
  fetchAccountDebtExpireRequest,
  fetchAccountPortfolioRequest,
  selectAccountSelected
} from "@/features/account/redux/accountSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect } from "react";
import AccountStatusForceSell from "./AccountStatusForceSell";
import AccountStatusPresent from "./AccountStatusPresent";
import DebtExpire from "./DebtExpire";
import PortFolio from "./Portfolio";
import OrderForceCell from "./OrderForceCell";

const Risk = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);

  useEffect(() => {
    if (!accountSelected) return;
    dispatch(
      fetchAccountPortfolioRequest({
        account: accountSelected,
        data: {
          page: 1,
          size: 100,
        },
      }),
    );
    dispatch(fetchAccountDebtExpireRequest({ account: accountSelected }));
  }, [accountSelected, dispatch]);

  return (
    <div className="grid grid-cols-4 gap-1">

      <div className="col-span-3">
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-2">
            <p className="font-bold text-center">Hiện tại</p>
            <AccountStatusPresent />
          </div>
          <div className="col-span-1">
            <p className="font-bold text-center">Sau xử lý</p>
            <AccountStatusForceSell />
          </div>
          <div className="col-span-2">
            <p className="font-bold text-center">Danh mục</p>
            <PortFolio />
          </div>
          <div className="col-span-1">
            <OrderForceCell />
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-center">Nợ quá hạn</p>
        <DebtExpire />
      </div>
    </div>
  )
}

export default Risk