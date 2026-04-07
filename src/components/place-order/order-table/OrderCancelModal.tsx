import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import _ from "lodash";
import type { OrderTable } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { useToast } from "../../../hooks/useToast";
import { selectCancelOrdersStatus } from "../../../store/slices/place-order/selector";
import { usePrevious } from "../../../hooks/usePrevious";
import {
  fetchCancelOrderRequest,
  resetCancelOrder,
} from "../../../store/slices/place-order/slice";
import Button from "../../common/Button";
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

export default function OrderCancelModal({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: OrderTable | undefined;
}) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { loading, success } = useAppSelector(selectCancelOrdersStatus);

  const [step, setStep] = useState<1 | 2>(1);

  const preSuccess = usePrevious(success);

  useEffect(() => {
    if (success && !_.isEqual(success, preSuccess)) {
      toast("Hủy lệnh thành công", "success");
      dispatch(resetCancelOrder());
      handleCloseModal();
    }
  }, [success, preSuccess]);

  const handleOrderCancel = (otp: string) => {
    if (!data) return;

    const params = {
      orderNo: data?.orderNo + "",
      orderType: data?.orderType + "",
    };

    dispatch(fetchCancelOrderRequest({ params, otp }));
  };

  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {step === 1 && (
        <Modal
          isOpen={isOpen}
          contentLabel="Hủy lệnh đặt"
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
            className="flex flex-col gap-4 bg-cover bg-no-repeat bg-center rounded-xl "
          >
            <div className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-background-primary">
              <div className={`flex flex-row items-center justify-between `}>
                <h1 className="text-text-title text-[20px] text-bold">
                  Hủy lệnh
                </h1>

                <div
                  className="cursor-pointer p-1 hover:bg-gray-300 rounded-full"
                  onClick={onClose}
                >
                  <IoClose className="w-7 h-7 text-text-subtitle cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-text-base text-sm">
                  Thông tin hủy lệnh chứng khoán
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
                      <span className="text-text-subtitle">Lệnh: </span>
                      <span className={`${data?.side === "B" ? "u" : "d"}`}>
                        {data?.side === "B" ? "Mua" : "Bán"}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-xs font-normal text-text-title">
                      <span className="text-text-subtitle">Giá: </span>
                      {data?.price}
                    </span>
                    <span className="text-xs font-normal text-text-title text-right">
                      <span className="text-text-subtitle">Số lượng: </span>
                      {data?.volume}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-row-reverse gap-4">
                <Button
                  variant="danger"
                  fullWidth
                  type="submit"
                  className="h-10!"
                  onClick={() => setStep(2)}
                >
                  Hủy lệnh
                </Button>
                <Button
                  variant="close"
                  fullWidth
                  className="h-10!"
                  type="button"
                  onClick={onClose}
                >
                  Quay lại
                </Button>
              </div>
            </div>
          </motion.div>
        </Modal>
      )}
      {step === 2 && (
        <ConfirmOtpModal
          isOpen={step === 2}
          onPre={() => setStep(1)}
          onSubmit={handleOrderCancel}
          onClose={onClose}
          loading={loading}
        />
      )}
    </AnimatePresence>
  );
}
