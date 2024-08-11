import styles from "./Safeguarding.module.css";

export default function SafeguardingPage() {
  return (
    <section>
      <div className={styles.safeguardingHero}>
        <h2>Safeguarding</h2>
      </div>
      <div className={styles.safeguardingWrapper}>
        <div className={styles.safeguardingSection}>
          <h2 className={styles.safeguardingTitle}>
            Safeguarding guarantee for schools
          </h2>
          <section>
            At Stellar Recruitment, we take pride in our commitment to keeping
            our supply staff abreast of any developments in the education
            sector. It&apos;s our responsibility to ensure they&apos;re equipped
            with the latest knowledge and skills necessary to excel in their
            roles. Beyond initial vetting and placement, we proactively provide
            ongoing training and support to our staff, ensuring they remain
            updated on any changes in education and are prepared for future
            challenges. We firmly believe that investing in our supply
            staff&apos;s continuous professional development not only benefits
            them but also enhances the quality of service we deliver to your
            school.
          </section>
        </div>
        <div className={styles.safeguardingSection}>
          <h2 className={styles.safeguardingTitle}>Duty of care</h2>
          <section>
            All staff at Stellar Recruitment understand their duty of care
            towards every school they collaborate with, comprehending the
            pivotal role they play in safeguarding. Each member of our team has
            completed the requisite safeguarding training, including child
            protection and full DBS checks, alongside safer recruitment
            training. Moreover, our staff are committed to staying abreast of
            any developments in safer recruitment and safeguarding within
            schools through continuous professional development (CPD). With our
            team at Stellar, you can rest assured that you and your school are
            in safe hands.
          </section>
        </div>
      </div>
    </section>
  );
}
