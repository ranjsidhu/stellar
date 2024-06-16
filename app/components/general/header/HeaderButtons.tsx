import { useAppDispatch } from "@/lib/hooks";
import { clearSession, setAuthenticated } from "@/lib/features/Auth";
import Link from "next/link";

export default function HeaderButtons({ role }: { role: string | undefined }) {
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
        <button className="header-button" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <Link href="/login" className="header-button">
          Login
        </Link>
      )}
    </div>
  );
}
