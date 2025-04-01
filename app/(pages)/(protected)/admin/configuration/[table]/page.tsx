import AdminConfigDetails from "./AdminConfigDetails";
import { PageProps } from "@/app/types";

export default async function AdminConfigDetailPage({
  params,
}: Readonly<PageProps<"table">>) {
  const { table } = await params;
  return <AdminConfigDetails table={table.replace("-", "_")} />;
}
