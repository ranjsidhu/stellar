import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <br />
      <h3 className={styles.notFoundTitle}>Not Found</h3>
      <br />
      <div className={styles.notFound}>
        <p>We haven&apos;t been able to find the page you requested</p>
        <p>
          Click <a href="/">here</a> to go back to the homepage
        </p>
      </div>
    </>
  );
}
