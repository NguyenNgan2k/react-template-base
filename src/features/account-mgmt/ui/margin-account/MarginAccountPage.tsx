import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { MarginAccount, MarginAccountParams } from "../../accountManagementType";
import {
	fetchMarginAccountRequest,
	selectMarginAccounts,
} from "../../redux/accountManagementSlice";
import MarginAccountSearch from "./MarginAccountSearch";

const columns: Column<MarginAccount>[] = [
	{
		key: "accountNo",
		title: "Số TK",
		className: "text-center",
		render: (row) => row.accountNo,
	},
	{
		key: "customerName",
		title: "Tên khách hàng",
		className: "text-left",
		render: (row) => row.customerName,
	},
	{
		key: "group",
		title: "Nhóm",
		className: "text-center",
		render: (row) => row.group,
	},
	{
		key: "totalAsset",
		title: "Tổng tài sản",
		className: "text-right",
		render: (row) => row.totalAsset,
	},
	{
		key: "debt",
		title: "Nợ",
		className: "text-right",
		render: (row) => row.debt,
	},
	{
		key: "overdueDebt",
		title: "Nợ quá hạn",
		className: "text-right",
		render: (row) => row.overdueDebt,
	},
	{
		key: "requiredSellValue",
		title: "GT cần bán",
		className: "text-right",
		render: (row) => row.requiredSellValue,
	},
	{
		key: "additionalCashRequired",
		title: "Tiền cần BS",
		className: "text-right",
		render: (row) => row.additionalCashRequired,
	},
	{
		key: "status",
		title: "Trạng thái",
		className: "text-center",
		render: (row) => row.status,
	},
	{
		key: "ratio",
		title: "Tỷ lệ",
		className: "text-right",
		render: (row) => row.ratio,
	},
	{
		key: "callDays",
		title: "Số ngày CALL",
		className: "text-center",
		render: (row) => row.callDays,
	},
];

const MarginAccountPage = () => {
	const dispatch = useAppDispatch();
	const marginAccounts = useAppSelector(selectMarginAccounts);
	const [params, setParams] = useState<MarginAccountParams>();
	const [pagination, setPagination] = useState<PaginationParams>({
		page: 1,
		size: 50,
	});

	useEffect(() => {
		if (!params) return;
		dispatch(fetchMarginAccountRequest({ ...params, ...pagination }));
	}, [dispatch, params, pagination]);

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
			<ListPage.Search>
				<MarginAccountSearch handleSearch={(searchParams) => setParams(searchParams)} />
			</ListPage.Search>
			<ListPage.Table>
				<Table
					classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
					columns={columns}
					data={marginAccounts}
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
						marginAccounts?.length ? StringToInt(marginAccounts[0].totalRow) : 0
					}
				/>
			</ListPage.Paging>
		</ListPage>
	);
};

export default MarginAccountPage;