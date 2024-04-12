import Testimonials from "./Testimonials";
import "./testimonials.css";

export default function TestimonialsPage() {
  return (
    <div className="testimonials-wrapper">
      <div className="testimonials-hero">
        <h2>Testimonials</h2>
      </div>
      <Testimonials />
    </div>
  );
}
