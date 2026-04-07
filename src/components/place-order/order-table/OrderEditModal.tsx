import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { MARKET_ORDERS } from "../../../configs";
import { useDebounce } from "../../../hooks/useDebounce";
import { usePrevious } from "../../../hooks/usePrevious";
import { useToast } from "../../../hooks/useToast";
import { apiRequest } from "../../../networks/apiRequest";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { selectChangeOrdersStatus } from "../../../store/slices/place-order/selector";
import {
  fetchChangeOrderRequest,
  resetChangeOrder,
} from "../../../store/slices/place-order/slice";
import type {
  CashBalance,
  OrderForm,
  OrderTable,
  ShareStock,
} from "../../../types";
import {
  _convertTradeTp,
  _validPriceHnx,
  _validPriceHose,
  numberFormat,
  StringToDouble,
  StringToInt,
  type MarketOrder,
} from "../../../utils";
import Button from "../../common/Button";
import InputOrderPrice from "../../inputs/InputOrderPrice";
import InputOrderVolume from "../../inputs/InputOrderVolume";
import ConfirmOtpModal from "../../modal/ConfirmOtpModal";

const customStyles = {
  content: {
    top: "50%",
    transform: "translateY(-50%)",
    bottom: "auto",
    left: "calc( 50% - 260px )",
    height: "auto",
    width: "520px",
    padding: "0",
    borderWidth: "0px",
    overflow: "inherit",
    borderRadius: "16px",
    background: "transparent",
  },
};

