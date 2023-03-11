import React from "react";
import Theme from "./Theme";
import style from "../styles/modules/title.module.scss";

function PageTitle() {
  return (
    <header>
      <h1 className={style.title}>todo list</h1>
      <Theme />
    </header>
  );
}

export default PageTitle;
