import { useAppDispatch } from "@/lib/hooks";
import { clearSession, setAuthenticated } from "@/lib/features/Auth";
import Link from "next/link";

export default function HeaderButtons({
  role,
}: {
  role: string | undefined | null;
}) {
  const dispatch = useAppDispatch();

  const signOut = async () => {
    fetch("/api/auth/signout", { method: "POST" }).then(() => {
      dispatch(clearSession({}));
      dispatch(setAuthenticated(false));
      window.location.reload();
      window.location.href = "/";
    });
  };

  return (
    <div className="header-buttons">
      {role === "authenticated" ? (
        <>
          <Link href="/profile" className="header-button">
            Account
          </Link>
          <button className="header-button" onClick={signOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="header-button">
            Login
          </Link>
          <Link href="/register" className="header-button">
            Register
          </Link>
        </>
      )}
    </div>
  );
}
