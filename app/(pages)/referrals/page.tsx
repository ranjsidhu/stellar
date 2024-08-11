import Referrals from "./Referrals";
import "./referrals.css";

export default function ReferralsPage() {
  return (
    <div className="referrals-wrapper">
      <div className="referrals-hero">
        <h2>Recommend a friend</h2>
      </div>
      <div className="referrals-intro">
        <p>
          Recommend a friend to Stellar, and you will receive £200 for a
          qualified teacher and £100 for a cover or supply teacher.
        </p>
        <p>Please enter your friends and your own details below.</p>
      </div>
      <div className="referrals-form">
        <Referrals />
      </div>
    </div>
  );
}
