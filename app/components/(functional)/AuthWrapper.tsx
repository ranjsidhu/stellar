import { redirect } from "next/navigation";
import { getSession } from "@/app/utils/session";
import { AuthWrapperProps } from "@/app/types";

export default async function AuthWrapper({
  children,
  role,
}: AuthWrapperProps) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  if (role && session.user.role !== role) {
    redirect("/");
  }

  return <>{children}</>;
}
