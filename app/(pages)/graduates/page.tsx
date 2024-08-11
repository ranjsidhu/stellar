import Graduates from "./Graduates";
import "./graduates.css";

export default function GraduatesPage() {
  return (
    <div className="graduates-wrapper">
      <div className="graduates-hero">
        <h2>Graduates</h2>
      </div>
      <div className="graduates-intro">
        <p>
          Are you a graduate? Are you seeking a new role? Supply/cover
          supervisors could be the role for you! Cover teachers or supply
          teachers could be the initial steps toward your new career as a
          classroom teacher. This way, you are able to gain some experience
          within a school setting before making your definitive decision. We
          also have great contacts at a range of universities that could support
          you in completing your teacher training program. If you are
          interested, please register your details below:
        </p>
      </div>
      <div className="graduates-form">
        <Graduates />
      </div>
    </div>
  );
}
