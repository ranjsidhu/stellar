import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const graduates = await prisma.graduates.findMany({
      include: { university_levels: true },
    });
    const formattedData = graduates.map((grad) => {
      return {
        ...grad,
        estimated_completion_date:
          grad.estimated_completion_date?.toISOString() ?? null,
        created_at: grad.created_at?.toISOString() ?? null,
        updated_at: grad.updated_at?.toISOString() ?? null,
        university_levels: grad.university_levels?.name ?? null,
      };
    });
    return NextResponse.json({
      message: "Successfully fetched graduates",
      response: formattedData,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const graduate = await prisma.graduates.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created graduate record",
      response: graduate,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
