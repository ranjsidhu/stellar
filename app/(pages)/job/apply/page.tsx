import JobApply from "./JobApply";

export default async function JobApplyPage({
  searchParams,
}: {
  searchParams: {
    reference: string;
    id: string;
    title: string;
    description: string;
  };
}) {
  const {  id, title, description } = await searchParams;

  const fetchSubmittedStatus = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL +
        "/api/application_status?name=Submitted"
    );
    const data = await res.json();
    return data.response;
  };

  const status = await fetchSubmittedStatus();

  return (
    <JobApply
      id={id}
      status={status}
      title={title}
      description={description}
    />
  );
}
