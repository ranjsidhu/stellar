import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const referrals = await prisma.referrals.findMany();
    return NextResponse.json({
      message: "Successfully fetched referrals",
      response: referrals,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const referral = await prisma.referrals.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created referral",
      response: referral,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
