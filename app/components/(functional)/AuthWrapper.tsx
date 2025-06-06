import { redirect } from "next/navigation";
import { getSession } from "@/app/utils/session";
import { AuthWrapperProps, Role } from "@/app/types";
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
  const userRole = userDetails?.roles?.name;

  if (!userRole) {
    redirect("/");
  }

  if (role && !role.includes(userRole as Role)) {
    redirect("/");
  }

  return <>{children}</>;
}
