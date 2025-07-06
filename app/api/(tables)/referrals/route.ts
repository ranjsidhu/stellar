import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withLogging } from "@/app/api/utils/loggingMiddleware";
import { databaseEvent } from "@/app/api/utils/logging";

export const GET = withLogging(async () => {
  try {
    const referrals = await prisma.referrals.findMany();

    // Log successful database query
    databaseEvent.query("findMany", "referrals", undefined, {
      count: referrals.length,
    });

    return NextResponse.json({
      message: "Successfully fetched referrals",
      response: referrals,
    });
  } catch (error: any) {
    // Log database error
    databaseEvent.error("findMany", "referrals", error);

    return NextResponse.json({ message: error.message });
  }
});

export const POST = withLogging(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const referral = await prisma.referrals.create({
      data: body,
    });

    // Log successful database creation
    databaseEvent.create("referrals", referral.id, undefined, {
      referrerName: body.referrerName,
    });

    return NextResponse.json({
      message: "Successfully created referral",
      response: referral,
    });
  } catch (error: any) {
    // Log database error
    databaseEvent.error("create", "referrals", error);

    return NextResponse.json({ error: error.message });
  }
});
