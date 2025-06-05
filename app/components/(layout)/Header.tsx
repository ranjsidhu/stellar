import Image from "next/image";
import Link from "next/link";
import { DARK } from "@/app/assets";
import { Navbar, MobileMenuWrapper } from "@/app/components";
import { getSession } from "@/app/utils/session";
import { getUserDetails } from "@/app/(pages)/profile/user/(profile)/serveractions";

export default async function Header() {
  const session = await getSession();
  const userDetails = await getUserDetails(session?.user?.email);

  return (
    <div className="w-screen flex flex-col justify-center items-center bg-[#00150f]">
      <header className="w-[95vw] max-w-7xl h-[180px] lg:h-[220px] mx-auto flex justify-between items-center">
        <div className="mr-auto flex items-center h-full">
          <div className="relative h-[70%] w-auto aspect-[3/2] min-w-[120px]">
            <Link href="/">
              <Image
                src={DARK}
                alt="logo"
                fill
                className="object-contain transition-transform duration-300 cursor-pointer"
                priority
              />
            </Link>
          </div>
        </div>

        <div className="h-full mt-auto mb-auto hidden lg:flex flex-col justify-center items-center">
          <Navbar userDetails={userDetails} />
        </div>

        <div className="flex items-center lg:hidden">
          <MobileMenuWrapper session={session} userDetails={userDetails} />
        </div>
      </header>
    </div>
  );
}
