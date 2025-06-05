import type { Metadata } from "next";
import AdminUsers from "./AdminUsers";

export const metadata: Metadata = {
  title: "User Management",
};

export default function AdminUsersPage() {
  return <AdminUsers />;
}
