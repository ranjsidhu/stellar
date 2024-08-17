"use client";

import { SectionLoading } from "@/app/components";
import { Testimonial } from "@/app/types";
import { useFetch } from "@/app/hooks";
import styles from "./Testimonials.module.css";

export default function TestimonialsList() {
  const { isLoading, data: testimonials } =
    useFetch<Testimonial>("/testimonials/5");

  return (
    <div className={styles.testimonialsListWrapper}>
      <SectionLoading loading={isLoading}>
        {testimonials.length > 0 && (
          <div className={styles.testimonialsList}>
            {testimonials.map(({ testimonial }, index) => (
              <div className={styles.testimonial} key={index}>
                &quot;{testimonial}&quot;
              </div>
            ))}
          </div>
        )}
      </SectionLoading>
    </div>
  );
}
