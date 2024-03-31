import { useAppSelector } from "@/lib/hooks";
import "./jobs.css";

export default function Jobs() {
  // const { jobs } = useAppSelector((state) => state.Jobs);
  const jobs = [
    {
      id: 1,
      role_name: "Maths Teacher",
      location: "Coventry",
      salary_range: "£70 - £180 per day",
      reference_number: "0000255",
      description:
        "The only way to learn mathematics is to do mathematics. Qualified Mathematics Teacher? Are you looking for a new challenge in your teaching career? I am currently recruiting...",
      created_at: "2024-03-26T20:54:52.257353+00:00",
    },
    {
      id: 2,
      role_name: "Science Teacher",
      location: "Wolverhampton",
      salary_range: "£100 - £180 per day",
      reference_number: "0000256",
      description:
        "The only way to learn science is to do science. Qualified Science Teacher? Are you looking for a new challenge in your teaching career? I am currently recruiting...",
      created_at: "2024-03-26T21:56:55.352014+00:00",
    },
    {
      id: 3,
      role_name: "English Teacher",
      location: "Stafford",
      salary_range: "£90 - £110 per day",
      reference_number: "0000257",
      description:
        "The only way to learn english is to teach english. Qualified English Teacher? Are you looking for a new challenge in your teaching career? I am currently recruiting...",
      created_at: "2024-03-26T21:57:36.369166+00:00",
    },
  ];

  return (
    <div className="jobs-wrapper">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="job-card"
          onClick={() => {
            // TODO: define function or route to job details page, add id to URL, parse on details page
          }}
        >
          <h3 className="job-role-name">{job.role_name}</h3>

          <div className="job-mid-wrapper">
            <p className="job-location">{job.location}</p>
            <p className="job-salary">
              <strong>{job.salary_range}</strong>
            </p>
          </div>

          <div className="job-footer-wrapper">
            <hr className="job-hr" />
            <p className="job-description">{job.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
