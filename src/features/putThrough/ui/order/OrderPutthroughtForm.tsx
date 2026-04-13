import Form from "@/components/form/Form";
import CheckboxField from "@/components/inputs/CheckboxField";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import { fetchStockInfoRequest, selectStockInfo } from "@/features/stock/redux/stockSlice";
import { getNameMarket } from "@/features/stock/stockBusiness";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useForm } from "react-hook-form";
import { orderSide } from "../../putthroughConfig";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BrokerID, TraderID } from "@/configs";
import clsx from "clsx";
import { useEffect } from "react";
import { showToast } from "@/hooks/useToast";
import { fetchAccountBalanceRequest, fetchAccountInfoRequest, selectAccountBalance } from "@/features/account/redux/accountSlice";
import { selectStockList } from "@/features/stock/redux/stockSelector";
import type { Stock, StockInfoRequest } from "@/features/stock/stockType";
import type { AccountBalanceRequest } from "@/features/account/accountType";
import { numberFormat } from "@/utils";
import { validatePrice, validateVolume } from "@/features/order/orderBusiness";
import Button from "@/components/common/Button";

type FormValues = {
  sideF1: string;
  brokerIdF1: string;
  traderIdF1: string;
  symbol: string;
  account: string
  price: string;
  volume: string;
  sideF2?: string;
  brokerIdF2: string;
  traderIdF2: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  sideF1: yup
    .string()
    .required("Chọn Mua/Bán"),
  brokerIdF1: yup
    .string()
    .required("Nhập tài khoản"),
  traderIdF1: yup
    .string()
    .required("Nhập tài khoản"),
  account: yup
    .string()
    .required("Nhập tài khoản")
    .matches(/^\d{7}$/, "Tài khoản phải có 7 chữ số"),
  symbol: yup
    .string()
    .required("Nhập mã chứng khoán"),
  price: yup
    .string()
    .required("Nhập giá"),
  volume: yup
    .string()
    .required("Nhập khối lượng")
    .matches(/^\d+$/, "Khối lượng phải là số nguyên dương"),
  sideF2: yup
    .string()
    .optional(),
  brokerIdF2: yup
    .string()
    .required("Nhập tài khoản"),
  traderIdF2: yup
    .string()
    .required("Nhập tài khoản"),
})

