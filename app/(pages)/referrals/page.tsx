import type { Metadata } from "next";
import Referrals from "./Referrals";
import { Hero } from "@/app/components";

export const metadata: Metadata = {
  title: "Referrals",
  description: "Referrals",
};

export default function ReferralsPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero
        imageUrl="/images/refer.jpg"
        placeholderUrl="/images/refer-placeholder.jpg"
        title="Referrals"
      />

      {/* Introduction with Incentive Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h3 className="text-2xl font-bold text-[#00150f] mb-4">
          Refer and Earn Rewards
        </h3>
        <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-8"></div>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#DAA520] flex-1 max-w-xs mx-auto md:mx-0">
            <div className="text-4xl font-bold text-[#00150f] mb-2">£200</div>
            <p className="text-gray-700">
              Reward for referring a qualified teacher
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#DAA520] flex-1 max-w-xs mx-auto md:mx-0">
            <div className="text-4xl font-bold text-[#00150f] mb-2">£100</div>
            <p className="text-gray-700">
              Reward for referring a cover or supply teacher
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-2">
          Simply fill out the form below with your details and your
          friend&apos;s information.
        </p>
        <p className="text-gray-500 italic mb-8">
          We&apos;ll take care of the rest and notify you when your reward is
          ready!
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-3 bg-[#DAA520]"></div>
          <div className="p-8">
            <h3 className="text-xl font-bold text-[#00150f] mb-6 text-center">
              Referral Form
            </h3>
            <Referrals />
          </div>
        </div>
      </div>
    </div>
  );
}
