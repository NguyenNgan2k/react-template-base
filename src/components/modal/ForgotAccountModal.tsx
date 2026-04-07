import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import ScaleLoader from "react-spinners/ScaleLoader";
import * as yup from "yup";
import bgLogin from "../../assets/imgs/bg-login.png";
import logo from "../../assets/imgs/logo.png";
import { usePrevious } from "../../hooks/usePrevious";
import { useToast } from "../../hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  selectCheckCardId,
  selectCheckCardIdStatus,
  selectForgotAccountModalOpen,
} from "../../store/slices/client/selector";
import {
  closeForgotLoginModal,
  fetchCheckCardIdRequest,
  openLoginModal,
  resetFetchCheckCardId,
} from "../../store/slices/client/slice";
import type { ForgotAccountForm } from "../../types";
import { validatePasswordRules } from "../../utils/auth";
import Button from "../common/Button";
import InputField from "../inputs/InputField";
import ConfirmOtpModal from "./ConfirmOtpModal";

const customStyles = {
  content: {
    top: "50%",
    transform: "translateY(-50%)",
    bottom: "auto",
    left: "calc( 50% - 250px )",
    height: "auto",
    width: "500px",
    padding: "0",
    borderWidth: "0px",
    overflow: "inherit",
    borderRadius: "16px",
    background: "transparent",
  },
};

const schema = yup.object({
  accountCode: yup
    .string()
    .required("Vui lòng nhập tài khoản")
    .matches(/^\d{6}$/, "Tài khoản không hợp lệ"),

  cardId: yup
    .string()
    .required("Vui lòng nhập căn cước công dân")
    .matches(/^\d{12}$/, "CCCD không hợp lệ"),

  passwordNew: yup.string().required("Vui lòng nhập mật khẩu"),

  passwordConfirm: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu mới")
    .oneOf([yup.ref("passwordNew")], "Mật khẩu không trùng khớp"),
});

