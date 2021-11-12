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
    const habits = [...this.state.habits].map((habit) => {
      if (habit.name === item.name) {
        return { ...habit, count: habit.count + 1 };
      }
      return habit;
    });
    this.setState({ habits });
  };
  handleDecrement = (item) => {
    const habits = [...this.state.habits].map((habit) => {
      if (habit.name === item.name) {
        const count = habit.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return habit;
    });
    this.setState({ habits });
  };
  handleDelete = (item) => {
    const habits = [...this.state.habits].filter(
      (habit) => habit.name !== item.name
    );
    this.setState({ habits });
  };
  handleAdd = (name) => {
    const habits = [
      ...this.state.habits,
      { id: Date.now(), name: name, count: 0 },
    ];
    this.setState({ habits });
  };
  handleReset = () => {
    const habits = [...this.state.habits].map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });
    this.setState({ habits });
  };

  render() {
    return (
      <div className="app">
        <Navbar
          totalCount={this.state.habits.filter((item) => item.count > 0).length}
        />
        <Habits
          habits={this.state.habits}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handleReset}
        />
      </div>
    );
  }
}

export default App;
