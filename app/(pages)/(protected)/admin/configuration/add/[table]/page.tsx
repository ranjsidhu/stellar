import { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminConfigAdd from "./AdminConfigAdd";
import { PageProps } from "@/app/types";

export async function generateMetadata({
  params,
}: Readonly<PageProps<"table">>): Promise<Metadata> {
  const { table } = await params;

  if (!table) {
    redirect("/admin/configuration");
  }

  // Transform table name for display (replace underscores with spaces, capitalize, etc.)
  const tableDisplayName = table
    .replace(/-/g, "_")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Add ${tableDisplayName}`,
    description: `Add ${tableDisplayName}`,
  };
}

export default async function AdminConfigAddPage({
  params,
}: Readonly<PageProps<"table">>) {
  const { table } = await params;
  return <AdminConfigAdd table={table.replace("-", "_")} />;
}
