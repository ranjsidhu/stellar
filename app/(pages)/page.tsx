import type { Metadata } from "next";
import Homepage from "../components/general/home/Homepage";

export const metadata: Metadata = {
  title:
    "Leading Educational Recruitment Agency in West Midlands - Stellar Recruitment",
  description:
    "Connecting talent with opportuninity in the West Midlands - Stellar Recruitment",
  alternates: {
    canonical: "https://stellar-recruitment.co.uk",
    types: {
      www: "https://www.stellar-recruitment.co.uk",
    },
  },
};

export default function Home() {
  return <Homepage />;
}
