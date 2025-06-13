import type { Metadata } from "next";
import { PageLayout } from "@/app/components";

export const metadata: Metadata = {
  title: "Recruiter Dashboard",
  description: "Recruiter dashboard",
};

export default function RecruiterPage() {
  return (
    <PageLayout>
      <div>Placeholder page for recruiter</div>
    </PageLayout>
  );
}
