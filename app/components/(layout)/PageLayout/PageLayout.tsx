import styles from "./PageLayout.module.css";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pageLayoutWrapper}>
      <span className={styles.pageLayout}>{children}</span>
    </div>
  );
}
