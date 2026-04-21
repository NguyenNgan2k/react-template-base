import _ from "lodash";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import InputSearchFieldStock from "../../../../components/inputs/InputSearchFieldStock";
import { usePrevious } from "../../../../hooks/usePrevious";
import { useToast } from "../../../../hooks/useToast";
import { socketClient } from "../../../../networks/socket";
import { useAppDispatch } from "../../../../store/hook";
import {
  setListStockByIdFromCache,
  setScrollToSymbol,
} from "../../../../store/slices/priceboard/slice";
import type { Favorite } from "../../../../types";

type FormSearchStockValues = {
  stock: {
    label: string;
    value: string;
    post_to: string;
  } | null;
};

const FormSearchStock = ({ active }: { active: string }) => {
  const dispatch = useAppDispatch();
  const { control, setValue, watch } = useForm<FormSearchStockValues>();
  const toast = useToast();
  const stock = watch("stock");

  const preStock = usePrevious(stock);

  useEffect(() => {
    if (!stock) return;

    const fullSymbol = `${stock.value}:G1:${stock.post_to}`;

    // === Luôn scroll nếu có stock (dù ở bảng nào) ===
    dispatch(setScrollToSymbol(fullSymbol));

    // === Chỉ thêm vào danh mục nếu là bảng yêu thích ===
    if (active.startsWith("fav_")) {
      if (_.isEqual(stock, preStock)) return; // tránh chạy 2 lần

      const stored = localStorage.getItem("favorites");
      if (!stored) {
        setValue("stock", null);
        return;
      }

      const favorites: Favorite[] = JSON.parse(stored);
      const favorite = favorites.find((f) => f.id === active);
      if (!favorite) {
        setValue("stock", null);
        return;
      }

      // Kiểm tra trùng (cả pinned + normal)
      const allSymbols = new Set([...favorite.symbols]);
      if (allSymbols.has(fullSymbol)) {
        toast(`${stock.value} đã có trong ${favorite.label}`, "error");
        setValue("stock", null);
        return;
      }

      // Thêm vào cuối danh sách normal
      favorite.symbols = [...favorite.symbols, fullSymbol];

      // Lưu localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Cập nhật Redux
      const updatedAllSymbols = [...favorite.symbols];
      dispatch(setListStockByIdFromCache(active, updatedAllSymbols));

      // Subscribe socket
      socketClient.subscribe({ symbols: [fullSymbol] });

      toast(`${stock.value} được thêm vào ${favorite.label}`, "success");
    }

    // Reset form (luôn luôn)
    setValue("stock", null);
  }, [stock, active, preStock, dispatch, setValue]);
  return (
    <form className="h-full flex items-center search-symbol-input">
      <Controller
        name="stock"
        control={control}
        rules={{ required: "Vui lòng chọn mã chứng khoán" }}
        render={({ field, fieldState }) => (
          <div>
            <InputSearchFieldStock
              value={field.value}
              onChange={field.onChange}
              placeholder="Tìm kiếm mã"
              className="w-70! form-symbol"
            />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </form>
  );
};

export default FormSearchStock;
