import { useRouter } from "next/navigation";
import { Button } from "@/app/components";

export default function UnauthenticatedButtons() {
  const router = useRouter();

  return (
    <>
      <Button type="primary" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button type="primary" onClick={() => router.push("/register")}>
        Register
      </Button>
    </>
  );
}
