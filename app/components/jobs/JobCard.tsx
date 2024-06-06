import { useRouter } from "next/navigation";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { JobProps } from "@/app/types";
import { calculateHours } from "@/app/utils";
import "./jobs-components.css";

export default function JobCard({ job }: JobProps) {
  const router = useRouter();

  return (
    <div
      className="job-card"
      onClick={() => {
        router.push(`/job?reference=${job.reference_number}`);
      }}
    >
      <h3 className="job-role-name">{job.role_name}</h3>
      <p className="job-card-posted">{calculateHours(job.created_at)}</p>

      <p className="job-location">
        <DrawingPinIcon className="job-location-icon" /> {job.location} |{"  "}
        <strong>{job.salary_range}</strong>
      </p>

      <div className="job-footer-wrapper">
        <p className="job-description">{job.description}</p>
      </div>
    </div>
  );
}
