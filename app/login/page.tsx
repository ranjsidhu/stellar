"use client";

import { Suspense } from "react";
import { Login } from "@/app/components";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