export default function OrderEditModal({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: OrderTable | undefined;
}) {
  const toast = useToast();

  const dispatch = useAppDispatch();

  const { loading, success } = useAppSelector(selectChangeOrdersStatus);

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<OrderForm>({});

  const orderPrice = watch("orderPrice");
  const orderVolume = watch("orderVolume");

  const debouncedOrderPrice = useDebounce(orderPrice, 500);

  const preOrderVolume = usePrevious(orderVolume);
  const preSuccess = usePrevious(success);

  const [step, setStep] = useState<1 | 2>(1);
  const [txtPriceErr, setTxtPriceErr] = useState<string>("");
  const [txtVolErr, setTxtVolErr] = useState<string>("");
  const [shareStock, setShareStock] = useState<ShareStock | null>(null);
  const [cashBalance, setCashBalance] = useState<CashBalance | null>(null);
  const [loadingCashBanlance, setLoadingCashBanlance] = useState(false);

  useEffect(() => {
    if (data) {
      setValue("orderPrice", data.price);
      setValue("orderVolume", data.volume);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (
      !data ||
      !data.symbol ||
      !orderVolume ||
      _.isEqual(orderVolume, preOrderVolume)
    )
      return;

    const fetchShareStock = async () => {
      try {
        const res = await apiRequest.get(
          `/reference/shares/${data.symbol}?volume=${orderVolume ?? 0}`
        );
        if (res?.data?.rc === 1) {
          setShareStock(res?.data.data);
        } else {
          toast(res?.data?.msg || "Lỗi dữ liệu", "error");
        }
      } catch (error) {
        toast("Có lỗi xảy ra", "error");
        console.error(error);
      }
    };

    fetchShareStock();
  }, [data, toast]);

  useEffect(() => {
    const accountCode = data?.accountCode;
    const symbol = data?.symbol;
    const side = data?.side;

    if (!accountCode || !symbol || !debouncedOrderPrice || !side) {
      return;
    }

    let isCancel = false;

    const fetchCashBalance = async () => {
      try {
        setLoadingCashBanlance(true);

        const params = {
          accountCode,
          symbol,
          price: debouncedOrderPrice,
          side,
        };

        const res = await apiRequest.post(`/cash/balance`, params);

        if (!isCancel) {
          if (res?.data?.rc === 1) {
            setCashBalance(res.data.data);
          } else {
            toast(res.data?.msg || "Lỗi dữ liệu", "error");
          }
        }
      } catch (error) {
        if (!isCancel) console.error(error);
      } finally {
        if (!isCancel) setLoadingCashBanlance(false);
      }
    };

    fetchCashBalance();

    return () => {
      isCancel = true;
    };
  }, [data?.accountCode, data?.symbol, data?.side, debouncedOrderPrice]);

  useEffect(() => {
    if (success && !_.isEqual(success, preSuccess)) {
      toast("Sửa lệnh thành công", "success");
      dispatch(resetChangeOrder());
      handleCloseModal();
    }
  }, [success, preSuccess]);

  const handleEditOrder = async (otp: string) => {
    const dataForm = getValues();

    const { orderVolume, orderPrice } = dataForm;

    const params = {
      orderNo: data?.orderNo + "",
      price: StringToDouble(orderVolume),
      volume: StringToDouble(orderPrice),
      orderType: data?.side + "",
    };

    dispatch(fetchChangeOrderRequest({ params, otp }));
  };

  const onSubmit = async (dataForm: OrderForm) => {
    const { orderVolume, orderPrice } = dataForm;
    const symbol = (data && data.symbol?.trim?.()) || "";

    if (orderVolume === data?.volume && orderPrice === data?.price) {
      toast("Lệnh không thay đổi", "warning");
      return;
    }

    // ===Validate symbol ===
    if (!symbol || ![3, 8, 9].includes(symbol.length)) {
      return;
    }

    if (!shareStock) return;

    const currentPrice = StringToDouble(shareStock.c) || 0;
    const ceilingPrice = Math.round(currentPrice * 1000);
    const floorPrice = Math.round((StringToDouble(shareStock.f) || 0) * 1000);
    const marketCode = shareStock.mc; // HO, STO, HA, STX, UP, UPX,...

    const tradeType = _convertTradeTp((orderPrice + "").toUpperCase());
    const volume = StringToInt(orderVolume);

    // === 2. Validate loại giá  ===
    if (tradeType === "00") {
      setTxtPriceErr("Giá đặt không hợp lệ");
      return;
    }

    // HSX không cho MOK/MAK/PLO
    if (
      (marketCode === "HO" || marketCode === "STO") &&
      ["06", "07", "08"].includes(tradeType)
    ) {
      setTxtPriceErr("HSX không đặt giá MOK/MAK/PLO");
      return;
    }

    // HNX không cho MP
    if ((marketCode === "HA" || marketCode === "STX") && tradeType === "04") {
      setTxtPriceErr("HNX không đặt giá MP");
      return;
    }

    // UPCOM chỉ được đặt ATO/ATC (01)
    if ((marketCode === "UP" || marketCode === "UPX") && tradeType !== "01") {
      setTxtPriceErr("UPCOM không đặt giá thị trường");
      return;
    }

    // === Validate giá (nếu là lệnh giới hạn - tradeType 01) ===
    if (tradeType === "01") {
      const price = StringToDouble(orderPrice);

      // Kiểm tra biên độ trần sàn
      if (
        Math.round(price * 1000) > ceilingPrice ||
        Math.round(price * 1000) < floorPrice
      ) {
        setTxtPriceErr("Giá nằm ngoài biên độ Trần, Sàn");
        return;
      }

      // Kiểm tra bước giá theo sàn
      const isValidStepPrice =
        marketCode === "HO" || marketCode === "STO"
          ? _validPriceHose(price, setTxtPriceErr)
          : _validPriceHnx(price, setTxtPriceErr);

      if (!isValidStepPrice) return;
    }

    // === Validate khối lượng ===
    if (data?.side === "B") {
      const availableCashVolume = StringToInt(
        cashBalance?.volumeAvaiable || "0"
      );
      if (volume > availableCashVolume) {
        toast("Không đủ tiền để thực hiện giao dịch", "error");
        return;
      }
    }

    if (data?.side === "S") {
      const sellableVolume = StringToInt(cashBalance?.balance || "0");
      if (volume > sellableVolume) {
        setTxtVolErr("Vượt khối lượng có thể bán");
        return;
      }
    }

    setStep(2);
  };

  const handleCloseModal = () => {
    setStep(1);
    setTxtPriceErr("");
    setTxtVolErr("");
    setShareStock(null);
    setCashBalance(null);
    setLoadingCashBanlance(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {step === 1 && (
        <Modal
          isOpen={isOpen}
          contentLabel="Sửa lệnh đặt"
          ariaHideApp={false}
          style={customStyles}
          closeTimeoutMS={25}
          overlayClassName="ReactModal__Overlay"
          className="ReactModal__Content"
        >
          <motion.div
            key="edit-order-modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-4 bg-cover bg-no-repeat bg-center rounded-xl"
          >
            <form
              className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-background-primary"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={`flex flex-row items-center justify-between `}>
                <h1 className="text-text-title text-[20px] text-bold">
                  Sửa lệnh
                </h1>

                <div
                  className="cursor-pointer p-1 hover:bg-gray-300 rounded-full"
                  onClick={handleCloseModal}
                >
                  <IoClose className="w-7 h-7 text-text-subtitle cursor-pointer" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-base text-sm">
                  Thông tin đặt lệnh chứng khoán
                </h2>
                <div className="p-2 border border-border rounded-xl flex flex-col gap-2">
                  {/* Tài khoản, mã ck */}
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-xs font-normal text-text-title">
                      <span className="text-text-subtitle">Tài khoản: </span>
                      {data?.accountCode}
                    </span>
                    <span className="text-xs font-normal text-text-title text-center">
                      <span className="text-text-subtitle">Mã CK: </span>
                      {data?.symbol}
                    </span>
                    <span className="text-xs font-normal text-text-title text-right">
                      <span className="text-text-subtitle">Mua/Bán: </span>
                      <span className={`${data?.side === "B" ? "u" : "d"}`}>
                        {data?.side === "B" ? "Mua" : "Bán"}
                      </span>
                    </span>
                  </div>

                  {/* Khối lượng giá đặt */}
                  <div className="flex flex-col gap-2">
                    {/* input khối lượng */}
                    <div
                      className={`h-20 px-3.5 pt-2.5 pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:border! focus-within:border-yellow-500! focus-within:shadow-[0_0_0_2px_rgba(250,204,21,0.3)]! caret-DTND-200 ${errors.orderVolume?.message || txtVolErr
                        ? "border! border-red-500!"
                        : ""
                        }`}
                    >
                      <div className="flex flex-row items-center justify-between pb-3.5">
                        <h2 className="text-xs text-text-title">
                          Khối lượng
                          <span className="text-red-500"> *</span>
                        </h2>
                        {data?.side === "B" ? (
                          <span className="text-xs text-text-title">
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
                          <span className="text-xs text-text-title">
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
                              placeholder={`0 ${data?.symbol || "ACB"}`}
                              step={100}
                              min={0}
                              max={9999999999999}
                              className="h-6! text-base"
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
                      className={`h-21 px-3.5 pt-2.5 pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:border! focus-within:border-yellow-500! focus-within:shadow-[0_0_0_2px_rgba(250,204,21,0.3)]! caret-DTND-200 ${errors.orderPrice?.message || txtPriceErr
                        ? "border! border-red-500!"
                        : ""
                        }`}
                    >
                      <div className="flex flex-row items-center justify-between pb-3.5">
                        <h2 className="text-xs text-text-title">
                          Giá đặt
                          <span className="text-red-500"> *</span>
                        </h2>
                        {/* Nút chọn nhanh lệnh thị trường */}
                        {/* <div className="flex flex-wrap gap-1.5">
                          {data?.symbol &&
                            _.find(
                              PRICE_BY_MARKET_PRICE,
                              (o) => o.market === data.tradeTable
                            )?.value.map((order, idx) => (
                              <button
                                key={`${order}-${idx}`}
                                type="button"
                                onClick={() => {
                                  setValue("orderPrice", order);
                                  document
                                    .getElementById("orderPrice-input")
                                    ?.focus();
                                }}
                                className="px-2.5 py-1 text-xs font-medium bg-gray-300 hover:bg-gray-400 rounded-md transition-colors duration-150 text-text-title"
                              >
                                {order}
                              </button>
                            ))}
                        </div> */}
                      </div>
                      <Controller
                        name="orderPrice"
                        control={control}
                        rules={{
                          required: "Vui lòng nhập giá hoặc loại lệnh",
                          validate: (value) => {
                            if (!value)
                              return "Vui lòng nhập giá hoặc loại lệnh";

                            const val = value.toString().trim().toUpperCase();

                            if (MARKET_ORDERS.includes(val as MarketOrder))
                              return true;

                            const num = parseFloat(val.replace(/,/g, ""));
                            if (isNaN(num) || num < 0)
                              return "Giá không hợp lệ";

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
                                className="h-6! text-base"
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
                </div>
              </div>

              <div className="flex items-center flex-row-reverse gap-4">
                <Button
                  variant="primary"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="h-10!"
                >
                  Xác nhận
                </Button>
                <Button
                  variant="close"
                  fullWidth
                  className="h-10!"
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting || loading}
                >
                  Quay lại
                </Button>
              </div>
            </form>
          </motion.div>
        </Modal>
      )}
      {step === 2 && (
        <ConfirmOtpModal
          isOpen={step === 2}
          onPre={() => setStep(1)}
          onSubmit={handleEditOrder}
          loading={loading}
          onClose={handleCloseModal}
        />
      )}
    </AnimatePresence>
  );
}
