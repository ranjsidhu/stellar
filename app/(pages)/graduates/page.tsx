import Image from "next/image";
import Graduates from "./Graduates";
import graduateImage from "@/app/assets/stock/graduate.jpg";

export default function GraduatesPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-full h-60 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <Image
          src={graduateImage}
          alt="Graduates"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="z-20 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg">
            Graduates
          </h2>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h3 className="text-2xl font-bold text-[#00150f] mb-4">
          Start Your Teaching Journey
        </h3>
        <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-8"></div>
        <p className="text-lg text-gray-700 leading-relaxed">
          Are you a graduate? Are you seeking a new role? Supply/cover
          supervisors could be the role for you! Cover teachers or supply
          teachers could be the initial steps toward your new career as a
          classroom teacher. This way, you are able to gain some experience
          within a school setting before making your definitive decision. We
          also have great contacts at a range of universities that could support
          you in completing your teacher training program. If you are
          interested, please register your details below:
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-3 bg-[#DAA520]"></div>
          <div className="p-8">
            <h3 className="text-xl font-bold text-[#00150f] mb-6 text-center">
              Registration Form
            </h3>
            <Graduates />
          </div>
        </div>
      </div>
    </div>
  );
}
