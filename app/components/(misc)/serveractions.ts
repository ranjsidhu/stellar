"use server";

export async function updateDetails(email: string) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SITE_URL + "/api/auth/roles/refresh",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      }
    );
    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
}
