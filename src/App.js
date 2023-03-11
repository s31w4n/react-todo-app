import React from "react";
import { Toaster } from "react-hot-toast";
import Title from "./components/Title";
import Header from "./components/Header";
import Content from "./components/Content";
import styles from "./styles/modules/app.module.scss";

function App() {
  return (
    <>
      <div className="container">
        <div className={styles.app_wrapper}>
          <Title />
          <Header />
          <Content />
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1.4rem" } }}
      />
    </>
  );
}

export default App;
