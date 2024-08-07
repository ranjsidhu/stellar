/* eslint-disable import/no-unused-modules */
import type { Metadata } from "next";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import Analytics from "./Analytics";
import StoreProvider from "./StoreProvider";
import { Layout } from "./components";
import { getRole } from "./utils/supabase/supabase-utils";
import "./globals.css";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://stellar-recruitment.co.uk"),
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialRole = await getRole();

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
              <Layout role={initialRole}>{children}</Layout>
            </AntdRegistry>
          </ConfigProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
