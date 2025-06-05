import type { Metadata } from "next";
import Profile from "./Profile";
import AuthWrapper from "@/app/components/(functional)/AuthWrapper";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
  alternates: {
    canonical: "https://stellar-recruitment.co.uk/profile",
    types: {
      www: "https://www.stellar-recruitment.co.uk/profile",
    },
  },
};

export default function ProfilePage() {
  return (
    <AuthWrapper>
      <Profile />
    </AuthWrapper>
  );
}
