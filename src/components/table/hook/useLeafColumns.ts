import type { Column } from "@/types";
import { useMemo } from "react";

const getLeafColumns = <T>(columns: Column<T>[]): Column<T>[] => {
  let leafColumns: Column<T>[] = [];

  columns.forEach((col) => {
    if (col.children) {
      leafColumns = leafColumns.concat(getLeafColumns(col.children));
    } else {
      leafColumns.push(col);
    }
  });

  return leafColumns;
};

export const useLeafColumns = <T>(columns: Column<T>[]) => {
  return useMemo(() => getLeafColumns(columns), [columns]);
};
