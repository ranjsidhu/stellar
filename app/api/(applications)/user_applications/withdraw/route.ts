import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function PUT(req: NextRequest) {
  try {
    // Find the status of Withdrawn
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const supabase = await createClient();
    const { data: statusData, error: statusError } = await supabase
      .from("application_status")
      .select("id")
      .eq("name", "Withdrawn")
      .single();
    if (statusError) throw new Error(statusError.message);

    const withdrawnId = statusData.id;
    const applicationId = id;

    // Update the application status to Withdrawn
    const { error } = await supabase
      .from("user_applications")
      .update({
        application_status_id: withdrawnId,
      })
      .eq("id", applicationId);
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully withdrew user application",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
