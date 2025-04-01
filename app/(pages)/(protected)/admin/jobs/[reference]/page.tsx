import AdminJobEdit from "./AdminJobEdit";
import { PageLayout } from "@/app/components";
import { fetchJobDetails, fetchStatusOptions } from "./serveractions";

export default async function AdminJobRefPage({
  params,
}: Readonly<{ params: Promise<{ reference: string }> }>) {
  const { reference } = await params;
  const jobDetails = await fetchJobDetails(reference);
  const statusOptions = await fetchStatusOptions();

  return (
    <PageLayout>
      <AdminJobEdit job={jobDetails} jobStatuses={statusOptions} />
    </PageLayout>
  );
}
