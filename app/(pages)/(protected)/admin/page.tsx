import type { Metadata } from "next";
import Admin from "./Admin";

export const metadata: Metadata = {
  title:
    "Leading Educational Recruitment Agency in West Midlands - Stellar Recruitment",
  description: "Connecting talent with opportuninity in the West Midlands",
  alternates: {
    canonical: "https://stellar-recruitment.co.uk/profile",
    types: {
      www: "https://www.stellar-recruitment.co.uk/profile",
    },
  },
};
export default function AdminPage() {
  return <Admin />;
}