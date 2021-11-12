import React, { Component } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  render() {
    const count = this.props.habits.filter((habit) => habit.count > 1);
    return (
      <div className={styles.container}>
        <FontAwesomeIcon icon={faCheck} className={styles.icon} />
        <span className={styles.title}>Habit Tracker</span>
        <span className={styles.count}>{count.length}</span>
      </div>
    );
  }
}

export default Navbar;
