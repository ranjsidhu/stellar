"use client";

import { useEffect, useState } from "react";
import { Input, Select, Pagination } from "antd";
import { SectionLoading, UserCard } from "@/app/components";
import { UserRole } from "@/app/types";
import { useFetch } from "@/app/hooks";

const { Search } = Input;

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Recruiter", value: "Recruiter" },
  { label: "Candidate", value: "Candidate" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { data: currentUsers, isLoading } = useFetch<UserRole>(
    `/admin/users/${currentPage}`
  );

  useEffect(() => {
    setUsers(currentUsers?.map((user: any) => ({ ...user, key: user.id })));
    setTotal(currentUsers?.length);
  }, [currentUsers]);

  const handleRoleChange = (id: number, newRole: string) => {
    setUsers((prevUsers: any) =>
      prevUsers.map((user: any) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleSearch = async (keyword: string) => {
    if (keyword === "") {
      return;
    }
    setCurrentPage(1);
    setSearchInput(keyword);
    setUsers([]);
    fetch(`/api/admin/users/keywords/${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.response);
        setTotal(data.count);
      })
      .catch(() => {
        setUsers([]);
      });
  };

  const handleFilterByRole = async (role: string) => {
    if (role === "" || !role) {
      const data = await fetch(`/api/admin/users/${currentPage}`);
      const res = await data.json();
      setUsers(res.response);
      setTotal(res.count);
      return;
    }
    setCurrentPage(1);
    setSelectedRole(role);
    fetch(`/api/admin/users/role/${role}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.response);
        setTotal(data.count);
      })
      .catch(() => {
        setUsers([]);
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-1 items-center gap-2">
          <Search
            allowClear
            placeholder="Search by email or name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
            className="flex-1"
          />
        </div>
        <Select
          placeholder="Filter by role"
          value={selectedRole}
          onChange={handleFilterByRole}
          allowClear
          style={{ minWidth: 150 }}
          options={roleOptions}
        />
      </div>
      <SectionLoading loading={isLoading}>
        {users?.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No users found</p>
          </div>
        )}

        <p className="text-gray-700 font-medium mb-4">
          Total results found: {total}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users?.map((user: UserRole) => (
            <UserCard
              key={user.id}
              user={user}
              onRoleChange={handleRoleChange}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            total={total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </SectionLoading>
    </div>
  );
}
