import React, { useState } from 'react';
import styles from './app.module.css';
import TodoList from './components/todo-list/todoList';

function App() {
  const [lists, setLists] = useState({});

  const totalCount = Object.keys(lists).length;

  const addOrModifyList = (list) => {
    setLists((lists) => {
      const updated = { ...lists };
      updated[list.id] = list;
      return updated;
    });
  };

  const deleteList = (list) => {
    setLists((lists) => {
      const updated = { ...lists };
      delete updated[list.id];
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <TodoList
        lists={lists}
        totalCount={totalCount}
        addList={addOrModifyList}
        modifyList={addOrModifyList}
        deleteList={deleteList}
      />
    </div>
  );
}

export default App;
