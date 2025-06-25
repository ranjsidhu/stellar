import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { checkValidSession } from "@/app/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const res = await checkValidSession();
    if (!res.isAuthorized) {
      return res.response;
    }
    const { user_id } = await params;
    if (!user_id) {
      throw new Error("The user_id is undefined");
    }
    if (Number(user_id) !== res.id) {
      return NextResponse.json(
        {
          isAuthorized: false,
          response: {
            error: "Unauthorized: User ID does not match session",
          },
        },
        { status: 403 }
      );
    }

    const userDocuments = await prisma.user_documents.findMany({
      where: { user_id: Number(user_id) },
      include: { file_types: true },
    });
    const formattedData = userDocuments.map((doc) => {
      return {
        ...doc,
        file_types: doc.file_types?.name ?? null,
      };
    });
    return NextResponse.json({
      message: "Successfully fetched user documents",
      response: formattedData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
