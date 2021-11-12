import React, { PureComponent } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Navbar extends PureComponent {
  render() {
    return (
      <nav className={styles.container}>
        <FontAwesomeIcon icon={faCheck} className={styles.icon} />
        <span className={styles.title}>Habit Tracker</span>
        <span className={styles.count}>{this.props.totalCount}</span>
      </nav>
    );
  }
}

export default Navbar;
