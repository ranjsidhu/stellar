"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { Typography } from "antd";
import Markdown from "markdown-to-jsx";
import { Job } from "../types";
import "./job-details.css";

const { Title, Paragraph } = Typography;

export default function JobDetails() {
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState<Job>();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await fetch(`/api/jobs/reference/${reference}`).then((data) =>
        data.json().then((res) => {
          setJobDetails(res.response);
          setLoading(false);
        })
      );
    };
    fetchDetails();
  }, [reference]);

  return (
    <Suspense>
      {loading && <CircularProgress />}
      <div className="job-details-wrapper">
        {!loading && jobDetails && (
          <div>
            <Title level={1}>{jobDetails.role_name}</Title>
            <Paragraph
              className="job-details-text"
              copyable={{ text: window.location.href }}
            >
              Reference number: {jobDetails.reference_number}
            </Paragraph>
            <Paragraph className="job-location job-details-text">
              <DrawingPinIcon className="job-location-icon" />{" "}
              {jobDetails.location} |{"  "}
              <strong>{jobDetails.salary_range}</strong>
            </Paragraph>
            <br />
            <Title level={3}>Job description</Title>
            <Paragraph className="job-details-text">
              <Markdown>{jobDetails.description}</Markdown>
            </Paragraph>
          </div>
        )}
      </div>
    </Suspense>
  );
}
