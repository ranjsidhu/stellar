"use client";

import Image from "next/image";
import { useState, ReactNode } from "react";

interface HeroProps {
  imageUrl: string;
  placeholderUrl?: string;
  title: string | ReactNode;
  height?: string;
  quality?: number;
  blurDataUrl?: string;
  overlay?: boolean;
  children?: ReactNode;
}

export const Hero = ({
  imageUrl,
  placeholderUrl = "/images/placeholder.jpg",
  title,
  height = "h-80 md:h-96",
  quality = 85,
  blurDataUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='8' height='5' fill='%23f3f4f6' filter='url(%23b)'/%3E%3C/svg%3E",
  overlay = true,
  children,
}: HeroProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`relative w-full ${height} flex items-center justify-center overflow-hidden bg-gray-200`}
    >
      {/* Low-quality placeholder that shows while the main image loads */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url('${placeholderUrl}')`,
          opacity: isImageLoaded ? 0 : 1,
        }}
      />

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/50 z-10"></div>}

      <Image
        src={imageUrl}
        alt={typeof title === "string" ? `${title} Hero Image` : "Hero Image"}
        fill
        priority
        quality={quality}
        className={`object-cover object-center transition-opacity duration-500 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 768px) 100vw, 100vw"
        onLoad={() => setIsImageLoaded(true)}
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        {typeof title === "string" ? (
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider shadow-text">
            {title}
          </h2>
        ) : (
          title
        )}

        {/* Additional content */}
        {children}
      </div>
    </div>
  );
};
