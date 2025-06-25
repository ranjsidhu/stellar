"use server";

export async function updateJob(referenceNumber: string, values: any) {
  try {
    const url =
      process.env.NEXT_PUBLIC_SITE_URL +
      `/api/jobs/reference/${referenceNumber}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return { success: true, data: await res.json() };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function fetchJobDetails(reference: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL + `/api/admin/jobs/reference/${reference}`
  );
  const data = await res.json();
  return data.response;
}

export async function fetchStatusOptions() {
  const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + `/api/job_status`);
  const data = await res.json();
  return data.response;
}
