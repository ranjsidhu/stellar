import type { Metadata } from "next";
import Admin from "./Admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard",
};

export default function AdminPage() {
  return <Admin />;
}
