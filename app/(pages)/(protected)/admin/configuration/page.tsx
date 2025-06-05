import type { Metadata } from "next";
import AdminConfiguration from "./AdminConfiguration";

export const metadata: Metadata = {
  title: "Admin Configuration",
  description: "Admin configuration",
};

export default function AdminConfigurationPage() {
  return <AdminConfiguration />;
}
