import type { Metadata } from "next";
import JobApply from "./JobApply";
import AuthWrapper from "@/app/components/(functional)/AuthWrapper";
import { JobApplyPageProps } from "@/app/types";

export const metadata: Metadata = {
  title: "Job Application",
  description: "Job Application",
};

export default async function JobApplyPage({
  searchParams,
}: Readonly<JobApplyPageProps>) {
  const { id, title, description } = await searchParams;

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
    <AuthWrapper>
      <JobApply
        id={id}
        status={status}
        title={title}
        description={description}
      />
    </AuthWrapper>
  );
}
