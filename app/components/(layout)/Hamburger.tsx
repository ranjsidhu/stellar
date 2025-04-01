type HamburgerProps = {
  isMobileMenuOpen: boolean;
  toggleMenu: () => void;
};

export default function Hamburger({
  isMobileMenuOpen,
  toggleMenu,
}: Readonly<HamburgerProps>) {
  return (
    <button
      className="flex flex-col justify-between items-start h-[30px] w-[40px] lg:hidden cursor-pointer bg-transparent border-0"
      onClick={toggleMenu}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMobileMenuOpen}
    >
      <div
        className={`w-10 h-1 bg-yellow-400 transition-transform duration-400
          ${
            isMobileMenuOpen
              ? "transform -rotate-45 translate-y-[9px] -translate-x-[9px]"
              : ""
          }`}
      />
      <div
        className={`w-10 h-1 bg-yellow-400 transition-opacity duration-400
          ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
      />
      <div
        className={`w-10 h-1 bg-yellow-400 transition-transform duration-400
          ${
            isMobileMenuOpen
              ? "transform rotate-45 -translate-y-[9px] -translate-x-[9px]"
              : ""
          }`}
      />
    </button>
  );
}
