"use client";

import { useEffect, useState } from "react";
import { Table } from "antd";
import { SectionLoading } from "@/app/components";
import { ADMIN_USERS_COLUMNS } from "@/app/constants/admin";
import styles from "./AdminUsers.module.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data.response.map((user: any) => ({ ...user, key: user.id })));
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch admin users:", error);
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  return (
    <div className={styles.adminUsersWrapper}>
      <SectionLoading loading={loading}>
        <Table
          className={styles.adminUsersTable}
          columns={ADMIN_USERS_COLUMNS}
          dataSource={users || []}
        />
      </SectionLoading>
    </div>
  );
}
