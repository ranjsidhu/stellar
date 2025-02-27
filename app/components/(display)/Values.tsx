import {
  Accountable,
  Impact,
  Integrity,
  Partnership,
  Reliable,
  Safe,
} from "@/app/assets";
import Image from "next/image";
import { aboutUsValues } from "@/app/constants";

const images = [Accountable, Partnership, Reliable, Safe, Integrity, Impact];

export default function Values() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* This wrapper will help center the last two cards */}
        <div className="contents lg:col-span-3">
          {aboutUsValues.slice(0, 3).map(({ value, statement }, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-24 bg-[#00150f] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#DAA520] opacity-20"></div>
                <div className="relative z-10 h-16 w-16">
                  <Image
                    src={images[index]}
                    alt={value}
                    className="object-contain filter brightness-0 invert"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#00150f] mb-3 text-center">
                  {value}
                </h3>
                <p className="text-gray-700">{statement}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Last two cards centered */}
        <div className="contents lg:col-span-3">
          <div className="lg:col-span-3 flex justify-center gap-8 w-full">
            {aboutUsValues.slice(3, 5).map(({ value, statement }, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full md:w-1/2 lg:max-w-md"
              >
                <div className="h-24 bg-[#00150f] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#DAA520] opacity-20"></div>
                  <div className="relative z-10 h-16 w-16">
                    <Image
                      src={images[index + 3]}
                      alt={value}
                      className="object-contain filter brightness-0 invert"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#00150f] mb-3 text-center">
                    {value}
                  </h3>
                  <p className="text-gray-700">{statement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
