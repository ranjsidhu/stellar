import AdminConfigAdd from "./AdminConfigAdd";

export default async function AdminConfigAddPage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  return <AdminConfigAdd table={table.replace("-", "_")} />;
}
