import AdminConfigEdit from "./AdminConfigEdit";

export default async function AdminConfigEditPage({
  params,
}: Readonly<{ params: Promise<{ table: string; id: number }> }>) {
  const { table, id } = await params;
  return <AdminConfigEdit table={table.replace("-", "_")} id={id} />;
}
