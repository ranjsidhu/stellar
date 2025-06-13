"use client";

import { useEffect, useState } from "react";
import { SectionLoading, UserCard } from "@/app/components";
import { UserRole } from "@/app/types";

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

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers((prevUsers: any) =>
      prevUsers.map((user: any) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-4">
      <SectionLoading loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users?.map((user: UserRole) => (
            <UserCard
              key={user.id}
              user={user}
              onRoleChange={handleRoleChange}
            />
          ))}
        </div>
      </SectionLoading>
    </div>
  );
}
