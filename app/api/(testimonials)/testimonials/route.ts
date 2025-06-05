import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function POST(req: NextRequest) {
  try {
    const { author, testimonial } = await req.json();
    const testimonialRecord = await prisma.testimonials.create({
      data: { author, testimonial },
    });
    return NextResponse.json({
      message: "Successfully created testimonial",
      response: testimonialRecord,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
