import { useRouter } from "next/navigation";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { JobProps } from "@/app/types";
import "./jobs-components.css";

export default function JobCard({ job }: JobProps) {
  const router = useRouter();

  const calculateHours = () => {
    const diffInHours =
      Math.abs(new Date().getTime() - new Date(job.created_at).getTime()) /
      (1000 * 60 * 60);
    const roundedHours = Math.round(diffInHours);
    const roundedDays = Math.round(diffInHours / 24);
    const roundedMinutes = Math.round(diffInHours * 60);
    const roundedMonths = Math.round(roundedDays / 30);

    if (roundedHours < 1) {
      return `Posted about ${pluralise(roundedMinutes, "minute")} ago`;
    } else if (roundedHours < 24) {
      return `Posted about ${pluralise(roundedHours, "hour")} ago`;
    } else if (roundedDays < 30) {
      return `Posted ${pluralise(roundedDays, "day")} ago`;
    } else {
      return `Posted ${pluralise(roundedMonths, "month")} ago`;
    }
  };

  const pluralise = (count: number, noun: string) =>
    `${count} ${noun}${count !== 1 ? "s" : ""}`;

  return (
    <div
      className="job-card"
      onClick={() => {
        router.push(`/job?reference=${job.reference_number}`);
      }}
    >
      <h3 className="job-role-name">{job.role_name}</h3>
      <p className="job-card-posted">{calculateHours()}</p>

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