export default function ForgotAccountModal() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const isOpen = useAppSelector(selectForgotAccountModalOpen);
  const checkCard = useAppSelector(selectCheckCardId);
  const { loading: loadingCheckCard } = useAppSelector(selectCheckCardIdStatus);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotAccountForm>({
    resolver: yupResolver(schema),
  });

  const passwordNew = watch("passwordNew") || "";

  const [step, setStep] = useState<1 | 2>(1);

  const rules = validatePasswordRules(passwordNew);

  const ruleList = [
    { id: "length", label: "8 - 16 ký tự", ok: rules.length },
    {
      id: "uppercase",
      label: "Ít nhất 1 chữ cái viết hoa",
      ok: rules.uppercase,
    },
    { id: "number", label: "Ít nhất 1 số", ok: rules.number },
    { id: "special", label: "Ít nhất 1 ký tự đặc biệt", ok: rules.special },
  ];

  const preCheckCard = usePrevious(checkCard);

  useEffect(() => {
    return () => {
      dispatch(resetFetchCheckCardId());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!checkCard || _.isEqual(preCheckCard, checkCard)) return;
    setStep(2);
  }, [checkCard, preCheckCard, dispatch]);

  const handleClickLogin = () => {
    onClose();
    dispatch(openLoginModal());
    setStep(1);
    reset();
  };

  const handleResetWhenForget = async (otp: string) => {
    try {
      if (!checkCard) return;
      const data = getValues();

      const { passwordNew, cardId } = data;

      const sessionId = checkCard?.sessionId;

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/password/reset-forgot`,
        {
          cardId: cardId,
          passWord: passwordNew,
        },
        {
          headers: {
            "X-Session-ID": sessionId,
            "X-Otp": otp,
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.rc === 1) {
        toast("Đổi mật khẩu thành công!", "success");
        handleClickLogin();
      } else {
        toast(res?.data?.msg, "error");
      }
    } catch (error) {
      let errorMessage = "Failed to fetch info index";

      if (axios.isAxiosError(error)) {
        // Nếu server trả về JSON chứa msg
        errorMessage = error.response?.data?.msg || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast(errorMessage || "Có lỗi xảy ra!", "error");
    }
  };

  const onClose = () => {
    dispatch(closeForgotLoginModal());
    reset();
  };

  const onSubmit = async (data: ForgotAccountForm) => {
    const isPasswordValid =
      rules.length && rules.uppercase && rules.number && rules.special;

    if (!isPasswordValid) {
      return;
    }

    const { accountCode, cardId } = data;

    const params = {
      accountCode,
      cardId,
    };
    dispatch(fetchCheckCardIdRequest(params));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {step === 1 && (
            <Modal
              isOpen={isOpen}
              contentLabel="Quên mật khẩu"
              ariaHideApp={false}
              style={customStyles}
              closeTimeoutMS={25} // phải trùng với thời gian transition
              overlayClassName="ReactModal__Overlay"
              className="ReactModal__Content"
            >
              <motion.div
                layout
                key="forgot-account-modal"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut",
                }}
                className="flex flex-col gap-4 bg-cover bg-no-repeat bg-center rounded-xl"
                style={{
                  backgroundImage: `url(${bgLogin})`,
                }}
              >
                <div
                  className="flex flex-col gap-4 p-4 bg-cover bg-no-repeat bg-center rounded-xl border border-border"
                  style={{
                    backgroundImage: `url(${bgLogin})`,
                  }}
                >
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="text-sm font-bold text-text-title">
                      CHÀO MỪNG NHÀ ĐẦU TƯ
                      <br /> ĐẾN VỚI NỀN TẢNG GIAO DỊCH DTND
                    </h2>
                    <IoClose
                      className="w-7 h-7 text-text-subtitle cursor-pointer"
                      onClick={onClose}
                    />
                  </div>

                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                      <img src={logo} alt="logo" className="w-36 h-13" />
                      <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-black text-text-title">
                          Bạn quên mật khẩu?
                        </h2>
                        <h3 className="text-sm font-medium text-text-subtitle">
                          Vui lòng nhập các thông tin đã được đăng ký với DTND
                          dưới đây để thiết lập lại mật khẩu.
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-8"
                  >
                    <div className="flex flex-col gap-3">
                      <InputField
                        label="Số tài khoản"
                        placeholder="Nhập số tài khoản"
                        error={errors.accountCode}
                        registration={register("accountCode")}
                        className="h-12!"
                        autoFocus={true}
                        requied={true}
                      />

                      <InputField
                        label="Số CCCD"
                        placeholder="Nhập số CCCD"
                        error={errors.cardId}
                        registration={register("cardId")}
                        className="h-12!"
                        requied={true}
                      />

                      <div className="flex flex-col">
                        <InputField
                          label="Mật khẩu mới"
                          type="password"
                          typeInput="password"
                          placeholder="Nhập mật khẩu"
                          error={errors.passwordNew}
                          registration={register("passwordNew")}
                          className="h-12!"
                          requied={true}
                        />

                        <motion.ul
                          layout
                          className="ml-4 text-red-500 space-y-1 text-xs font-medium overflow-hidden"
                          style={{
                            minHeight:
                              passwordNew && ruleList.some((r) => !r.ok)
                                ? "1.5em mt-2"
                                : "0",
                          }}
                        >
                          <AnimatePresence mode="popLayout">
                            {passwordNew &&
                              ruleList
                                .filter((r) => !r.ok)
                                .map((r) => (
                                  <motion.li
                                    key={r.id}
                                    layout="position" // mượt khi thêm/xóa
                                    className="overflow-hidden"
                                  >
                                    <span className="flex items-center gap-1 pt-1">
                                      <GoDotFill />
                                      {r.label}
                                    </span>
                                  </motion.li>
                                ))}
                          </AnimatePresence>
                        </motion.ul>
                      </div>

                      <InputField
                        label="Nhập lại mật khẩu"
                        type="password"
                        typeInput="password"
                        placeholder="Nhập lại mật khẩu"
                        error={errors.passwordConfirm}
                        registration={register("passwordConfirm")}
                        className="h-12!"
                        requied={true}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <span className="text-sm font-semibold text-text-base ml-auto">
                        Bạn đã nhớ ra mật khẩu?{" "}
                        <span
                          className="text-sm font-semibold text-DTND-200 hover:text-DTND-300 cursor-pointer hover:underline"
                          onClick={handleClickLogin}
                        >
                          Đăng nhập ngay
                        </span>
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      fullWidth
                      type="submit"
                      disabled={isSubmitting || loadingCheckCard}
                      className="h-10!"
                    >
                      {loadingCheckCard ? (
                        <ScaleLoader height={25} />
                      ) : (
                        "Xác nhận"
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </Modal>
          )}
          {step === 2 && (
            <ConfirmOtpModal
              isOpen={step === 2}
              onClose={() => onClose()}
              onPre={() => setStep(1)}
              onSubmit={handleResetWhenForget}
              disabledApiGetOtp={true}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
