import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Layout, Analytics, StoreProvider } from "./components";
import { ComponentChildren } from "./types";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter: NextFont = Inter({ subsets: ["latin"] });

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
  return (
    <html lang="en">
      <Analytics />
      <StoreProvider>
        <body className={inter.className}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00150f",
              },
            }}
          >
            <AntdRegistry>
              <SessionProvider>
                <Layout>{children}</Layout>
              </SessionProvider>
            </AntdRegistry>
          </ConfigProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
