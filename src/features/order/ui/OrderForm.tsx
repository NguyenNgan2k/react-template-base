import Button from '@/components/common/Button';
import MaskFormField from '@/components/inputs/mask/MaskFormField';
import TextFormField from '@/components/inputs/text/TextFormField';
import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoToggle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import OrderConfirm from './OrderConfirm';
import { minusPrice, minusVolume, plusPrice, plusVolume, validatePrice, validateVolume } from '../orderBusiness';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { showToast } from "@/hooks/useToast";
import { numberFormat, StringToDouble } from '@/utils';
import { fetchAccountBalanceRequest, fetchAccountInfoRequest, fetchAccountPortfolioRequest, selectAccountBalance, selectAccountPortfolio } from '@/features/account/redux/accountSlice';
import type { AccountBalanceRequest, AccountPortfolioRequest } from '@/features/account/accountType';
import { fetchStockInfoRequest, selectStockInfo } from '@/features/stock/redux/stockSlice';
import type { StockInfoRequest } from '@/features/stock/stockType';
import { useAppSelector } from '@/store/hook';
import { getNameMarket } from '@/features/stock/stockBusiness';

type FormValues = {
  account: string;
  symbol: string;
  price: string;
  volume: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
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
    .matches(/^\d+$/, "Khối lượng phải là số nguyên dương")
})

const OrderForm = () => {
  const dispatch = useDispatch()

  const { stockInfo, accountBalance } = useAppSelector(state => ({
    stockInfo: selectStockInfo(state),
    accountBalance: selectAccountBalance(state),
  }));

  const [isOpenOrderConfirm, setIsOpenOrderConfirm] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const orderValue: number = ((StringToDouble(form.watch().price) * 1000) * StringToDouble(form.watch().volume))

  const onSubmit = (data: FormValues) => {
    event?.preventDefault();

    let validPrice = validatePrice(data.price, 0, 0, []);
    if (!validPrice.isValid) {
      form.setError("price", { type: "error", });
      validPrice.message && showToast(validPrice.message, "warning");
      return;
    }

    let validVolume = validateVolume(data.volume);
    if (!validVolume.isValid) {
      form.setError("volume", { type: "error", });
      validVolume.message && showToast(validVolume.message, "warning");
      return;
    }
    setIsOpenOrderConfirm(true)
  }

  const handleOnClickChangePrice = (type: 'plus' | 'minus') => {
    if (!stockInfo) return
    const currentPrice = StringToDouble(form.getValues().price);
    let newPrice;
    if (type === 'plus') {
      newPrice = plusPrice(currentPrice, stockInfo.c, stockInfo.f, stockInfo.r, stockInfo.step);
    } else {
      newPrice = minusPrice(currentPrice, stockInfo.c, stockInfo.f, stockInfo.r, stockInfo.step);
    }

    form.setValue('price', newPrice.toString());
  }

  const handleOnClickChangeVolume = (type: 'plus' | 'minus') => {
    const currentVolume = StringToDouble(form.getValues().volume);
    let newVolume;
    if (type === 'plus') {
      newVolume = plusVolume(currentVolume, 100);
    } else {
      newVolume = minusVolume(currentVolume, 100);
    }
    form.setValue('volume', newVolume.toString());
  }

  const handleOnBlurAccount = () => {
    const account = form.getValues().account;
    handleFetchAccountInfo(account);
    handleFetchAccountBalance(account);
    handleFetchAccountPortfolio(account);
  }

  const handleOnBlurSymbol = () => {
    const symbol = form.getValues().symbol.toUpperCase();
    const account = form.getValues().account;
    handleFetchStockInfo(symbol);
    handleFetchAccountBalance(account);
  }

  const handleFetchAccountInfo = (account: string) => {
    if (!account) return;
    dispatch(fetchAccountInfoRequest({ account }));
  }

  const handleFetchAccountPortfolio = (account: string) => {
    if (!account) return;
    const params: AccountPortfolioRequest = {
      account: account,
      data: {
        page: 1,
        number: 1000
      }
    }
    dispatch(fetchAccountPortfolioRequest(params))
  }

  const handleFetchStockInfo = (symbol: string) => {
    if (!symbol) return;
    const params: StockInfoRequest = {
      stock: symbol,
      data: {
        account: form.getValues().account,
        volume: form.getValues().volume,
        type: 'N'
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

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          Mode:
          <IoToggle className='text-xl' />
        </div>
        <div className='w-3xs mx-2'>
          <div className='h-6 p-0.5 flex justify-between border-b border-bd-default'>
            <span>Tỷ lệ ký quỹ</span>
            <span>{accountBalance?.im_ck ? `${accountBalance?.im_ck}%` : '-'}</span>
          </div>
          <div className='h-6 p-0.5 flex justify-between border-b border-bd-default'>
            <span>GT đặt lệnh</span>
            <span>{numberFormat(orderValue) || 0}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          Ngày giao dịch
        </div>
        <div className='flex gap-2'>
          <span className='pill c'>{stockInfo?.c || '...'}</span>
          <span className='pill f'>{stockInfo?.f || '...'}</span>
          <span className='pill r'>{stockInfo?.r || '...'}</span>
          <span className='pill'>Sàn: {stockInfo?.mc && getNameMarket(stockInfo?.mc) || '...'}</span>
          <span className='pill'>Bảng:{stockInfo?.board_id || '...'}</span>
        </div>
        <div></div>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-6 gap-1'>
            <div className='flex flex-col items-center'>
              <span>Loại</span>
              <div className='py-1 h-7 w-full bg-bg-elevated-3 text-center'>Mua</div>
            </div>
            <div className='flex flex-col items-center'>
              <span>Tài khoản</span>
              <TextFormField
                name='account'
                maxLength={7}
                showErrorMessage={false}
                onBlur={handleOnBlurAccount}
              />
            </div>
            <div className='flex flex-col items-center'>
              <span>Mã CK</span>
              <TextFormField
                name='symbol'
                showErrorMessage={false}
                onBlur={handleOnBlurSymbol}
              />
            </div>
            <div className='flex flex-col items-center'>
              <span>Giá</span>
              <TextFormField
                name='price'
                showErrorMessage={false}
                prefixIcon={<FiPlus onClick={() => handleOnClickChangePrice('plus')} />}
                suffixIcon={<FiMinus onClick={() => handleOnClickChangePrice('minus')} />}
              />
            </div>
            <div className='flex flex-col items-center'>
              <span>Khối lượng</span>
              <MaskFormField
                name='volume'
                showErrorMessage={false}
                prefixIcon={<FiPlus onClick={() => handleOnClickChangeVolume('plus')} />}
                suffixIcon={<FiMinus onClick={() => handleOnClickChangeVolume('minus')} />}
              />
            </div>
            <div className='flex flex-col justify-end mb-1'>
              <Button type='submit' className='w-22' variant='success'>Xác nhân</Button>
            </div>
          </div>
        </form>
      </FormProvider >
      {
        isOpenOrderConfirm && <OrderConfirm onClose={() => setIsOpenOrderConfirm(false)} />
      }
    </div>
  )
}

export default OrderForm;