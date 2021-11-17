import React, { memo } from "react";
import styles from "./habit.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Habit = memo((props) => {
  const handleIncreament = () => {
    props.onIncrement(props.habit);
  };

  const handleDecreament = () => {
    props.onDecrement(props.habit);
  };

  const handleDelete = () => {
    props.onDelete(props.habit);
  };

  const { name, count } = props.habit;
  return (
    <li className={styles.habit}>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.button}>
        <button className={styles.plus} onClick={handleIncreament}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
        <button className={styles.minus} onClick={handleDecreament}>
          <FontAwesomeIcon icon={faMinusSquare} />
        </button>
        <button className={styles.trash} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
});

export default Habit;
