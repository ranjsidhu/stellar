import { Footer, Header, Redirect, Notification } from "..";
import type { LayoutProps } from "@/app/types";

export default async function Layout({
  children,
  role,
}: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Redirect />
      <Notification />
      <Header role={role} />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
