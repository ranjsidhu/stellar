"use client";

import { useFetchTestimonials } from "@/app/hooks";
import { useAppSelector } from "@/lib/hooks";
import "./testimonials.css";

export default function Testimonials() {
  useFetchTestimonials();
  const { testimonials } = useAppSelector((state) => state.Testimonials);

  return (
    <div className="testimonials-list-wrapper">
      {testimonials.length > 0 && (
        <div className="testimonials-list">
          {testimonials.map(({ testimonial }, index) => (
            <div className="testimonial" key={index}>
              &quot;{testimonial}&quot;
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
