import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { numberFormat, StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { RegularAccount } from "../../accountManagementType";
import {
	fetchRegularAccountRequest,
	selectRegularAccounts,
} from "../../redux/accountManagementSlice";

const columns: Column<RegularAccount>[] = [
	{
		key: "accountCode",
		title: "Số TK",
		className: "text-center",
		render: (row) => row.accountCode,
	},
	{
		key: "accountName",
		title: "Tên khách hàng",
		className: "text-left",
		render: (row) => row.accountName,
	},
	{
		key: "marketingName",
		title: "MKT.Name",
		className: "text-left",
		render: (row) => row.marketingName,
	},
	{
		key: "asset",
		title: "Tổng tài sản",
		className: "text-right",
		render: (row) => numberFormat(row.asset),
	},
	{
		key: "marginRatio",
		title: "Ratio",
		className: "text-center",
		render: (row) => row.marginRatio,
	},
	{
		key: "status",
		title: "Status",
		className: "text-center",
		render: (row) => row.status,
	},
];

const RegularAccountPage = () => {
	const dispatch = useAppDispatch();
	const regularAccounts = useAppSelector(selectRegularAccounts);
	const [pagination, setPagination] = useState<PaginationParams>({
		page: 1,
		size: 50,
	});

	useEffect(() => {
		dispatch(fetchRegularAccountRequest(pagination));
	}, [dispatch, pagination.page, pagination.size]);

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
					classWrapper="max-h-[calc(100vh-145px)] overflow-auto"
					columns={columns}
					data={regularAccounts}
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
						regularAccounts?.length ? StringToInt(regularAccounts[0].totalRow) : 0
					}
				/>
			</ListPage.Paging>
		</ListPage>
	);
};

export default RegularAccountPage;
