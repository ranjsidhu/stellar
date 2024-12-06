import Link from "next/link";
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
          Click <Link href="/">here</Link> to go back to the homepage
        </p>
      </div>
    </>
  );
}
