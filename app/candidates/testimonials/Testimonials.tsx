"use client";

import { useEffect, useState } from "react";
import { SectionLoading } from "@/app/components";
import { Testimonial } from "@/app/types";
import "./testimonials.css";

export default function Testimonials() {
  const [isLoading, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/testimonials/5");
        const data: { response: Testimonial[]; message: string } =
          await response.json();
        setTestimonials(data.response);
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
    };
    getJobs();
  }, []);

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
