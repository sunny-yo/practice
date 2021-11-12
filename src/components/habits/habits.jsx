import React, { Component } from "react";
import styles from "./habits.module.css";
import Habit from "../habit/habit";
import AddForm from "../add-form/add-form";

class Habits extends Component {
  render() {
    return (
      <div className={styles.habits}>
        <AddForm onAdd={this.props.onAdd} />
        <ul>
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
      </div>
    );
  }
}

export default Habits;
