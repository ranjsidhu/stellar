/* eslint-disable import/no-unused-modules */
import type { Metadata } from "next";
import { ComponentChildren } from "@/app/types";
import { config } from "@/app/utils/config";
import AuthWrapper from "@/app/components/(functional)/AuthWrapper";
import "@/app/globals.css";

const metadataURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://stellar-recruitment.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(metadataURL),
  title: {
    default: "Stellar Recruitment",
    template: "%s | Stellar Recruitment",
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

export default async function RootLayout({ children }: ComponentChildren) {
  return <AuthWrapper role={[config.adminRoleName]}>{children}</AuthWrapper>;
}
