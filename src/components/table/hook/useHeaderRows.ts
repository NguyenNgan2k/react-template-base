import type { Column } from "@/types";
import { useMemo } from "react";

const getDepth = <T>(columns: Column<T>[]): number => {
  if (!columns.length) return 0;
  return Math.max(
    ...columns.map((col) => (col.children ? 1 + getDepth(col.children) : 1)),
  );
};

const getColSpan = <T>(column: Column<T>) => {
  return column.children && column.children.length > 0
    ? column.children.length
    : 1;
};

const getRowSpan = <T>(
  column: Column<T>,
  maxDepth: number,
  currentLevel: number,
) => {
  return column.children && column.children.length > 0
    ? 1
    : maxDepth - currentLevel;
};

const buildHeaderRows = <T>(
  column: Column<T>,
  maxDepth: number,
  headerRows: Column<T>[][],
  currentLevel: number,
) => {
  if (!headerRows[currentLevel]) {
    headerRows[currentLevel] = [];
  }

  headerRows[currentLevel].push({
    ...column,
    colSpan: getColSpan(column),
    rowSpan: getRowSpan(column, maxDepth, currentLevel),
  });

  if (column.children) {
    column.children.forEach((childColumn) => {
      buildHeaderRows(childColumn, maxDepth, headerRows, currentLevel + 1);
    });
  }
};

const generateHeaderRows = <T>(columns: Column<T>[]) => {
  const maxDepth = getDepth(columns);
  const headerRows: Column<T>[][] = [];
  columns.forEach((column) => {
    buildHeaderRows(column, maxDepth, headerRows, 0);
  });

  return headerRows;
};

export const useHeaderRows = <T>(columns: Column<T>[]) => {
  return useMemo(() => generateHeaderRows(columns), [columns]);
};
