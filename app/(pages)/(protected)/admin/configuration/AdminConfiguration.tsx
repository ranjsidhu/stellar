"use client";

import { useState, useEffect } from "react";
import { ConfigTable } from "@/app/types";
import {
  AdminCard,
  notify,
  PageLayout,
  SectionLoading,
} from "@/app/components";

export default function AdminConfiguration() {
  const [config, setConfig] = useState<ConfigTable[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchConfig = async () => {
      if (config.length > 0) return;
      setLoading(true);
      try {
        const response = await fetch("/api/config_tables", {});
        const data = await response.json();
        setConfig(data.response);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        notify("error", "Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [config.length]);

  return (
    <SectionLoading loading={loading}>
      <PageLayout>
        <div className="flex justify-between items-center h-full mx-auto">
          {config.length > 0 &&
            config.map((card) => (
              <AdminCard
                key={card.id}
                route={`/admin/configuration/${card.table_name.replace(
                  "_",
                  "-"
                )}`}
                title={card.ui_name}
                description={card.description}
              />
            ))}
        </div>
      </PageLayout>
    </SectionLoading>
  );
}
