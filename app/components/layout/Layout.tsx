"use client";

import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
import { Header, Footer, Loading } from "../../components";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const validPaths = ["/login", "/register"];
  const { isOverlayVisible } = useSelector((state: RootState) => state.UI);

  const overlayClicked = () => {
    const visibility = !isOverlayVisible;
    if (!visibility) dispatch(toggleMobileMenu({ visible: false }));
  };

  return (
    <div className="container">
      <Loading />
      {!validPaths.includes(pathname) && <Header />}
      {children}
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
}
