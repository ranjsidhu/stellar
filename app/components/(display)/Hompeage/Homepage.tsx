import Image from "next/image";
import stock1 from "@/app/assets/stock/stock1.jpg";
import stock2 from "@/app/assets/stock/stock2.jpg";
import { LatestJobs, Search } from "@/app/components";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center w-screen overflow-x-hidden">
      <div className="relative w-screen h-[70vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-screen h-full bg-black/50 z-0">
          <Image
            src={stock2}
            alt="Teacher in classroom"
            fill
            priority
            className="object-cover object-center opacity-90"
            sizes="100vw"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-fadeIn text-center">
            <em className="block text-3xl md:text-5xl font-bold text-white text-center py-6 px-4 leading-tight tracking-wide drop-shadow-lg">
              &quot;Connecting talent with opportunity&quot;
            </em>
          </div>

          {/* Search Component */}
          <div className="w-11/12 md:w-2/3 lg:w-1/2 mt-8 bg-emerald-950/90 p-6 rounded-xl shadow-2xl backdrop-blur animate-slideUp">
            <Search source="home" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 transform hover:scale-[1.01] transition-transform">
          <h2 className="text-xl md:text-2xl text-center leading-relaxed text-gray-800 font-medium">
            Welcome to Stellar Recruitment, where stars align with schools and
            educators! Whether you&apos;re a cover, supply, or classroom
            teacher, count on us to connect you with exceptional opportunities.
            Explore our website to discover how we can help you shine in your
            teaching career. Let&apos;s make an impact in education together!
          </h2>
        </div>
      </div>

      {/* Divider Image */}
      <div className="relative w-full h-[60vh] my-8">
        <Image
          src={stock1}
          alt="Educational environment"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 "></div>
      </div>

      {/* Latest Jobs Section */}
      <div className="w-full flex justify-center py-12">
        <LatestJobs />
      </div>
    </div>
  );
}
