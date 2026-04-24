import { selectAccountInfo } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import AccountStatusMargin from "./account-margin/AccountStatusMargin";
import AccountStatusRegular from "./account-regular/AccountStatusRegular";

const AccountStatus = () => {
  const accountInfo = useAppSelector(selectAccountInfo);
  return (
    <div>
      {
        accountInfo?.accountType === 'N' && <AccountStatusRegular />
      }
      {
        accountInfo?.accountType === 'M' && <AccountStatusMargin />
      }

    </div >
  );
}
export default AccountStatus;