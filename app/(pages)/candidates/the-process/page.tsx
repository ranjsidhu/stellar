import { StepProps } from "@/app/constants/types.index";
import { processSteps } from "@/app/constants";
import styles from "./Process.module.css";

const Step = ({ title, index, description }: StepProps) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepIndex}>
        <p>{index + 1}</p>
      </div>
      <div className={styles.stepRight}>
        <div className={styles.stepTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.stepDescription}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function TheProcess() {
  return (
    <section className={styles.processSection}>
      <div className={styles.processHero}>
        <h2>Application and interview process</h2>
      </div>

      <div className={styles.processWrapper}>
        <p className={styles.processStatement}>
          At Stellar Recruitment, we boast a highly efficient and streamlined
          application process that is both reliable and lightning-fast. Our
          paramount responsibility lies in meticulously ensuring that the
          candidate not only aligns with the client&apos;s needs but also
          undergoes thorough vetting procedures upheld to the utmost quality
          standards.
        </p>
        <p className={styles.processStatement}>
          Below are the stages that will take place before a candidate is sent
          out to a placement:
        </p>
        <div className={styles.processSteps}>
          {processSteps.map(({ step, description }, index) => (
            <Step
              key={index}
              title={step}
              description={description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
