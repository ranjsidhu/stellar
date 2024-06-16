import "./header.css";

export default function Hamburger({
  isMobile,
  toggleMenu,
}: {
  isMobile: boolean;
  toggleMenu: () => void;
}) {
  const isOpen = isMobile ? "open" : "";

  return (
    <div className="hamburger-container" onClick={toggleMenu}>
      <div className={`hamburger-bar ${isOpen}`} />
      <div className={`hamburger-bar ${isOpen}`} />
      <div className={`hamburger-bar ${isOpen}`} />
    </div>
  );
}
