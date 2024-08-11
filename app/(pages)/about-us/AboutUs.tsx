import Values from "../../components/Values/Values";
import { aboutUsText } from "@/app/constants";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <section>
      <div className={styles.aboutUsHero}>
        <h2>About Us</h2>
      </div>
      <div className={styles.aboutUsWrapper}>
        <div className={styles.aboutUsStatement}>
          {aboutUsText.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
        <div className={styles.aboutUsValues}>
          <Values />
        </div>
      </div>
    </section>
  );
}
