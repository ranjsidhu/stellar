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
import styles from "./AdminConfigDetails.module.css";

export default function AdminConfigDetails({ table }: { table: string }) {
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
        const data = await response.json();
        setTableData(data.response);
      } catch (error: any) {
        notify("error", "Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [table, tableData.length]);

  return (
    <PageLayout>
      <SectionLoading loading={loading}>
        <div
          className={styles.adminConfigDetailsAdd}
          onClick={() => router.push(`/admin/configuration/add/${table}`)}
        >
          Add
          <AppstoreAddOutlined className={styles.addIcon} />
        </div>
        <div className={styles.adminConfigDetailsGrid}>
          {tableData.map(({ name, id, created_at }) => (
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
