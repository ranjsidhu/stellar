import Image from "next/image";
import TestimonialsList from "./TestimonialsList";
import testimonialsImage from "@/app/assets/stock/testimonials.jpg";

export default function TestimonialsPage() {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-60 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0  z-10"></div>
        <Image
          src={testimonialsImage}
          alt="Testimonials"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="z-20 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg">
            Testimonials
          </h2>
        </div>
      </div>

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
