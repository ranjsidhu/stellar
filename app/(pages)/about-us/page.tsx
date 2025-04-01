import type { Metadata } from "next";
import { Values, Hero } from "@/app/components";
import { aboutUsText } from "@/app/constants";

export const metadata: Metadata = {
  title:
    "Leading Educational Recruitment Agency in West Midlands - Stellar Recruitment",
  description: "Connecting talent with opportunity in the West Midlands",
  alternates: {
    canonical: "https://stellar-recruitment.co.uk",
    types: {
      www: "https://www.stellar-recruitment.co.uk",
    },
  },
};

export default function AboutUsPage() {
  return (
    <section className="flex flex-col items-center w-full">
      <Hero
        imageUrl="/images/aboutus.jpg"
        placeholderUrl="/images/aboutus-placeholder.jpg"
        title="About Us"
      />

      {/* Mission Statement Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-[#00150f] mb-4">
            Our Mission
          </h3>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {aboutUsText[0]}
          </p>
        </div>

        {/* Who We Are Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#00150f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00150f]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-center mb-3 text-[#00150f]">
              School Partnerships
            </h4>
            <p className="text-gray-700 text-center">{aboutUsText[1]}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#00150f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00150f]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-center mb-3 text-[#00150f]">
              Interview Support
            </h4>
            <p className="text-gray-700 text-center">{aboutUsText[2]}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-[#00150f]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00150f]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-center mb-3 text-[#00150f]">
              Professional Development
            </h4>
            <p className="text-gray-700 text-center">{aboutUsText[3]}</p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-[#00150f]/5 rounded-lg p-8 mb-16 border-l-4 border-[#DAA520]">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-[#00150f] mb-4">
              Our Vision
            </h3>
            <p className="text-lg text-gray-700 italic">{aboutUsText[4]}</p>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-3xl font-bold text-center text-[#00150f] mb-4">
            Our Values
          </h3>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-12"></div>
          <Values />
        </div>
      </div>
    </section>
  );
}
