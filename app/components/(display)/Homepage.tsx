"use client";

import { useState } from "react";
import Image from "next/image";
import { LatestJobs, Search, Hero } from "@/app/components";

export default function Homepage() {
  // Image loading states
  const [isDividerImageLoaded, setIsDividerImageLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center w-screen overflow-x-hidden">
      <Hero
        imageUrl="/images/stock2.jpg"
        placeholderUrl="/images/stock2-placeholder.jpg"
        title={
          <em className="block text-3xl md:text-5xl font-bold text-white text-center py-6 px-4 leading-tight tracking-wide drop-shadow-lg">
            &quot;Connecting talent with opportunity&quot;
          </em>
        }
        height="h-[70vh]"
        overlay={true}
      >
        {/* Search Component */}
        <div className="w-11/12 md:w-2/3 lg:w-1/2 mt-8 bg-emerald-950/90 p-6 rounded-xl shadow-2xl backdrop-blur animate-slideUp">
          <Search source="home" />
        </div>
      </Hero>

      <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 transform hover:scale-[1.01] transition-transform">
          <h2 className="text-xl md:text-2xl text-center leading-relaxed text-gray-800 font-medium">
            Welcome to Stellar Recruitment, where stars align with schools and
            educators! Whether you&apos;re a cover, supply, or classroom
            teacher, count on us to connect you with exceptional opportunities.
            Explore our website to discover how we can help you shine in your
            teaching career. Let&apos;s make an impact in education together!
          </h2>
        </div>
      </div>

      {/* Optimized Divider Image */}
      <div className="relative w-full h-[60vh] my-8 bg-gray-200">
        {/* Low-quality placeholder that shows while the main image loads */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url('/images/stock1-placeholder.jpg')`,
            opacity: isDividerImageLoaded ? 0 : 1,
          }}
        />

        <Image
          src="/images/stock1.jpg" // Changed to use path in public folder
          alt="Educational environment"
          fill
          quality={85}
          className={`object-cover object-center transition-opacity duration-500 ${
            isDividerImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 100vw"
          onLoad={() => setIsDividerImageLoaded(true)}
          loading="lazy" // Use lazy loading for below-the-fold image
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
      </div>

      {/* Latest Jobs Section */}
      <div className="w-full flex justify-center py-12">
        <LatestJobs />
      </div>
    </div>
  );
}
