import { NextResponse } from "next/server";
import { client } from "../..//utils/db-client";

export async function GET() {
  try {
    const { data, error } = await client.from("referrals").select("*");
    if (error) throw new Error(error.message);
    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

// export async function POST(req: NextRequest) { };
