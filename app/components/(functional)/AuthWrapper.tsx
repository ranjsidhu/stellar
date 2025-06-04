import { redirect } from "next/navigation";
import { getSession } from "@/app/utils/session";

export default async function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
