import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToDouble, StringToInt, numberFormat } from "@/utils";
import { useEffect, useRef, useState } from "react";
import type { AccountPortfolio } from "../../../../accountType";
import {
  fetchAccountPortfolioRequest,
  selectAccountPortfolio,
  selectAccountPortfolioTotal,
  selectAccountSelected,
} from "../../../../redux/accountSlice";
import Button from "@/components/common/Button";
import type { OrderValue } from "@/features/order/orderType";
import OrderSell from "@/features/order/ui/modal/OrderSell";

const Porfolio = () => {
  const dispatch = useAppDispatch();
  const orderValueRef = useRef<OrderValue | null>(null)
  const accountSelected = useAppSelector(selectAccountSelected);
  const portfolio = useAppSelector(selectAccountPortfolio);
  const portfolioTotal = useAppSelector(selectAccountPortfolioTotal);
  const lastRequestKeyRef = useRef<string>("");
  const [isOpenOrderSell, setIsOpenOrderSell] = useState(false)
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 20,
  });

  const columns: Column<AccountPortfolio>[] = [
    {
      key: "action",
      title: "",
      className: "text-center",
      render: (row) =>
        <Button
          variant="sell"
          onClick={() => handleOnClickSell(row)}
        >
          Bán
        </Button>

    },
    {
      key: "symbol",
      title: "Mã CK",
      className: "text-center",
      render: (row) => row.symbol || "-",
    },
    {
      key: "actual_vol",
      title: "Tổng",
      className: "text-right",
      render: (row) => numberFormat(row.actual_vol, 0, "-"),
    },
    {
      key: "avaiable_vol",
      title: "Khả dụng",
      className: "text-right",
      render: (row) => numberFormat(row.avaiable_vol, 0, "-"),
    },
    {
      key: "repo_vol",
      title: "CK bị hạn chế",
      className: "text-right",
      render: (row) => numberFormat(row.repo_vol, 0, "-"),
    },
    {
      key: "right_vol",
      title: "Quyền",
      className: "text-right",
      render: (row) => numberFormat(row.right_vol, 0, "-"),
    },
    {
      key: "margin_rate",
      title: "IM",
      className: "text-right",
      render: (row) => numberFormat(row.margin_rate, 0, "-"),
    },
    {
      key: "buy_t2",
      title: "T2 Mua",
      className: "text-right",
      render: (row) => numberFormat(row.buy_t2, 0, "-"),
    },
    {
      key: "sell_t2",
      title: "T2 Bán",
      className: "text-right",
      render: (row) => numberFormat(row.sell_t2, 0, "-"),
    },
    {
      key: "buy_t1",
      title: "T1 Mua",
      className: "text-right",
      render: (row) => numberFormat(row.buy_t1, 0, "-"),
    },
    {
      key: "sell_t1",
      title: "T1 Bán",
      className: "text-right",
      render: (row) => numberFormat(row.sell_t1, 0, "-"),
    },
    {
      key: "buy_t0",
      title: "T0 Mua",
      className: "text-right",
      render: (row) => numberFormat(row.buy_t0, 0, "-"),
    },
    {
      key: "sell_t0",
      title: "T0 Bán",
      className: "text-right",
      render: (row) => numberFormat(row.sell_t0, 0, "-"),
    },
    {
      key: "sell_unmatch_vol",
      title: "T0 Bán chờ khớp",
      className: "text-right",
      render: (row) => numberFormat(row.sell_unmatch_vol, 0, "-"),
    },
    {
      key: "avg_price",
      title: "Giá TB",
      className: "text-right",
      render: (row) => numberFormat(row.avg_price, 0, "-"),
    },
    {
      key: "value",
      title: "Giá trị vốn",
      className: "text-right",
      render: (row) => numberFormat(row.value, 0, "-"),
    },
    {
      key: "market_price",
      title: "Giá TT",
      className: "text-right",
      render: (row) => numberFormat(row.market_price, 0, "-"),
    },
    {
      key: "market_value",
      title: "Giá trị TT",
      className: "text-right",
      render: (row) => numberFormat(row.market_value, 0, "-"),
    },
    {
      key: "gain_loss_value",
      title: "Lãi lỗ tạm tính",
      className: "text-right",
      render: (row) => numberFormat(row.gain_loss_value, 0, "-"),
    },
    {
      key: "gain_loss_per",
      title: "% Lãi lỗ tạm tính",
      className: "text-right",
      render: (row) => numberFormat(row.gain_loss_per, 2, "-"),
    },
  ];

  useEffect(() => {
    if (!accountSelected) return;
    const requestKey = `${accountSelected}_${pagination.page}_${pagination.size}`;
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    dispatch(
      fetchAccountPortfolioRequest({
        account: accountSelected,
        data: { ...pagination },
      }),
    );
  }, [accountSelected, dispatch, pagination.page, pagination.size]);

  const handleNextPage = (page: number) => {
    if (page < 1) return;
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSetSize = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      size,
      page: 1,
    }));
  };

  const handleOnClickSell = (portfolio: AccountPortfolio) => {
    orderValueRef.current = {
      account: portfolio.account,
      symbol: portfolio.symbol,
      side: 'S',
      price: portfolio.sellPrice,
      volume: portfolio.avaiable_vol,
    }
    setIsOpenOrderSell(true)
  }

  return (
    <ListPage>
      <div className="flex items-center gap-4 py-2">
        <span>Giá trị:{numberFormat(portfolioTotal.value, 0)}</span>
        <span>Giá trị TT:{numberFormat(portfolioTotal.market_value, 0)}</span>
        <span>
          Lãi lỗ:
          <span className={StringToDouble(portfolioTotal.gain_loss_value) > 0 ? 'text-text-up' : 'text-text-down'}>
            {numberFormat(portfolioTotal.gain_loss_value, 0, "-")}
          </span>
        </span>
        <span>
          %Lãi lỗ:
          <span className={StringToDouble(portfolioTotal.gain_loss_value) > 0 ? 'text-text-up' : 'text-text-down'}>
            {numberFormat(portfolioTotal.gain_loss_per, 0, "-")}
          </span>
        </span>
      </div>
      <ListPage.Table>
        <Table
          classWrapper="h-[calc(100vh-345px)] overflow-auto"
          columns={columns}
          data={portfolio}
        />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={portfolio?.length ? StringToInt(portfolio[0].totalRow) : 0}
        />
      </ListPage.Paging>
      {
        isOpenOrderSell && orderValueRef.current &&
        <OrderSell
          order={orderValueRef.current}
          onClose={() => setIsOpenOrderSell(false)}
        />
      }
    </ListPage >
  );
};

export default Porfolio;