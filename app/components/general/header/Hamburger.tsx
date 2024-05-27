import "./header.css";

export default function Hamburger({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}) {
  const isOpen = isMobileMenuOpen ? "open" : "";

  return (
    <div
      className="hamburger-container"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      <div className={`hamburger-bar ${isOpen}`} />
      <div className={`hamburger-bar ${isOpen}`} />
      <div className={`hamburger-bar ${isOpen}`} />
    </div>
  );
}
