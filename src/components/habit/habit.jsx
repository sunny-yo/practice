import React, { Component } from "react";
import styles from "./habit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

class Habit extends Component {
  handleIncreament = () => {
    this.props.onIncrement(this.props.habit);
  };

  handleDecreament = () => {
    this.props.onDecrement(this.props.habit);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.habit);
  };

  render() {
    return (
      <li className={styles.habit}>
        <div className={styles.info}>
          <span className={styles.name}>{this.props.habit.name}</span>
          <span className={styles.count}>{this.props.habit.count}</span>
        </div>
        <div className={styles.button}>
          <button className={styles.plus} onClick={this.handleIncreament}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
          <button className={styles.minus} onClick={this.handleDecreament}>
            <FontAwesomeIcon icon={faMinusSquare} />
          </button>
          <button className={styles.trash} onClick={this.handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </li>
    );
  }
}

export default Habit;
