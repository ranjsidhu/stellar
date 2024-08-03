import { useRouter } from "next/navigation";
import { Job } from "@/app/types";

type LatestJobCardProps = {
  job: Job;
};

export default function LatestJobCard({ job }: LatestJobCardProps) {
  const router = useRouter();
  return (
    <div
      className="latest-job-card"
      onClick={() => {
        router.push(`/job?reference=${job.reference_number}`);
      }}
    >
      <h3 className="latest-job-role-name">{job.role_name}</h3>

      <div className="latest-job-mid-wrapper">
        <p className="latest-job-location">{job.location}</p>
        <p className="latest-job-salary">
          <strong>{job.salary_range}</strong>
        </p>
      </div>

      <div className="latest-job-footer-wrapper">
        <hr className="latest-job-hr" />
        <p className="latest-job-description">{job.description}</p>
      </div>
    </div>
  );
}
