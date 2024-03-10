"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/lib/features/UI";
import { RootState } from "@/lib/store";
import LayoutMain from "./LayoutMain";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isOverlayVisible } = useSelector((state: RootState) => state.UI);

  const overlayClicked = () => {
    const visibility = !isOverlayVisible;
    if (!visibility) dispatch(toggleMobileMenu({ visible: false }));
  };

  return (
    <div className="container">
      <div
        className={`${isOverlayVisible ? "overlay" : "hidden"}`}
        onClick={overlayClicked}
      ></div>
      <LayoutMain>
        <div>{children}</div>
      </LayoutMain>
    </div>
  );
}
