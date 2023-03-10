import React, { useEffect } from "react";
import { toggleTheme } from "../features/theme/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import styles from "../styles/modules/theme.module.scss";

const Theme = () => {
  const { darkMode } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.dataset.darkMode = darkMode;
    localStorage.setItem("darkMode", JSON.parse(darkMode));
  }, [darkMode]);

  const handleChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      type="button"
      onClick={() => handleChange()}
      className={styles.theme_btn}
    >
      {darkMode ? (
        <BsSunFill style={{ color: "#FBBB05" }} />
      ) : (
        <BsFillMoonStarsFill style={{ color: "#3b3b3b" }} />
      )}
    </button>
  );
};

export default Theme;
