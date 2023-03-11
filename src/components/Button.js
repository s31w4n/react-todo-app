import React from "react";
import styles from "../styles/modules/button.module.scss";

const buttonType = {
  primary: "primary",
  secondary: "secondary",
};

function Button({ children, type, variant, ...rest }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[`button-${buttonType[variant]}`]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  return (
    <select
      id={id}
      className={`${styles.button} ${styles.button_select}`}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
