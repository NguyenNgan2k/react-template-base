import FormSearch from "@/components/form/FormSearch";
import Text from "@/components/inputs/text/Text";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectAccountInfo, selectAccountSelected, setAccountSelected } from "../../redux/accountSlice";

const AccountDetailSearch = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const accountInfo = useAppSelector(selectAccountInfo);

  const handleOnBlurAccount = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setAccountSelected(e.target.value));
  }
  return (
    <FormSearch.Body>
      <FormSearch.Field label="Tài khoản">
        <Text maxLength={7} onBlur={handleOnBlurAccount} />
      </FormSearch.Field>
      <FormSearch.Field label="Tên khách hàng">
        <Text disabled value={accountInfo?.accountName} />
      </FormSearch.Field>
      <FormSearch.Field label="Marketing ID" >
        <Text disabled value={accountInfo?.marketingId} />
      </FormSearch.Field>
      <FormSearch.Field label="Marketing name">
        <Text disabled value={accountInfo?.marketingName} />
      </FormSearch.Field>
      <FormSearch.Field label="CTV ID">
        <Text disabled />
      </FormSearch.Field>
      <FormSearch.Field label="NGT ID">
        <Text disabled />
      </FormSearch.Field>
    </FormSearch.Body>
  );
}
export default AccountDetailSearch;