import { useRouter } from "next/navigation";

export default function HeaderButtons() {
  const router = useRouter();

  return (
    <div className="header-buttons">
      <a
        className="header-button"
        onClick={() => {
          router.push("/register");
        }}
      >
        Register{" "}
      </a>
      <a
        className="header-button"
        onClick={() => {
          router.push("/login?type=client");
        }}
      >
        Client Login
      </a>
      <a
        className="header-button"
        onClick={() => {
          router.push("/login?type=candidate");
        }}
      >
        Candidate Login
      </a>
      <a className="header-button">Call: 0123 456 789</a>
    </div>
  );
}
