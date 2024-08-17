import styles from "./Button.module.css";

type ButtonProps = {
  type: "primary" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
};

const defaultClick = () => {};

export default function Button({ type, children, onClick }: ButtonProps) {
  return (
    <button className={styles[type]} onClick={onClick || defaultClick}>
      {children}
    </button>
  );
}
