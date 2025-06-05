import { redirect } from "next/navigation";
import { getSession } from "@/app/utils/session";
import { AuthWrapperProps } from "@/app/types";
import { getUserDetails } from "@/app/(pages)/profile/user/(profile)/serveractions";

export default async function AuthWrapper({
  children,
  role,
}: AuthWrapperProps) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const userDetails = await getUserDetails(session.user.email);

  if (role && userDetails?.roles?.name !== role) {
    redirect("/");
  }

  return <>{children}</>;
}
