import Link from "next/link";

export default function UserSettings() {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/auth/forgot-password"
        className="text-[#DAA520] text-base font-medium hover:underline hover:text-[#DAA520]/80 transition-colors duration-150 flex items-center whitespace-nowrap"
      >
        Change Password
      </Link>
    </div>
  );
}
