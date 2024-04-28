import "./process.css";

import { StepProps } from "@/app/constants/types.index";
import { processSteps } from "@/app/constants";

const Step = ({ title, index, description }: StepProps) => {
  return (
    <div className="step">
      <div className="step-index">
        <p>{index + 1}</p>
      </div>
      <div className="step-right">
        <div className="step-title">
          <h3>{title}</h3>
        </div>
        <div className="step-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function TheProcess() {
  return (
    <section>
      <div className="process-hero">
        <h2>Application and interview process</h2>
      </div>

      <div className="process-wrapper">
        <p className="process-statement">
          At Stellar Recruitment, we boast a highly efficient and streamlined
          application process that is both reliable and lightning-fast. Our
          paramount responsibility lies in meticulously ensuring that the
          candidate not only aligns with the client&apos;s needs but also
          undergoes thorough vetting procedures upheld to the utmost quality
          standards.
        </p>
        <p className="process-statement">
          Below are the stages that will take place before a candidate is sent
          out to a placement:
        </p>
        <div className="process-steps">
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
