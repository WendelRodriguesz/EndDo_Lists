import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  navigateTo?: string;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button type={type} onClick={handleClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
