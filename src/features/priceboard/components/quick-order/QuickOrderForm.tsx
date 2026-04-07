import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import ScaleLoader from "react-spinners/ScaleLoader";
import Button from "../../../../components/common/Button";
import InputOrderPrice from "../../../../components/inputs/InputOrderPrice";
import InputOrderSide from "../../../../components/inputs/InputOrderSide";
import InputOrderVolume from "../../../../components/inputs/InputOrderVolume";
import InputSearchFieldStock from "../../../../components/inputs/InputSearchFieldStock";
import SelectAccount from "../../../../components/inputs/SelectAccField";
import ConfirmOtpModal from "../../../../components/modal/ConfirmOtpModal";
import OrderConfirmModal from "../../../../components/place-order/OrderConfirmModal";
import ShareStockInfo from "../../../../components/place-order/ShareStockInfo";
import { MARKET_ORDERS, PRICE_BY_MARKET_PRICE } from "../../../../configs";
import { useDebounce } from "../../../../hooks/useDebounce";
import { usePrevious } from "../../../../hooks/usePrevious";
import { useToast } from "../../../../hooks/useToast";
import { socketClient } from "../../../../networks/socket";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { selectToken } from "../../../../store/slices/auth/selector";
import {
  selectAccountProfile,
  selectListAccount,
} from "../../../../store/slices/client/selector";
import {
  selectCashBalance,
  selectCashBalanceStatus,
  selectListShareStock,
  selectOrdersStatus,
  selectShareStock,
  selectShareStockStatus,
} from "../../../../store/slices/place-order/selector";
import {
  fetchCashBalanceRequest,
  fetchListOrdersIndayRequest,
  fetchOrdersRequest,
  fetchShareStockCodeRequest,
  resetFetchOrders,
  setSymbolOrder,
} from "../../../../store/slices/place-order/slice";
import { selectQuickOrderSymbol } from "../../../../store/slices/priceboard/selector";
import type { OrderForm } from "../../../../types/placeOrder";
import {
  _convertTradeTp,
  _validPriceHnx,
  _validPriceHose,
  getRandom,
  numberFormat,
  StringToDouble,
  StringToInt,
  validatePriceRange,
  validateTradeType,
  validateVolumeByMarket,
  validateVolumeBySide,
  type MarketOrder,
} from "../../../../utils";

