import React, { Component } from "react";
import "./app.css";
import Habits from "./components/habits/habits";
import Navbar from "./components/navbar/navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [
        { id: 1, name: "Reading", count: 0 },
        { id: 2, name: "Running", count: 0 },
        { id: 3, name: "Coding", count: 0 },
      ],
    };
  }

  handleIncrement = (item) => {
    const habits = [...this.state.habits];
    habits.map((habit) => habit.name === item.name && habit.count++);
    this.setState({ habits });
  };
  handleDecrement = (item) => {
    const count = item.count - 1 < 0 ? 0 : item.count--;
    const habits = [...this.state.habits];
    habits.map((habit) => habit.name === item.name && count);
    this.setState({ habits });
  };
  handleDelete = (item) => {
    const habits = [...this.state.habits].filter(
      (habit) => habit.name !== item.name
    );
    this.setState({ habits });
  };

  render() {
    return (
      <div className="app">
        <Navbar habits={this.state.habits} />
        <Habits
          habits={this.state.habits}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
