import { usePrevious } from "@/hooks/usePrevious";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiResetLeftLine } from "react-icons/ri";
import { ArrStatusOrderBook } from "../../../configs";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { selectAccountProfile } from "../../../store/slices/client/selector";
import { selectListShareStock } from "../../../store/slices/place-order/selector";
import {
  fetchListOrdersIndayRequest,
  fetchListOrdersOvertimeRequest,
} from "../../../store/slices/place-order/slice";
import type { FetchOrdersIndayParams, typeTableActive } from "../../../types";
import Button from "../../common/Button";
import InputSearchField from "../../inputs/InputSearchField";
import SelectField from "../../inputs/SelectField";

type FormValues = {
  stockId: string;
  status: string;
};

export default function OrderSearchForm({
  tabActive,
}: {
  tabActive: typeTableActive;
}) {
  const dispatch = useAppDispatch();

  const accountProfile = useAppSelector(selectAccountProfile);
  const listShareStock = useAppSelector(selectListShareStock);

  const { handleSubmit, setValue, watch, control, reset } = useForm<FormValues>(
    {
      defaultValues: {
        stockId: "",
        status: "",
      },
    }
  );

  const preTabActive = usePrevious(tabActive);

  useEffect(() => {
    if (tabActive && preTabActive !== tabActive) {
      reset();
    }
  }, [tabActive, preTabActive]);

  const onSubmit = (data: FormValues) => {
    if (!accountProfile?.cAccountDefault) return;
    const payload: FetchOrdersIndayParams = {
      accountCode: accountProfile?.cAccountDefault || "",
    };

    if (data.stockId) payload.symbol = data.stockId;
    if (data.status) payload.orderStatus = data.status;

    if (tabActive === "ORDER_OVERTIME") {
      dispatch(fetchListOrdersOvertimeRequest(payload));
    } else {
      dispatch(fetchListOrdersIndayRequest(payload));
    }
  };

  const stockId = watch("stockId");
  const status = watch("status");

  const debouncedKeyword = useDebounce(stockId, 400);
  const debouncedStatus = useDebounce(status, 400);

  useEffect(() => {
    const values = { stockId: debouncedKeyword, status: debouncedStatus };
    onSubmit(values);
  }, [debouncedKeyword, debouncedStatus, handleSubmit]);

  const stockOptions = useMemo(() => {
    return (listShareStock || []).map((item) => ({
      value: item.shareCode,
      label: item.fullName,
      post_to: item.tradeTable,
    }));
  }, [listShareStock]);

  return (
    <form className="flex flex-row gap-1 items-center">
      {(stockId || status) && (
        <Button
          variant="close"
          className="h-9 px-2! rounded-md! bg-input!"
          onClick={() => {
            reset();
          }}
        >
          <RiResetLeftLine className="w-4 h-4" />
        </Button>
      )}
      {/* --- Ô tìm kiếm --- */}
      <div className="flex-1">
        <Controller
          name="stockId"
          control={control}
          rules={{ required: "Vui lòng chọn mã chứng khoán" }}
          render={({ field, fieldState: { error } }) => {
            const selectedOption = field.value
              ? stockOptions.find((opt) => opt.value === field.value) || null
              : null;

            return (
              <InputSearchField
                value={selectedOption}
                onChange={(option) => {
                  field.onChange(option ? option.value : null);
                }}
                options={stockOptions}
                placeholder="Nhập mã CK"
                error={error}
                typeTrans="right"
              />
            );
          }}
        />
      </div>

      {/* --- Select trạng thái --- */}
      <div className="w-40">
        <SelectField
          value={status}
          onChange={(val) => setValue("status", val, { shouldValidate: true })}
          options={ArrStatusOrderBook}
          placeholder="Trạng thái"
          className="h-9!"
        />
      </div>
    </form>
  );
}
