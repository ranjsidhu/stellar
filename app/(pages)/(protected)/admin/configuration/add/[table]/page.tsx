import AdminConfigAdd from "./AdminConfigAdd";
import { PageProps } from "@/app/types";

export default async function AdminConfigAddPage({
  params,
}: Readonly<PageProps<"table">>) {
  const { table } = await params;
  return <AdminConfigAdd table={table.replace("-", "_")} />;
}
