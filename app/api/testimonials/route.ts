import { NextRequest, NextResponse } from "next/server";
const { create } = require("@/app/api/utils/db-client");

export async function POST(req: NextRequest) {
  try {
    const { author, testimonial } = await req.json();
    const { data, error } = await create({
      body: { author, testimonial },
      table: "testimonials",
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created testimonial",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
