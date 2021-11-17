import React from "react";
import styles from "./habits.module.css";
import Habit from "../habit/habit";
import AddForm from "../add-form/add-form";

const Habits = (props) => {
  return (
    <div className={styles.habits}>
      <AddForm onAdd={props.onAdd} />
      <ul>
        {props.habits.map((habit) => (
          <Habit
            key={habit.id}
            habit={habit}
            onIncrement={props.onIncrement}
            onDecrement={props.onDecrement}
            onDelete={props.onDelete}
          />
        ))}
      </ul>
      <button className={styles.resetBtn} onClick={props.onReset}>
        Reset All
      </button>
    </div>
  );
};

export default Habits;
