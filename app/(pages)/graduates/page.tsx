import type { Metadata } from "next";
import Graduates from "./Graduates";
import { Hero } from "@/app/components";

export const metadata: Metadata = {
  title: "Graduates",
  description: "Graduates",
};

export default function GraduatesPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero
        imageUrl="/images/graduates.jpg"
        placeholderUrl="/images/graduates-placeholder.jpg"
        title="Graduates"
      />

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
