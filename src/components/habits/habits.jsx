import React, { Component } from "react";
import styles from "./habits.module.css";
import Habit from "../habit/habit";

class Habits extends Component {
  render() {
    return (
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
    );
  }
}

export default Habits;
