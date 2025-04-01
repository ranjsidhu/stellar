"use client";

import { useState } from "react";
import { SectionLoading } from "@/app/components";
import { Testimonial } from "@/app/types";
import { useFetch } from "@/app/hooks";

export default function TestimonialsList() {
  const { isLoading, data: testimonials } =
    useFetch<Testimonial>("/testimonials/5");

  const [activeIndex, setActiveIndex] = useState(0);

  // Handle previous testimonial
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle next testimonial
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      <SectionLoading loading={isLoading}>
        {testimonials.length > 0 && (
          <div className="relative">
            {/* Featured Testimonial */}
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#00150f]"></div>
              <div className="absolute top-4 right-4 text-8xl opacity-10 text-[#DAA520]">
                &quot;
              </div>

              <div className="text-xl md:text-2xl text-gray-700 italic mb-6 relative z-10">
                &quot;{testimonials[activeIndex]?.testimonial}&quot;
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#00150f] rounded-full flex items-center justify-center text-white mb-3">
                  {testimonials[activeIndex]?.author?.charAt(0) || "S"}
                </div>
                <div className="font-semibold text-[#00150f]">
                  {testimonials[activeIndex]?.author || "Stellar Candidate"}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(
                    testimonials[activeIndex]?.created_at
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border-2 border-[#00150f] flex items-center justify-center text-[#00150f] hover:bg-[#00150f] hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Indicator Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={_.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex
                        ? "bg-[#DAA520]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border-2 border-[#00150f] flex items-center justify-center text-[#00150f] hover:bg-[#00150f] hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Additional Testimonials Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {testimonials
                .filter((_, idx) => idx !== activeIndex)
                .slice(0, 3)
                .map((item) => (
                  <button
                    key={item.id}
                    className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#DAA520] hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      // Find the actual index in the original array
                      const actualIndex = testimonials.findIndex(
                        (t) => t === item
                      );
                      setActiveIndex(actualIndex);
                    }}
                  >
                    <div className="text-gray-700 italic mb-4 line-clamp-3">
                      &quot;
                      {item.testimonial.length > 120
                        ? `${item.testimonial.substring(0, 120)}...`
                        : item.testimonial}
                      &quot;
                    </div>
                    <div className="font-semibold text-[#00150f]">
                      {item?.author || "Stellar Candidate"}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}
      </SectionLoading>
    </div>
  );
}
