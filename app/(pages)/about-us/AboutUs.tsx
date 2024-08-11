import "./aboutus.css";

import AboutUsText from "./AboutUsText";
import Values from "./Values";

export default function AboutUs() {
  return (
    <section>
      <div className="aboutus-hero">
        <h2>About Us</h2>
      </div>
      <div className="aboutus-wrapper">
        <div className="aboutus-statement">
          <AboutUsText />
        </div>
        <div className="aboutus-values">
          <Values />
        </div>
      </div>
    </section>
  );
}