export default function QuickOrderForm() {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<OrderForm>({
    defaultValues: {
      orderSide: "B",
      orderVolume: "",
    },
  });

  const dispatch = useAppDispatch();
  const toast = useToast();

  const token = useAppSelector(selectToken);
  const shareStock = useAppSelector(selectShareStock);
  const accountProfile = useAppSelector(selectAccountProfile);
  const cashBalance = useAppSelector(selectCashBalance);
  const listAccount = useAppSelector(selectListAccount);
  const quickOrderSymbol = useAppSelector(selectQuickOrderSymbol);
  const listShareStock = useAppSelector(selectListShareStock);

  const { loading: loadingShareStock } = useAppSelector(selectShareStockStatus);
  const { loading: loadingOrder, success: successOrder } =
    useAppSelector(selectOrdersStatus);
  const { loading: loadingCashBanlance } = useAppSelector(
    selectCashBalanceStatus
  );

  const orderSymbol = watch("orderSymbol");
  const orderSymbolValue = orderSymbol?.value;
  const orderSide = watch("orderSide");
  const orderVolume = watch("orderVolume");
  const orderPrice = watch("orderPrice");
  const accountCode = watch("accountOrder");

  const debouncedOrderSymbol = useDebounce(orderSymbolValue, 500);
  const debouncedOrderPrice = useDebounce(orderPrice, 500);
  const debouncedOrderVolume = useDebounce(orderVolume, 500);

  const [stepOrder, setStepOrder] = useState<0 | 1 | 2>(0);
  const [dataSubmitOrder, setDataSubmitOrder] = useState<OrderForm>();
  const [txtPriceErr, setTxtPriceErr] = useState<string>("");
  const [txtVolErr, setTxtVolErr] = useState<string>("");

  const preSucccessOrder = usePrevious(successOrder);
  const preOrderVolume = usePrevious(orderVolume);
  const preOrderPrice = usePrevious(orderPrice);
  const preOrderSymbol = usePrevious(orderSymbol);

  const prevSymbolKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      shareStock &&
      orderSymbol &&
      preOrderSymbol &&
      !_.isEqual(orderSymbol, preOrderSymbol)
    ) {
      setValue("orderPrice", shareStock?.lastPrice);
    }
  }, [shareStock, setValue, orderSymbol, preOrderSymbol]);

  useEffect(() => {
    if (!quickOrderSymbol || !listShareStock) return;

    const symbol = listShareStock.find(
      (item) => item.shareCode === quickOrderSymbol.symbol?.split(":")[0]
    );

    const value = symbol
      ? {
        label: symbol.fullName,
        value: symbol.shareCode,
        post_to: symbol.tradeTable,
      }
      : {
        label: "Ngân hàng Thương mại Cổ phần Á Châu",
        value: "ACB",
        post_to: "STO",
      };

    setValue("orderSymbol", value);
    setValue("orderPrice", quickOrderSymbol.price);
  }, [quickOrderSymbol, listShareStock, setValue]);

  useEffect(() => {
    if (
      !successOrder ||
      _.isEqual(successOrder, preSucccessOrder) ||
      !accountCode
    )
      return;

    const handleSuccessOrder = async () => {
      await toast("Đặt lệnh thành công!", "success");
      await dispatch(resetFetchOrders());
      dispatch(
        fetchListOrdersIndayRequest({
          accountCode: accountCode || "",
        })
      );

      dispatch(
        fetchCashBalanceRequest({
          accountCode,
          symbol: orderSymbolValue || "",
          price: debouncedOrderPrice,
          side: orderSide,
        })
      );
    };

    handleSuccessOrder();
  }, [
    successOrder,
    preSucccessOrder,
    dispatch,
    toast,
    accountCode,
    orderSymbolValue,
    debouncedOrderPrice,
    orderSide,
  ]);

  useEffect(() => {
    if (!debouncedOrderSymbol) return;

    dispatch(
      fetchShareStockCodeRequest({
        shareCode: debouncedOrderSymbol,
        volume: StringToInt(debouncedOrderVolume) || 0,
      })
    );
  }, [debouncedOrderSymbol, debouncedOrderVolume, dispatch]);

  useEffect(() => {
    if (!orderSymbol?.value || !orderSymbol?.post_to) return;

    const currentSymbolKey = `${orderSymbol.value}:G1:${orderSymbol.post_to}`;

    if (prevSymbolKeyRef.current !== currentSymbolKey) {
      // Unsubscribe mã cũ
      if (prevSymbolKeyRef.current) {
        socketClient.unsubscribe({ symbols: [prevSymbolKeyRef.current] });
      }

      // Subscribe mã mới
      socketClient.subscribe({ symbols: [currentSymbolKey] });

      // Cập nhật ref để theo dõi
      prevSymbolKeyRef.current = currentSymbolKey;
    }
  }, [orderSymbol?.value, orderSymbol?.post_to]);

  useEffect(() => {
    if (accountProfile && accountProfile?.cAccountDefault) {
      setValue("accountOrder", accountProfile?.cAccountDefault);
    }
  }, [accountProfile, setValue]);

  //Lấy tiền
  useEffect(() => {
    if (!accountCode || !orderSymbolValue || !debouncedOrderPrice || !orderSide)
      return;

    dispatch(
      fetchCashBalanceRequest({
        accountCode,
        symbol: orderSymbolValue,
        price: debouncedOrderPrice,
        side: orderSide,
      })
    );
  }, [accountCode, debouncedOrderPrice, orderSymbolValue, orderSide, dispatch]);

  //Clear sms error validate
  useEffect(() => {
    if (!orderVolume || _.isEqual(orderVolume, preOrderVolume) || !txtVolErr)
      return;
    setTxtVolErr("");
  }, [orderVolume, preOrderVolume, txtVolErr]);

  useEffect(() => {
    if (!orderPrice || _.isEqual(orderPrice, preOrderPrice) || !txtPriceErr)
      return;
    setTxtPriceErr("");
  }, [orderPrice, preOrderPrice, txtPriceErr]);

  useEffect(() => {
    if (!orderSymbol || _.isEqual(preOrderSymbol, orderSymbol)) return;

    dispatch(setSymbolOrder(orderSymbol));
  }, [orderSymbol, preOrderSymbol, dispatch]);

  const handleSubmitOrder = async () => {
    if (!dataSubmitOrder || !token) return;

    const params = {
      accountCode: dataSubmitOrder?.accountOrder || "",
      symbol: dataSubmitOrder?.orderSymbol?.value || "",
      showPrice: dataSubmitOrder?.orderPrice || "",
      volume: dataSubmitOrder?.orderVolume || "",
      orderType: "1",
      refId: token.cUserCode + ".H." + getRandom(),
    };

    const side = orderSide === "B" ? "BUY" : "SELL";

    await dispatch(fetchOrdersRequest({ side, params }));
    setStepOrder(0);
  };

  const onSubmit = async (data: OrderForm) => {
    const { orderSymbol, orderVolume, orderPrice, orderSide } = data;
    const symbol = orderSymbol?.value?.trim();

    // ===== SYMBOL =====
    if (!symbol || ![3, 8, 9].includes(symbol.length)) return;
    if (!shareStock) return;

    const marketCode = shareStock.mc;
    const currentPrice = StringToDouble(shareStock.c) || 0;
    const ceilingPrice = Math.round(currentPrice * 1000);
    const floorPrice = Math.round((StringToDouble(shareStock.f) || 0) * 1000);

    const tradeType = _convertTradeTp((orderPrice + "").toUpperCase());
    const volume = StringToInt(orderVolume);

    // ===== Validate loại giá =====
    if (!validateTradeType(marketCode, tradeType, setTxtPriceErr)) return;

    // ===== Validate giá (LO) =====
    const isLimitOrder = tradeType === "01";
    if (isLimitOrder) {
      const price = StringToDouble(orderPrice);

      if (!validatePriceRange(price, ceilingPrice, floorPrice, setTxtPriceErr))
        return;

      const priceValidator =
        marketCode === "HO" || marketCode === "STO"
          ? _validPriceHose
          : _validPriceHnx;

      if (!priceValidator(price, setTxtPriceErr)) return;
    }

    // ===== Validate khối lượng theo mua bán=====
    if (
      !validateVolumeBySide(orderSide, volume, cashBalance, setTxtVolErr, toast)
    )
      return;

    // ===== Validate KL theo sàn =====
    if (
      !validateVolumeByMarket(
        marketCode,
        tradeType,
        volume,
        setTxtVolErr,
        toast
      )
    )
      return;

    // ===== Submit =====
    setDataSubmitOrder(data);
    setStepOrder(1);
  };

  return (
    <>
      <form
        className="w-full h-full px-2 py-1 bg-surface rounded-lg flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* input chọn tk */}
        <div className="flex flex-row items-center justify-between border-b pb-2 border-border">
          <h1 className="text-base font-bold text-white-50">Đặt lệnh</h1>
          <Controller
            name="accountOrder"
            control={control}
            rules={{ required: "Vui lòng chọn tài khoản" }}
            render={({ field, fieldState }) => (
              <div>
                <SelectAccount
                  value={field.value}
                  onChange={field.onChange}
                  opts={
                    listAccount?.map((item) => ({
                      accCode: item.acccode ?? "",
                      accType: item.acctype ?? "",
                      type: item.type ?? "",
                    })) || []
                  }
                  placeholder="Chọn tài khoản"
                  className="w-[200px]! h-9! rounded-xl! text-xs!"
                  error={fieldState.error}
                />

                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* input search stock */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="flex flex-row gap-3 items-center">
              <Controller
                name="orderSymbol"
                control={control}
                rules={{ required: "Vui lòng chọn mã chứng khoán" }}
                render={({ field, fieldState }) => (
                  <div>
                    <InputSearchFieldStock
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Tìm kiếm mã"
                      className="w-30! form-symbol"
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {orderSymbol?.post_to && orderSymbol?.label && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-text-title items-center">
                    ({orderSymbol?.post_to})
                  </span>{" "}
                  <span className="text-xs font-medium text-text-subtitle h-4 block truncate w-46">
                    {orderSymbol?.label}
                  </span>
                </div>
              )}
            </div>{" "}
            {/* Thông tin mã chứng khoán */}
            <ShareStockInfo
              shareStock={shareStock}
              loading={loadingShareStock}
            />
          </div>
        </div>

        {/* side và loại lệnh */}
        <div className="grid grid-cols-2 gap-4 items-center pb-3">
          <InputOrderSide control={control} name="orderSide" />

          <div>
            <span className="text-xs font-medium text-text-title flex flex-row gap-1 items-center cursor-pointer">
              Lệnh cơ sở
              <IoIosArrowDown />
            </span>
          </div>
        </div>

        {/* Sức mua bán và tỉ lệ kí quỹ */}
        <div className="grid grid-cols-2 gap-4 items-center pb-3">
          {/* Cột trái */}
          <div className="flex flex-row gap-1 text-xs items-center">
            <span>Sức mua: </span>
            {!loadingCashBanlance && cashBalance ? (
              <span>{numberFormat(cashBalance.cashAvaiable, 0, "0")} VND</span>
            ) : (
              <div className="h-4 w-20 bg-gray-300/40 rounded animate-pulse" />
            )}
          </div>

          {/* Cột phải */}
          <div className="flex flex-row gap-1 text-xs items-center">
            <span>Tỉ lệ kí quỹ</span>
            {!loadingCashBanlance && cashBalance ? (
              <span
                className={`${cashBalance.marginratio === "1"
                  ? "text-stock-text-purple"
                  : "text-text-subtitle"
                  }`}
              >
                {StringToDouble(cashBalance.marginratio) * 100}%
              </span>
            ) : (
              <div className="h-4 w-10 bg-gray-300/40 rounded animate-pulse" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          {/* input khối lượng */}
          <div
            className={`h-[88px] px-3.5 pt-2.5 pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:border! focus-within:border-yellow-500! focus-within:shadow-[0_0_0_2px_rgba(250,204,21,0.3)]! caret-DTND-200 ${errors.orderVolume?.message || txtVolErr
              ? "border! border-red-500!"
              : ""
              }`}
          >
            <div className="flex flex-row items-center justify-between pb-3.5">
              <h2 className="text-xs">
                Khối lượng
                <span className="text-red-500"> *</span>
              </h2>

              {orderSide === "B" ? (
                <span className="text-xs">
                  KL mua tối đa:{" "}
                  {!loadingCashBanlance && cashBalance ? (
                    <span className="text-green-400">
                      {numberFormat(cashBalance.volumeAvaiable)}
                    </span>
                  ) : (
                    <span className="inline-block h-4 w-16 bg-gray-300/40 rounded animate-pulse align-middle" />
                  )}
                </span>
              ) : (
                <span className="text-xs">
                  KL bán tối đa:{" "}
                  {!loadingCashBanlance && cashBalance ? (
                    <span className="text-red-400">
                      {numberFormat(cashBalance.volumeAvaiable)}
                    </span>
                  ) : (
                    <span className="inline-block h-4 w-16 bg-gray-300/40 rounded animate-pulse align-middle" />
                  )}
                </span>
              )}
            </div>
            <Controller
              name="orderVolume"
              control={control}
              rules={{
                required: "Vui lòng nhập số lượng",
                min: { value: 0, message: "Số lượng phải >= 0" },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <InputOrderVolume
                    placeholder={`0 ${orderSymbol?.value || "ACB"}`}
                    step={100}
                    min={0}
                    max={9999999999999}
                    className="h-7! text-[20px]"
                    required
                    {...field}
                  />
                  {(error || txtVolErr) && (
                    <p className="text-red-500 text-xs">
                      {error?.message || txtVolErr}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* input giá */}
          <div
            className={`px-2.5 pt-1.5 pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:border! focus-within:border-yellow-500! focus-within:shadow-[0_0_0_2px_rgba(250,204,21,0.3)]! caret-DTND-200 ${errors.orderPrice?.message || txtPriceErr
              ? "border! border-red-500!"
              : ""
              }`}
          >
            <div className="flex flex-row gap-2 items-center justify-between pb-3.5">
              <h2 className="text-xs whitespace-nowrap">
                Giá đặt
                <span className="text-red-500"> *</span>
              </h2>
              {/* Nút chọn nhanh lệnh thị trường */}
              <div className="flex flex-wrap gap-1.5 justify-end">
                {shareStock?.sym &&
                  _.find(
                    PRICE_BY_MARKET_PRICE,
                    (o) => o.market === shareStock.mc
                  )?.value.map((order) => (
                    <button
                      key={order}
                      type="button"
                      onClick={() => {
                        setValue("orderPrice", order);
                        document.getElementById("orderPrice-input")?.focus();
                      }}
                      className="px-2.5 py-1 text-xs font-medium bg-gray-300 hover:bg-gray-400 rounded-md transition-colors duration-150"
                    >
                      {order}
                    </button>
                  ))}
              </div>
            </div>
            <Controller
              name="orderPrice"
              control={control}
              rules={{
                required: "Vui lòng nhập giá hoặc loại lệnh",
                validate: (value) => {
                  if (!value) return "Vui lòng nhập giá hoặc loại lệnh";

                  const val = value.toString().trim().toUpperCase();

                  if (MARKET_ORDERS.includes(val as MarketOrder)) return true;

                  const num = parseFloat(val.replace(/,/g, ""));
                  if (isNaN(num) || num < 0) return "Giá không hợp lệ";

                  return true;
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                const displayError = txtPriceErr
                  ? { message: txtPriceErr }
                  : error;

                return (
                  <div>
                    <InputOrderPrice
                      placeholder="0"
                      step={0.1}
                      min={0}
                      max={999999}
                      className="h-7! text-[20px]"
                      required
                      value={value}
                      onChange={onChange}
                    />
                    {displayError && (
                      <p className="text-red-500 text-xs">
                        {displayError.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>

        {/* btn submit */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm font-medium text-text-title">
              Giá trị lệnh
            </span>
            <span className="text-text-title text-[20px] font-semibold ">
              {orderPrice && orderVolume
                ? numberFormat(
                  StringToDouble(orderPrice) * 1000 * StringToInt(orderVolume)
                )
                : "-"}{" "}
              ₫
            </span>
          </div>
          <Button
            variant={`${orderSide === "B"
              ? "success"
              : orderSide === "S"
                ? "danger"
                : "close"
              }`}
            fullWidth
            type="submit"
            disabled={isSubmitting || loadingShareStock || stepOrder !== 0}
            className="h-10!"
          >
            {loadingShareStock ? <ScaleLoader height={25} /> : "Đặt lệnh"}
          </Button>
        </div>
      </form>
      {stepOrder === 1 && dataSubmitOrder && (
        <OrderConfirmModal
          isOpen={stepOrder === 1}
          onClose={() => setStepOrder(0)}
          data={dataSubmitOrder}
          onSubmit={() => setStepOrder(2)}
        />
      )}
      {stepOrder === 2 && (
        <ConfirmOtpModal
          isOpen={stepOrder === 2}
          onClose={() => setStepOrder(0)}
          onPre={() => setStepOrder(1)}
          onSubmit={() => handleSubmitOrder()}
          loading={loadingOrder}
        />
      )}
    </>
  );
}
