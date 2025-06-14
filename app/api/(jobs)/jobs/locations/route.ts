import { NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const data = await prisma.jobs.groupBy({
      by: ["location"],
      _count: {
        location: true,
      },
    });

    const formattedData = data.map((item) => ({
      location: item.location,
      location_count: item._count.location,
    }));

    return NextResponse.json({
      messasge: "Successfully retrieved job locations",
      response: formattedData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
