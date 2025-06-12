import { NextResponse } from "next/server";
import { withAdminOrRecruiterProtection } from "@/app/api/utils/routeProtection";

async function handler() {
  return NextResponse.json({ message: "Recruiter route" });
}

export const GET = withAdminOrRecruiterProtection(handler);
