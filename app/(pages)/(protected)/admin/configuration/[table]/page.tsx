import AdminConfigDetails from "./AdminConfigDetails";

export default async function AdminConfigDetailPage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  return <AdminConfigDetails table={table.replace("-", "_")} />;
}
