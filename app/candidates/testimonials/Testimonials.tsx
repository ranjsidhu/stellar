"use client";

import { SectionLoading } from "@/app/components";
import { Testimonial } from "@/app/types";
import { useFetch } from "@/app/hooks";
import "./testimonials.css";

export default function Testimonials() {
  const { isLoading, data: testimonials } =
    useFetch<Testimonial>("/testimonials/5");

  return (
    <div className="testimonials-list-wrapper">
      <SectionLoading loading={isLoading}>
        {testimonials.length > 0 && (
          <div className="testimonials-list">
            {testimonials.map(({ testimonial }, index) => (
              <div className="testimonial" key={index}>
                &quot;{testimonial}&quot;
              </div>
            ))}
          </div>
        )}
      </SectionLoading>
    </div>
  );
}
