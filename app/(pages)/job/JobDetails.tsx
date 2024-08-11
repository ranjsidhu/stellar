"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { Typography } from "antd";
import Markdown from "markdown-to-jsx";
import { Job } from "../../types";
import styles from "./JobDetails.module.css";

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
      <div className={styles.jobDetailsWrapper}>
        {!loading && jobDetails && (
          <div>
            <Title level={1}>{jobDetails.role_name}</Title>
            <Paragraph
              className={styles.jobDetailsText}
              copyable={{ text: window.location.href }}
            >
              Reference number: {jobDetails.reference_number}
            </Paragraph>

            <Paragraph className={styles.jobDetailsText}>
              <DrawingPinIcon className={styles.jobLocationIcon} />
              {jobDetails.location} |{"  "}
              <strong>{jobDetails.salary_range}</strong>
            </Paragraph>

            <br />

            <Title level={3}>Job description</Title>
            <Paragraph className={styles.jobDetailsText}>
              <Markdown>{jobDetails.description}</Markdown>
            </Paragraph>
          </div>
        )}
      </div>
    </Suspense>
  );
}
