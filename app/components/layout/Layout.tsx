import { Footer, Header } from "../../components";
import "./layout.css";

export default async function Layout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | undefined | null;
}) {
  return (
    <div className="container">
      <Header role={role} />
      <div className="app-children">{children}</div>
      <Footer />
    </div>
  );
}
