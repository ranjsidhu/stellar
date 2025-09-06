/* -disable import/no-unused-modules */
import type { Metadata } from "next";
import { ComponentChildren } from "@/app/types";
import { config } from "@/app/utils/config";
import AuthWrapper from "@/app/components/(functional)/AuthWrapper";

export const metadata: Metadata = {
  title: {
    default: "Recruiter Dashboard",
    template: "%s | Recruiter Dashboard",
  },
  description: "Connecting talent with opportunity",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Stellar Recruitment",
    description: "Connecting talent with opportunity",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default async function RecruiterLayout({ children }: ComponentChildren) {
  return (
    <AuthWrapper role={[config.recruiterRoleName, config.adminRoleName]}>
      {children}
    </AuthWrapper>
  );
}
