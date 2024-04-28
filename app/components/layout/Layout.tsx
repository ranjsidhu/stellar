"use client";

import "./layout.css";

import { Footer, Header, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { toggleMobileMenu } from "@/lib/features/UI";
import { usePathname } from "next/navigation";

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
      <div className="header">
        {!validPaths.includes(pathname) && <Header />}
      </div>
      {!validPaths.includes(pathname) && (
        <div className="header-socials">
          <a href="#" target="_blank" className="fa fa-facebook"></a>
          <a href="#" target="_blank" className="fa fa-instagram"></a>
          <a href="#" target="_blank" className="fa fa-linkedin"></a>
          <a href="#" target="_blank" className="fa fa-envelope"></a>
        </div>
      )}
      {children}
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
}
