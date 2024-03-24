import type { Metadata } from "next";
import Homepage from "./home/Homepage";

export const metadata: Metadata = {
  title:
    "Stellar Recruitment - Educational Recruitment Agency in West Midlands",
  description: "Connecting talent with opportuninity in the West Midlands",
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
