import { ComponentChildren, ButtonProps } from "@/app/types";
import styles from "./Button.module.css";

const defaultClick = () => {};

export default function Button({
  type,
  children,
  onClick,
}: Readonly<ButtonProps & ComponentChildren>) {
  return (
    <button className={styles[type]} onClick={onClick || defaultClick}>
      {children}
    </button>
  );
}
