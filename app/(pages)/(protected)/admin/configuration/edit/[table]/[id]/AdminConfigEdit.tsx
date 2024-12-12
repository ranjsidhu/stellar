import { PageLayout } from "@/app/components";

export default function AdminConfigEdit({
  table,
  id,
}: {
  table: string;
  id: number;
}) {
  return (
    <PageLayout>
      {table} | {id}
    </PageLayout>
  );
}
