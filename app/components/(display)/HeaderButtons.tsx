import { useSession } from "next-auth/react";
import { AuthenticatedButtons, UnauthenticatedButtons } from "@/app/components";

export default function HeaderButtons() {
  const { data: session } = useSession();

  return (
    <div className="h-[112px] w-full flex justify-end items-center gap-5">
      {session ? (
        <AuthenticatedButtons role={session.user?.role} />
      ) : (
        <UnauthenticatedButtons />
      )}
    </div>
  );
}
