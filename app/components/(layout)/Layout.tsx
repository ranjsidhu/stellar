import { Footer, Header, Redirect, Notification } from "..";

export default async function Layout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | undefined | null;
}) {
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
