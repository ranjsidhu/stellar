"use client";

import { useEffect, useState } from "react";
import { SectionLoading, UserCard } from "@/app/components";
import { UserRole } from "@/app/types";
import { Input, Select } from "antd";

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Recruiter", value: "Recruiter" },
  { label: "Candidate", value: "Candidate" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

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

  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchQuery
      ? user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesRole = selectedRole ? user.role === selectedRole : true;

    return matchesSearch && matchesRole;
  });

  // Calculate pagination
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by email or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Select
          placeholder="Filter by role"
          value={selectedRole}
          onChange={setSelectedRole}
          allowClear
          style={{ minWidth: 150 }}
          options={roleOptions}
        />
      </div>
      <SectionLoading loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredUsers.map((user: UserRole) => (
            <UserCard
              key={user.id}
              user={user}
              onRoleChange={handleRoleChange}
            />
          ))}
        </div>
        {/* <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredUsers.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger
            onShowSizeChange={(current, size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div> */}
      </SectionLoading>
    </div>
  );
}
