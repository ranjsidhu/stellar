import styles from "./Hamburger.module.css";

type HamburgerProps = {
  isMobile: boolean;
  toggleMenu: () => void;
};

export default function Hamburger({ isMobile, toggleMenu }: HamburgerProps) {
  const isOpen = isMobile ? "open" : "";

  return (
    <div className={styles.hamburgerContainer} onClick={toggleMenu}>
      <div className={`hamburger-bar ${isOpen}`} />
      <div className={`hamburger-bar ${isOpen}`} />
      <div className={`hamburger-bar ${isOpen}`} />
    </div>
  );
}
