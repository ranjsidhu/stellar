import styles from "./Hamburger.module.css";

type HamburgerProps = {
  isMobile: boolean;
  toggleMenu: () => void;
};

export default function Hamburger({ isMobile, toggleMenu }: HamburgerProps) {
  const isOpen = isMobile ? styles.open : "";

  return (
    <div className={styles.hamburgerContainer} onClick={toggleMenu}>
      <div className={`${styles.hamburgerBar} ${isOpen}`} />
      <div className={`${styles.hamburgerBar} ${isOpen}`} />
      <div className={`${styles.hamburgerBar} ${isOpen}`} />
    </div>
  );
}
