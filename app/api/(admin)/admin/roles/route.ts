import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminProtection } from "@/app/api/utils/routeProtection";

export const POST = withAdminProtection(async (req: NextRequest) => {
  try {
    const { name, label } = await req.json();
    const role = await prisma.roles.create({
      data: { name, label },
    });
    return NextResponse.json({
      message: "Successfully created role",
      response: role,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})



export const PUT = withAdminProtection(async (req: NextRequest) => {
  try {
    const { user_id, role_id } = await req.json();
    if (!user_id || !role_id) {
      throw new Error("User ID and Role ID are required");
    }

    const user = await prisma.users.update({
      where: { id: user_id },
      data: { role_id },
    });

    return NextResponse.json({
      message: "Successfully updated user role",
      response: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})
