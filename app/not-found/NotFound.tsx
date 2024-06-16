import "./not-found.css";

export default function NotFound() {
  return (
    <>
      <br />
      <h3 className="not-found-title">Not Found</h3>
      <br />
      <div className="not-found">
        <p>We haven&apos;t been able to find the page you requested</p>
        <p>
          Click <a href="/">here</a> to go back to the homepage
        </p>
      </div>
    </>
  );
}
