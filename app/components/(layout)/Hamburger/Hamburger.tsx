type HamburgerProps = {
  isMobileMenuOpen: boolean;
  toggleMenu: () => void;
};

export default function Hamburger({
  isMobileMenuOpen,
  toggleMenu,
}: HamburgerProps) {
  return (
    <div
      className="hidden lg:!hidden md:inline-flex h-[30px] flex-col justify-between items-start cursor-pointer"
      onClick={toggleMenu}
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
    </div>
  );
}
