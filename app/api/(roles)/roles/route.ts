import { NextRequest, NextResponse } from "next/server";
import { update, create } from "../../utils/db-client";

export async function POST(req: NextRequest) {
  try {
    const { name, label } = await req.json();
    const { data, error } = await create({
      body: { name, label },
      table: "roles",
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully created role",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { user_id, role_id } = await req.json();
    if (!user_id || !role_id) {
      throw new Error("User ID and Role ID are required");
    }

    const { data, error } = await update({
      body: { role_id },
      table: "users",
      id: user_id,
    });

    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully updated user role",
      response: { ...data },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
