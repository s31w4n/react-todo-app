import React from "react";
import Theme from "./Theme";
import style from "../styles/modules/title.module.scss";

function PageTitle({ children, ...rest }) {
  return (
    <header>
      <h1 className={style.title} {...rest}>
        {children}
      </h1>
      <Theme />
    </header>
  );
}

export default PageTitle;
