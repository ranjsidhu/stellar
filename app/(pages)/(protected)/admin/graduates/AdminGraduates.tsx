"use client";

import { useState, useEffect } from "react";
import { Table, SectionLoading } from "@/app/components";
import {
  type GraduatesType,
  graduatesColumns,
} from "@/app/constants/tables/graduates";
import styles from "./AdminGraduates.module.css";

export default function AdminGraduates() {
  const [graduates, setGraduates] = useState<GraduatesType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const res = await fetch("/api/graduates");
        const data = await res.json();
        setGraduates(
          data.response.map((grad: any) => ({ ...grad, key: grad.id }))
        );
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch graduates:", error);
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

  return (
    <div className={styles.adminGraduatesWrapper}>
      <SectionLoading loading={loading}>
        <Table columns={graduatesColumns} rows={graduates || []} />
      </SectionLoading>
    </div>
  );
}
