import React, { Component } from "react";
import styles from "./habits.module.css";
import Habit from "../habit/habit";
import AddForm from "../add-form/add-form";

class Habits extends Component {
  render() {
    return (
      <>
        <AddForm onAdd={this.props.onAdd} />
        <ul className={styles.habits}>
          {this.props.habits.map((habit) => (
            <Habit
              key={habit.id}
              habit={habit}
              onIncrement={this.props.onIncrement}
              onDecrement={this.props.onDecrement}
              onDelete={this.props.onDelete}
            />
          ))}
        </ul>
        <button className={styles.resetBtn} onClick={this.props.onReset}>
          Reset All
        </button>
      </>
    );
  }
}

export default Habits;
