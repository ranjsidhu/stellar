import { Footer, Header } from "../..";
import styles from "./Layout.module.css";

export default async function Layout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | undefined | null;
}) {
  return (
    <div className={styles.container}>
      <Header role={role} />
      <div className={styles.appChildren}>{children}</div>
      <Footer />
    </div>
  );
}
