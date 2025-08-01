"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AdminConfigCard,
  PageLayout,
  SectionLoading,
  notify,
} from "@/app/components";
import { AppstoreAddOutlined } from "@ant-design/icons";
import type { BasicTable } from "@/app/types";
import { calculateHours } from "@/app/utils";

export default function AdminConfigDetails({
  table,
}: Readonly<{ table: string }>) {
  const [tableData, setTableData] = useState<BasicTable[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const refreshTableData = () => {
    setTableData([]);
  };

  useEffect(() => {
    const fetchTableData = async () => {
      if (!table) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/${table}`);
        if (!response.ok) {
          router.push("/not-found");
        }
        const data = await response.json();
        setTableData(data.response);
      } catch (error: any) {
        notify("error", "Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [table, tableData.length, router]);

  return (
    <PageLayout>
      <SectionLoading loading={loading}>
        <button
          className="flex justify-end w-full hover:cursor-pointer"
          onClick={() => router.push(`/admin/configuration/add/${table}`)}
        >
          Add
          <AppstoreAddOutlined className="px-2.5" />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {tableData.length > 0 &&
            tableData.map(({ name, id, created_at }) => (
              <AdminConfigCard
                key={id}
                title={name}
                route={`/${table.replace("_", "-")}/${id}`}
                description={calculateHours(created_at, "Created")}
                table={table}
                refreshTableData={refreshTableData}
              />
            ))}
        </div>
      </SectionLoading>
    </PageLayout>
  );
}
