import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { removeUndefined, validateUserIdMatch } from "@/app/utils/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const validation = await validateUserIdMatch(id);
    if (!validation.isAuthorized) {
      return validation.response;
    }

    const body = await req.json();
    if (!id) {
      throw new Error("The id is undefined");
    }
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: removeUndefined({
        first_name: body?.first_name,
        last_name: body?.last_name,
        dob: body?.dob,
        email: body?.email,
        phone: body?.phone,
        first_line_address: body?.first_line_address,
        town: body?.town,
        city: body?.city,
        postcode: body?.postcode,
        updated_at: new Date().toISOString(),
      }),
    });
    return NextResponse.json({
      message: "Successfully updated user",
      response: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
