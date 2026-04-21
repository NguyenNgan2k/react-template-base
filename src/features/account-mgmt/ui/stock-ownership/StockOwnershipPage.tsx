import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { StockOwnership } from "../../accountManagementType";
import {
	fetchStockOwnershipRequest,
	selectStockOwnerships,
} from "../../redux/accountManagementSlice";

const columns: Column<StockOwnership>[] = [
	{
		key: "accountNo",
		title: "Số TK",
		className: "text-center",
		render: (row) => row.accountNo,
	},
	{
		key: "marketingId",
		title: "MKT.ID",
		className: "text-center",
		render: (row) => row.marketingId,
	},
	{
		key: "symbol",
		title: "Mã CK",
		className: "text-center",
		render: (row) => row.symbol,
	},
	{
		key: "total",
		title: "Tổng",
		className: "text-right",
		render: (row) => row.total,
	},
	{
		key: "trading",
		title: "KD",
		className: "text-right",
		render: (row) => row.trading,
	},
	{
		key: "pledge",
		title: "Cầm cố",
		className: "text-right",
		render: (row) => row.pledge,
	},
	{
		key: "rights",
		title: "Quyền",
		className: "text-right",
		render: (row) => row.rights,
	},
	{
		key: "buyT2",
		title: "T2 mua",
		className: "text-right",
		render: (row) => row.buyT2,
	},
	{
		key: "sellT2",
		title: "T2 bán",
		className: "text-right",
		render: (row) => row.sellT2,
	},
	{
		key: "buyT1",
		title: "T1 mua",
		className: "text-right",
		render: (row) => row.buyT1,
	},
	{
		key: "sellT1",
		title: "T1 bán",
		className: "text-right",
		render: (row) => row.sellT1,
	},
	{
		key: "buyT0",
		title: "T0 mua",
		className: "text-right",
		render: (row) => row.buyT0,
	},
	{
		key: "sellT0",
		title: "T0 bán",
		className: "text-right",
		render: (row) => row.sellT0,
	},
	{
		key: "averagePrice",
		title: "Giá TB",
		className: "text-right",
		render: (row) => row.averagePrice,
	},
	{
		key: "marketPrice",
		title: "Giá TT",
		className: "text-right",
		render: (row) => row.marketPrice,
	},
	{
		key: "marketValue",
		title: "Giá trị TT",
		className: "text-right",
		render: (row) => row.marketValue,
	},
	{
		key: "unrealizedProfitLoss",
		title: "Lãi lỗ tạm tính",
		className: "text-right",
		render: (row) => row.unrealizedProfitLoss,
	},
	{
		key: "unrealizedProfitLossPercent",
		title: "% Lãi lỗ tạm tính",
		className: "text-right",
		render: (row) => row.unrealizedProfitLossPercent,
	},
];

const StockOwnershipPage = () => {
	const dispatch = useAppDispatch();
	const stockOwnerships = useAppSelector(selectStockOwnerships);
	const [pagination, setPagination] = useState<PaginationParams>({
		page: 1,
		size: 50,
	});

	useEffect(() => {
		dispatch(fetchStockOwnershipRequest(pagination));
	}, [dispatch, pagination]);

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

	return (
		<ListPage>
			<ListPage.Table>
				<Table
					classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
					columns={columns}
					data={stockOwnerships}
				/>
			</ListPage.Table>
			<ListPage.Paging>
				<Paging
					isElement={true}
					page={pagination.page}
					size={pagination.size}
					nextPage={handleNextPage}
					setSize={handleSetSize}
					totalRow={
						stockOwnerships?.length
							? StringToInt(stockOwnerships[0].totalRow)
							: 0
					}
				/>
			</ListPage.Paging>
		</ListPage>
	);
};

export default StockOwnershipPage;
