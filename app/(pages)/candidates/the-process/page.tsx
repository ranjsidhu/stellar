import Link from "next/link";
import { StepProps } from "@/app/types";
import { processSteps } from "@/app/constants";
import { Hero } from "@/app/components";

const Step = ({ title, index, description }: StepProps) => {
  return (
    <div className="flex w-full gap-4 md:gap-6 mb-8 transition-all duration-300 hover:translate-x-1">
      <div className="flex-shrink-0 relative">
        <div className="flex items-center justify-center bg-[#00150f] text-white w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#DAA520] shadow-[0_0_10px_rgba(218,165,32,0.5)]">
          <span className="text-lg md:text-xl font-bold">{index + 1}</span>
        </div>
        {index < processSteps.length - 1 && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-[#DAA520] to-transparent"></div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl md:text-2xl font-semibold text-[#00150f] mb-2">
          {title}
        </h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default function TheProcess() {
  return (
    <section className="w-full">
      <Hero
        imageUrl="/images/process.jpg"
        placeholderUrl="/images/process-placeholder.jpg"
        title="Application and Interview Process"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700 mb-6">
            At Stellar Recruitment, we boast a highly efficient and streamlined
            application process that is both reliable and lightning-fast. Our
            paramount responsibility lies in meticulously ensuring that the
            candidate not only aligns with the client&apos;s needs but also
            undergoes thorough vetting procedures upheld to the utmost quality
            standards.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Below are the stages that will take place before a candidate is sent
            out to a placement:
          </p>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto"></div>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00150f]"></div>

          {/* Timeline Decorations */}
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-[#DAA520]/10 -z-10"></div>
          <div className="absolute bottom-4 left-20 w-16 h-16 rounded-full bg-[#DAA520]/10 -z-10"></div>

          <div className="py-6">
            {processSteps.map(({ step, description }, index) => (
              <Step
                key={step}
                title={step}
                description={description}
                index={index}
              />
            ))}
          </div>

          {/* Final Step Decoration */}
          <div className="w-full flex justify-center mt-4">
            <div className="w-24 h-1 bg-[#DAA520]/50"></div>
          </div>
        </div>

        {/* Additional Call-to-Action */}
        <div className="max-w-3xl mx-auto mt-12 text-center p-6 bg-[#00150f]/5 rounded-lg border-t-4 border-[#DAA520]">
          <h3 className="text-xl font-semibold text-[#00150f] mb-3">
            Ready to Begin Your Journey?
          </h3>
          <p className="mb-6 text-gray-700">
            Start the process today and let us help you find the perfect
            educational opportunity.
          </p>
          <button className="px-6 py-3 bg-[#00150f] text-white rounded-md hover:bg-[#00150f]/90 transition-colors shadow-md hover:shadow-lg">
            <Link href="/register">Register Now</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
