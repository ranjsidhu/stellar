import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { validateUserIdMatch } from "@/app/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    const validation = await validateUserIdMatch(user_id);
    if (!validation.isAuthorized) {
      return validation.response;
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
