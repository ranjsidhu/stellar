import "./testimonials.css";

import Testimonials from "./Testimonials";

export default function TestimonialsPage() {
  return (
    <section>
      <div className="testimonials-hero">
        <h2>Testimonials</h2>
      </div>
      <div className="testimonials-wrapper">
        <Testimonials />
      </div>
    </section>
  );
}
