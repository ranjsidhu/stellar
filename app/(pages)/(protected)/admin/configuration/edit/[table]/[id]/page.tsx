import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminConfigEdit from "./AdminConfigEdit";
import { PageProps } from "@/app/types";

export async function generateMetadata({
  params,
}: Readonly<PageProps<"table">>): Promise<Metadata> {
  const { table } = await params;

  // Transform table name for display (replace underscores with spaces, capitalize, etc.)
  const tableDisplayName = table
    .replace(/-/g, "_")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Edit ${tableDisplayName}`,
    description: `Edit ${tableDisplayName}`,
  };
}

export default async function AdminConfigEditPage({
  params,
}: Readonly<{ params: Promise<{ table: string; id: number }> }>) {
  const { table, id } = await params;

  if (!table || !id) {
    redirect("/admin/configuration");
  }

  return <AdminConfigEdit table={table.replace("-", "_")} id={id} />;
}
