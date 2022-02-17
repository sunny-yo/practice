import React, { useRef } from 'react';
import styles from './todoList.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import List from '../list/list';

const TodoList = ({ lists, totalCount, addList, modifyList, deleteList }) => {
  const inputRef = useRef();
  const handleAdd = (e) => {
    e.preventDefault();
    const list = { id: Date.now(), name: inputRef.current.value };
    addList(list);
    inputRef.current.value = '';
  };

  return (
    <section className={styles.appContainer}>
      <Header totalCount={totalCount} />
      <section className={styles.container}>
        <form className={styles.form} onSubmit={handleAdd}>
          <input
            ref={inputRef}
            className={styles.input}
            name='name'
            type='text'
            placeholder='What you have to do?'
          />
          <button className={styles.button}>Add</button>
        </form>
        <ul className={styles.list}>
          {Object.keys(lists).map((key) => (
            <List
              key={key}
              list={lists[key]}
              modifyList={modifyList}
              deleteList={deleteList}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </section>
  );
};
export default TodoList;
