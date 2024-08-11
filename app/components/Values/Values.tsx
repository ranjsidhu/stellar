import {
  Accountable,
  Impact,
  Integrity,
  Partnership,
  Reliable,
  Safe,
} from "@/app/assets";
import Image from "next/image";
import { aboutUsValues } from "@/app/constants";
import styles from "./Values.module.css";

const images = [Accountable, Partnership, Reliable, Safe, Integrity, Impact];

export default function Values() {
  return (
    <div className={styles.valueWrapper}>
      <h2 className={styles.valuesTitle}>VALUES</h2>
      {aboutUsValues.map(({ value, statement }, index) => (
        <div key={index} className={styles.valuesWrapper}>
          {index % 2 === 0 ? (
            <div className={styles.value}>
              <Image
                src={images[index]}
                alt={value}
                className={styles.valueImage}
              />
              <p className={styles.valueStatement}>{statement}</p>
            </div>
          ) : (
            <div className={styles.value}>
              <p className={styles.valueStatement}>{statement}</p>
              <Image
                src={images[index]}
                alt="value-image"
                className={styles.valueImage}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
