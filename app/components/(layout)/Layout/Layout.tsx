import { Footer, Header, Redirect, Notification } from "../..";
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
      <Redirect />
      <Notification />
      <Header role={role} />
      <main className={styles.appChildren}>{children}</main>
      <Footer />
    </div>
  );
}
