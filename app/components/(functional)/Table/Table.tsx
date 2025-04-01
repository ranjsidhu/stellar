"use client";

import { Table as AntdTable } from "antd";
import type { ColumnsType } from "antd/es/table";

type TableProps<T> = {
  columns: ColumnsType<T>;
  rows: T[];
};

export default function Table<T>({ columns, rows }: Readonly<TableProps<T>>) {
  return <AntdTable columns={columns} dataSource={rows} />;
}
