import { Footer, Header } from "../../components";
import "./layout.css";

export default async function Layout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | undefined;
}) {
  return (
    <div className="container">
      <Header role={role} />
      {children}
      <Footer />
    </div>
  );
}
