import React, { useCallback, useState } from "react";
import "./app.css";
import Habits from "./components/habits/habits";
import Navbar from "./components/navbar/navbar";

const App = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Reading", count: 0 },
    { id: 2, name: "Running", count: 0 },
    { id: 3, name: "Coding", count: 0 },
  ]);

  const handleIncrement = useCallback((item) => {
    setHabits((habits) =>
      habits.map((habit) => {
        if (habit.id === item.id) {
          return { ...habit, count: habit.count + 1 };
        }
        return habit;
      })
    );
  }, []);

  const handleDecrement = useCallback((item) => {
    setHabits((habits) =>
      habits.map((habit) => {
        if (habit.id === item.id) {
          const count = item.count - 1;
          return { ...habit, count: count < 0 ? 0 : count };
        }
        return habit;
      })
    );
  }, []);

  const handleDelete = useCallback((item) => {
    setHabits((habits) => habits.filter((habit) => habit.id !== item.id));
  }, []);

  const handleAdd = useCallback((name) => {
    setHabits((habits) => [
      ...habits,
      { id: Date.now(), name: name, count: 0 },
    ]);
  }, []);

  const handleReset = useCallback(() => {
    setHabits((habits) =>
      habits.map((habit) => {
        if (habit.count !== 0) {
          return { ...habit, count: 0 };
        }
        return habit;
      })
    );
  }, []);

  return (
    <div className="app">
      <Navbar totalCount={habits.filter((item) => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;
