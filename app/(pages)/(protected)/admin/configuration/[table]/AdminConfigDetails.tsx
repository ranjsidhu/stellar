"use client";

import { useEffect, useState } from "react";
import { AdminCard, PageLayout, SectionLoading } from "@/app/components";
import { calculateHours } from "@/app/utils";
import { notify } from "@/app/components";
import styles from "./AdminConfigDetails.module.css";

type BasicTable = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export default function AdminConfigDetails({ table }: { table: string }) {
  const [tableData, setTableData] = useState<BasicTable[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTableData = async () => {
      if (!table) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/${table}`, {
          cache: "force-cache",
          next: {
            tags: [table],
            revalidate: 600,
          },
        });
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
        <div className={styles.adminConfigDetailsGrid}>
          {/* TODO - make a new card component which has a pencil for edit and bin for delete */}
          {tableData.map((data) => (
            <AdminCard
              key={data.id}
              title={data.name}
              route={`/admin/configuration/edit/${table.replace("_", "-")}/${
                data.id
              }`}
              description={calculateHours(data.created_at, "Created")}
            />
          ))}
        </div>
      </SectionLoading>
    </PageLayout>
  );
}
