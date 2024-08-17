import TestimonialsList from "./TestimonialsList";
import styles from "./Testimonials.module.css";

export default function TestimonialsPage() {
  return (
    <section>
      <div className={styles.testimonialsHero}>
        <h2>Testimonials</h2>
      </div>
      <div className={styles.testimonialsWrapper}>
        <TestimonialsList />
      </div>
    </section>
  );
}
