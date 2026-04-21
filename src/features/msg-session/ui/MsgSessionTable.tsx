import Table from "@/components/table/Table";
import type { Column } from "@/types";
import type { MsgSession } from "../msgSessionType";

const columns: Column<MsgSession>[] = [
  {
    key: "stt",
    title: "STT",
    className: "text-center",
    render: (row) => <></>
  },
  {
    key: "type",
    title: "Loại",
    className: "text-center",
    render: (row) => row.type || row.status || "-",
  },
  {
    key: "data",
    title: "Dữ liệu",
    className: "text-left",
    render: (row) => row.data || row.content || "-",
  },
  {
    key: "createdAt",
    title: "Thời gian",
    className: "text-center",
    render: (row) => row.createdAt || "-",
  },
];

const MsgSessionTable = (props: { msgSessions: MsgSession[] }) => {
  return (
    <Table<MsgSession>
      classWrapper="h-[calc(100vh-140px)] overflow-auto"
      columns={columns}
      data={props.msgSessions}
    />
  );
};

export default MsgSessionTable;
