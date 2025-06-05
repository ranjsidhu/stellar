import { Footer, Header, Notification } from "..";
import type { LayoutProps } from "@/app/types";

export default async function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Notification />
      <Header />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
