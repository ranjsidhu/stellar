import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const universityLevels = await prisma.university_levels.findMany({
      where: { is_deleted: false },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({
      message: "Successfully fetched university levels",
      response: universityLevels,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const universityLevel = await prisma.university_levels.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created university level",
      response: universityLevel,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const universityLevel = await prisma.university_levels.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json({
      message: "Successfully updated university level",
      response: universityLevel,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