const OrderPutThroughForm = () => {
  const dispatch = useAppDispatch()
  const stockInfo = useAppSelector(selectStockInfo)
  const accountBalance = useAppSelector(selectAccountBalance)

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      sideF1: 'B',
      brokerIdF1: BrokerID,
      traderIdF1: TraderID,
      sideF2: 'S'
    }
  })

  const sideF1 = form.watch().sideF1

  const onSubmit = (data: FormValues) => {
    if (!stockInfo) return showToast('Không có dữ liệu mã chứng khoán', 'error')
    let validPrice = validatePrice(data.price, stockInfo?.c, stockInfo?.f, stockInfo?.market_price);
    if (!validPrice.isValid) {
      form.setError("price", { type: "error" });
      validPrice.message && showToast(validPrice.message, "warning");
      return;
    }

    let validVolume = validateVolume(data.volume);
    if (!validVolume.isValid) {
      form.setError("volume", { type: "error" });
      validVolume.message && showToast(validVolume.message, "warning");
      return;
    }
  }

  const handleOnBlurSymbol = () => {
    const symbol = form.getValues().symbol.toUpperCase();
    const account = form.getValues().account;
    if (!symbol) return;
    handleFetchStockInfo(symbol);
    handleFetchAccountBalance(account);
  }

  const handleOnBlurAccount = () => {
    const account = form.getValues().account;
    handleFetchAccountInfo(account);
    handleFetchAccountBalance(account);
  }

  const handleFetchStockInfo = (symbol: string) => {
    if (!symbol) return;
    const params: StockInfoRequest = {
      stock: symbol,
      data: {
        account: form.getValues().account,
        volume: form.getValues().volume,
        type: 'P'
      }
    }
    dispatch(fetchStockInfoRequest(params))
  }

  const handleFetchAccountBalance = (account: string) => {
    if (!account) return;
    const params: AccountBalanceRequest = {
      account: account,
      data: {
        symbol: form.getValues().symbol,
        price: form.getValues().price,
        side: 'B'
      }
    }
    dispatch(fetchAccountBalanceRequest(params))
  }

  const handleFetchAccountInfo = (account: string) => {
    if (!account) return;
    dispatch(fetchAccountInfoRequest({ account }));
  }

  return (
    <div>
      <Form form={form} onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div className="border border-bd-default rounded">
            <div className="flex">
              <div className={clsx("py-1 px-4", form.getValues().sideF1 === "B" ? 'bg-bg-buy' : 'bg-bg-sell')}>Firm 1</div>
              <div className='flex flex-1 gap-2 items-center justify-center'>
                <span className='pill c'>{stockInfo?.c || '...'}</span>
                <span className='pill f'>{stockInfo?.f || '...'}</span>
                <span className='pill r'>{stockInfo?.r || '...'}</span>
                <span className='pill'>Sàn: {stockInfo?.mc && getNameMarket(stockInfo?.mc) || '...'}</span>
                <span className='pill'>Bảng:{stockInfo?.board_id || '...'}</span>
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-2 p-2">
              <div>
                <Form.Field label="Loại lệnh">
                  <SelectFormField
                    name='sideF1'
                    options={orderSide}
                    mode="label"
                  />
                </Form.Field>
                <Form.Field label="BrokerID">
                  <TextFormField name='brokerIdF1' disabled />
                </Form.Field>
                <Form.Field label="Mã CK">
                  <TextFormField
                    name='symbol'
                    onBlur={handleOnBlurSymbol}
                  />
                </Form.Field>
                <Form.Field label="Giá">
                  <TextFormField name='price' />
                </Form.Field>
                <Form.Field label="QuoteId">
                  <TextFormField name='quoteId' disabled />
                </Form.Field>
              </div>
              <div>
                <Form.Field label="Tài khoản">
                  <TextFormField
                    name='account'
                    maxLength={7}
                    onBlur={handleOnBlurAccount}
                  />
                </Form.Field>
                <Form.Field label="TraderId">
                  <TextFormField name='traderIdF1' disabled />
                </Form.Field>
                <Form.Field label="Khả dụng" >
                  <div>{accountBalance?.accType === 'N' ? numberFormat(accountBalance?.balance) : numberFormat(accountBalance?.volumeAvaiable)}</div>
                </Form.Field>
                <Form.Field label="Khối lượng">
                  <TextFormField name='volume' />
                </Form.Field>
              </div>
            </div>
          </div>
          <div className="border border-bd-default rounded flex flex-col">
            <div className="flex">
              <div className={clsx("py-1 px-4", sideF1 !== "B" ? 'bg-bg-buy' : 'bg-bg-sell')}>Firm 2</div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-2">
              <Form.Field label="Loại lệnh">
                <SelectFormField
                  name='sideF2'
                  options={orderSide}
                  mode="label"
                  value={sideF1 === 'B' ? 'S' : 'B'}
                  disabled
                />
              </Form.Field>
              <Form.Field label="BrokerID">
                <TextFormField name='brokerIdF2' />
              </Form.Field>
              <Form.Field label="TraderId">
                <TextFormField name='traderIdF2' disabled value={form.getValues().brokerIdF2 ? `0${form.getValues().brokerIdF2}1` : ''} />
              </Form.Field>
              <div className="flex gap-1">
                <CheckboxField />
                <div>Đối tác là người nước ngoài</div>
              </div>
            </div>
            <div className='flex gap-2 justify-end mt-auto p-2'>
              <Button className='w-22' variant='close'>Hủy</Button>
              <Button type='submit' className='w-22' variant='success'>Xác nhân</Button>
            </div>
          </div>
        </div>
      </Form >
    </div >
  )
};
export default OrderPutThroughForm;