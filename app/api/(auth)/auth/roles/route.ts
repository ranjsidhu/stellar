import { NextResponse } from "next/server";
import { client } from "../../../utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client.from("roles").select("*");
    if (error) throw new Error(error.message);

    return NextResponse.json({
      response: data,
      message: "Successfully fetched roles",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
