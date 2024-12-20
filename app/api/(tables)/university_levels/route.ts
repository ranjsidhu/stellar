import { type NextRequest, NextResponse } from "next/server";
import { client, create, update } from "../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client
      .from("university_levels")
      .select("*")
      .eq("is_deleted", false)
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully fetched university levels",
      response: data,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await create({ body, table: "university_levels" });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created university level",
      response: { ...data },
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
    const { data, error } = await update({
      body,
      table: "university_levels",
      id,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated university level",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
