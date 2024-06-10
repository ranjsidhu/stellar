import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeaderButtons() {
  const router = useRouter();

  return (
    <div className="header-buttons">
      <Link href="/register" className="header-button">
        Register
      </Link>
      <Link href="/login" className="header-button">
        Login
      </Link>
    </div>
  );
}
