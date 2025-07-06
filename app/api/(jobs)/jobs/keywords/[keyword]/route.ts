import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ keyword: string }> }
) {
  try {
    const { keyword } = await params;

    if (!keyword) {
      throw new Error("The keyword is undefined");
    }

    const WHERE_CLAUSE = [
      { role_name: { contains: keyword, mode: "insensitive" as const } },
      { location: { contains: keyword, mode: "insensitive" as const } },
      { salary_range: { contains: keyword, mode: "insensitive" as const } },
      { reference_number: { contains: keyword, mode: "insensitive" as const } },
    ];

    const data = await prisma.jobs.findMany({
      select: {
        id: true,
        description: true,
        role_name: true,
        location: true,
        salary_range: true,
        reference_number: true,
        created_at: true,
      },
      where: {
        OR: WHERE_CLAUSE,
      },
      orderBy: { created_at: "desc" },
    });

    const count = await prisma.jobs.count({
      where: {
        OR: WHERE_CLAUSE,
      },
    });

    return NextResponse.json({
      message: "Successfully retrieved jobs by keyword",
      response: data,
      count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
