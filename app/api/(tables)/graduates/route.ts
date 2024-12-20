import { type NextRequest, NextResponse } from "next/server";
import { client, create } from "../../utils/db-client";
import { GraduatesType } from "@/app/constants/tables/graduates";

export async function GET() {
  try {
    const { data, error } = await client
      .from("graduates")
      .select("*, university_levels(name)");
    if (error) throw new Error(error.message);
    const formattedData = data.map((grad: GraduatesType) => {
      return { ...grad, university_levels: grad.university_levels.name };
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
    const { data, error } = await create({ body, table: "graduates" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created graduate record",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
