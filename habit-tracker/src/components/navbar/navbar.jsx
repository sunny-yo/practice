import React, { memo } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Navbar = memo((props) => {
  return (
    <nav className={styles.container}>
      <FontAwesomeIcon icon={faCheck} className={styles.icon} />
      <span className={styles.title}>Habit Tracker</span>
      <span className={styles.count}>{props.totalCount}</span>
    </nav>
  );
});

export default Navbar;
