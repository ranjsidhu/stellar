import Referrals from "./Referrals";
import styles from "./Referrals.module.css";

export default function ReferralsPage() {
  return (
    <div className={styles.referralsWrapper}>
      <div className={styles.referralsHero}>
        <h2>Recommend a friend</h2>
      </div>
      <div className={styles.referralsIntro}>
        <p>
          Recommend a friend to Stellar, and you will receive £200 for a
          qualified teacher and £100 for a cover or supply teacher.
        </p>
        <p>Please enter your friends and your own details below.</p>
      </div>
      <div className={styles.referralsForm}>
        <Referrals />
      </div>
    </div>
  );
}
