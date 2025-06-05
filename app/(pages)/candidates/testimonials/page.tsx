import type { Metadata } from "next";
import TestimonialsList from "./TestimonialsList";
import { Hero } from "@/app/components";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <section className="w-full">
      <Hero
        imageUrl="/images/testimonials.jpg"
        placeholderUrl="/images/testimonials-placeholder.jpg"
        title="Testimonials"
      />

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold text-[#00150f] mb-4">
            What Our Candidates Say
          </h3>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Hear directly from educators who have found their perfect positions
            through Stellar Recruitment.
          </p>
        </div>

        <TestimonialsList />
      </div>
    </section>
  );
}
