import { Suspense } from "react";
import type { Metadata } from "next";
import UpdatePassword from "./UpdatePassword";

export const metadata: Metadata = {
  title: "Update Password",
  description: "Update your password",
};

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePassword />
    </Suspense>
  );
}
