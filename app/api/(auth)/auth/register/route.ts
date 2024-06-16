import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { client } from "@/app/api/utils/db-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = await client.auth.signUp(
      {
        email: body.email,
        password: body.password,
      },
      {
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          phone_number: body.phone_number || "",
        },
      }
    );
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    redirect("/");
  } catch (error: any) {
    redirect("/error");
  }
}
