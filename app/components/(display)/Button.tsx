import { ComponentChildren, ButtonProps } from "@/app/types";

const defaultClick = () => {};

export default function Button({
  type,
  children,
  onClick,
}: Readonly<ButtonProps & ComponentChildren>) {
  const baseClasses =
    "inline-block px-9 py-2.5 rounded-full text-sm shadow-sm transition-all duration-300 ease-in-out";
  const primaryClasses =
    "bg-white text-[#00150f] hover:bg-amber-400 hover:text-black hover:cursor-pointer";
  const submitClasses =
    "bg-white text-[#00150f] hover:bg-amber-400 hover:text-black hover:cursor-pointer";

  const buttonClasses = `${baseClasses} ${
    type === "primary" ? primaryClasses : submitClasses
  }`;

  return (
    <button className={buttonClasses} onClick={onClick || defaultClick}>
      {children}
    </button>
  );
}
