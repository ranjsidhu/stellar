import Link from "next/link";
import { Hero } from "@/app/components";

export default function SafeguardingPage() {
  return (
    <section className="w-full">
      <Hero
        imageUrl="/images/safeguarding.jpg"
        placeholderUrl="/images/safeguarding-placeholder.jpg"
        title="Safeguarding"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Safeguarding Guarantee Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#DAA520]"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#00150f] rounded-full flex items-center justify-center text-white mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#00150f]">
                  Safeguarding Guarantee for Schools
                </h3>
              </div>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  At Stellar Recruitment, we take pride in our commitment to
                  keeping our supply staff abreast of any developments in the
                  education sector. It&apos;s our responsibility to ensure
                  they&apos;re equipped with the latest knowledge and skills
                  necessary to excel in their roles.
                </p>
                <p className="mb-4">
                  Beyond initial vetting and placement, we proactively provide
                  ongoing training and support to our staff, ensuring they
                  remain updated on any changes in education and are prepared
                  for future challenges.
                </p>
                <p>
                  We firmly believe that investing in our supply staff&apos;s
                  continuous professional development not only benefits them but
                  also enhances the quality of service we deliver to your
                  school.
                </p>
              </div>
            </div>
          </div>

          {/* Duty of Care Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#DAA520]"></div>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#00150f] rounded-full flex items-center justify-center text-white mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#00150f]">
                  Duty of Care
                </h3>
              </div>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  All staff at Stellar Recruitment understand their duty of care
                  towards every school they collaborate with, comprehending the
                  pivotal role they play in safeguarding.
                </p>
                <p className="mb-4">
                  Each member of our team has completed the requisite
                  safeguarding training, including child protection and full DBS
                  checks, alongside safer recruitment training.
                </p>
                <p>
                  Moreover, our staff are committed to staying abreast of any
                  developments in safer recruitment and safeguarding within
                  schools through continuous professional development (CPD).
                  With our team at Stellar, you can rest assured that you and
                  your school are in safe hands.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-[#00150f]/5 rounded-lg border-l-4 border-[#DAA520] p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-[#00150f] mb-2">
                Our Commitment to Safety
              </h3>
              <p className="text-gray-700">
                We prioritise safeguarding in every aspect of our recruitment
                process. Contact us to learn more about our rigorous standards.
              </p>
            </div>
            <button className="px-6 py-3 bg-[#00150f] text-white rounded-md hover:bg-[#00150f]/90 transition-colors shadow-md hover:shadow-lg whitespace-nowrap">
              <Link href="/contact-us">Contact Us</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
