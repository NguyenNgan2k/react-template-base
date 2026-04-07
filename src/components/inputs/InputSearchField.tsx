import { motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import AsyncSelect from "react-select/async";

export type OptionType = {
  label?: string;
  value: string;
  [key: string]: string | undefined;
};

type InputSearchFieldProps = {
  placeholder?: string;
  name?: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
  className?: string;
  value: OptionType | null; // đổi thành OptionType | null
  onChange: (value: OptionType | null) => void; // đổi kiểu
  options: OptionType[]; // danh sách chọn
  typeTrans?: "left" | "right";
  debounceMs?: number;
};

export default function InputSearchField({
  placeholder = "Nhập từ khóa tìm kiếm...",
  error,
  value,
  onChange,
  options = [],
  debounceMs = 200,
}: InputSearchFieldProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Tự động filter theo value và label
  const loadOptions = (inputValue: string): Promise<OptionType[]> =>
    new Promise((resolve) => {
      setSearchInput(inputValue);
      setTimeout(() => {
        if (!inputValue.trim()) {
          resolve(options);
          return;
        }
        const filtered = options.filter(
          (opt) =>
            opt.value.toLowerCase().includes(inputValue.toLowerCase()) ||
            (opt.label &&
              opt.label.toLowerCase().includes(inputValue.toLowerCase()))
        );
        resolve(filtered);
      }, debounceMs);
    });

  // Highlight từ khóa
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${_.escapeRegExp(query)})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-400 text-black font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={wrapperRef} className="flex flex-col w-max">
      <motion.div
        animate={{ width: open ? 150 : "auto" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`flex items-center bg-input rounded-md cursor-pointer`}
        onClick={() => !open && setOpen(true)}
      >
        {/* AsyncSelect - chỉ hiển thị khi mở */}
        {open && (
          <AsyncSelect
            value={value}
            onChange={(val) => {
              onChange(val);
            }}
            cacheOptions
            defaultOptions={options}
            loadOptions={loadOptions}
            inputValue={searchInput}
            onInputChange={setSearchInput}
            placeholder={placeholder}
            noOptionsMessage={() => "Không tìm thấy"}
            loadingMessage={() => "Đang tìm..."}
            menuPlacement="auto"
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
            }}
            menuPortalTarget={document.body}
            formatOptionLabel={(option, { context }) =>
              context === "value" ? (
                <span className="font-semibold text-text-title uppercase">
                  {option.value}
                </span>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-text-title uppercase">
                    {highlightText(option.value, searchInput)}
                    {option.post_to && (
                      <span className="ml-1 text-text-subtitle font-medium">
                        {option.post_to}
                      </span>
                    )}
                  </span>
                  <span className="text-text-subtitle text-xs">
                    {option.label
                      ? highlightText(option.label, searchInput)
                      : ""}
                  </span>
                </div>
              )
            }
            components={{
              DropdownIndicator: (props) => (
                <div
                  {...props.innerProps}
                  className="p-1 text-text-subtitle hover:text-text-title"
                >
                  <IoSearchOutline size={20} />
                </div>
              ),
              IndicatorSeparator: () => null,
            }}
            classNames={{
              control: ({ isFocused }) =>
                `!bg-input !rounded-md !min-h-9 !h-9 !text-text-title !text-xs ${
                  isFocused
                    ? "!border !border-yellow-400 !shadow-[0_0_0_2px_rgba(250,204,21,0.3)]"
                    : "!border !border-transparent"
                }`,
              placeholder: () => "!text-text-subtitle !text-xs",
              singleValue: () => "!text-text-title !text-xs",
              menu: () =>
                "z-[9999] !bg-surface !rounded-md !mt-1 transition-all duration-200 ease-out !w-[280px] !opacity-100 animate-fadeInDown",
              option: ({ isFocused, isSelected }) =>
                `!cursor-pointer !text-xs !flex !items-center !px-3 !py-2.5 transition-colors duration-150 ${
                  isSelected
                    ? "!bg-DTND-500 !text-white"
                    : isFocused
                    ? "!bg-DTND-500/80 !text-white"
                    : "!bg-surface !text-text-title hover:!bg-DTND-500 hover:!text-white"
                }`,
              input: () => "!m-0 !p-0 !text-text-title !uppercase",
              valueContainer: () => "!h-7 !w-[130px]",
              noOptionsMessage: () =>
                "!text-text-title !text-xs !text-center !py-2",
              loadingMessage: () =>
                "!text-text-title !text-xs !text-center !py-2",
            }}
            autoFocus
          />
        )}
        {/* Hiển thị giá trị đã chọn khi đóng */}
        {!open && value && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pl-2 text-sm font-semibold text-text-title uppercase pointer-events-none"
          >
            {value.value}
          </motion.span>
        )}
        {/* Icon search - luôn hiển thị */}
        {!open && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="p-2 text-text-title hover:text-yellow-500 transition-colors"
          >
            <LuSearch size={20} />
          </button>
        )}

        {/* Lỗi */}
        {error && (
          <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-medium">
            {error.message}
          </p>
        )}
      </motion.div>
    </div>
  );
}
