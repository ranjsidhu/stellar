"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { Typography, Button } from "antd";
import Markdown from "markdown-to-jsx";
import { Job } from "../../types";

const { Title, Paragraph } = Typography;

export default function JobDetails() {
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState<Job>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const details = await fetch(`/api/jobs/reference/${reference}`);
      const parsedDetails = await details.json();
      setJobDetails(parsedDetails.response);
      setLoading(false);
    };
    fetchDetails();
  }, [reference]);

  return (
    <Suspense>
      <div className="flex flex-col justify-start items-start w-full max-w-[1440px] mt-0 mb-0 ml-auto mr-auto p-14">
        {loading && <CircularProgress />}
        {!loading && jobDetails && (
          <div>
            <Title level={1}>{jobDetails.role_name}</Title>
            <Paragraph
              className="!text-base"
              copyable={{ text: window.location.href }}
            >
              Reference number: {jobDetails.reference_number}
            </Paragraph>

            <Paragraph className="!text-base">
              <DrawingPinIcon className="-rotate-45" />
              {jobDetails.location} |{"  "}
              <strong>{jobDetails.salary_range}</strong>
            </Paragraph>

            <br />

            <Title level={3}>Job description</Title>
            <Paragraph className="!text-base">
              <Markdown>{jobDetails.description}</Markdown>
            </Paragraph>
            <Button
              type="primary"
              onClick={() =>
                router.push(
                  `/job/apply?reference=${jobDetails.reference_number}&title=${jobDetails.role_name}&description=${jobDetails.description}&id=${jobDetails.id}`
                )
              }
            >
              Apply
            </Button>
          </div>
        )}
      </div>
    </Suspense>
  );
}
