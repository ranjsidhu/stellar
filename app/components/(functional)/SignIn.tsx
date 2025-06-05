"use client";

import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/auth/sign-in");
      }}
      className="text-[#DAA520] text-base font-medium hover:underline transition-colors duration-150 flex items-center whitespace-nowrap hover:cursor-pointer"
    >
      Sign In
    </button>
  );
}
