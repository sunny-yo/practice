import React, { useRef, useState } from 'react';
import styles from './list.module.css';

const List = ({ list, modifyList, deleteList }) => {
  const [modify, setModify] = useState(false);
  const nameRef = useRef();
  const modifyRef = useRef();
  const name = list.name;

  const onModify = (e) => {
    if (e.code === 'Enter') {
      const title = modifyRef.current.value;
      const updatedList = { ...list, name: title };
      modifyList(updatedList);
      setModify(false);
    }
  };

  const handleModify = () => {
    if (modify) {
      const title = modifyRef.current.value;
      const updatedList = { ...list, name: title };
      modifyList(updatedList);
      setModify(false);
    } else if (!modify) {
      const title = nameRef.current.textContent;
      modifyRef.current.value = title;
      setModify(true);
    }
  };

  const handleDelete = () => {
    deleteList(list);
  };

  return (
    <li className={styles.item}>
      <input className={styles.checkbox} type='checkbox' />
      <p
        ref={nameRef}
        className={modify ? `${styles.name} ${styles.hide}` : styles.name}
      >
        {name}
      </p>
      <input
        ref={modifyRef}
        type='text'
        className={
          modify ? styles.modifyInput : `${styles.modifyInput} ${styles.hide}`
        }
        onKeyPress={onModify}
      />
      <button className={styles.modifyBtn} onClick={handleModify}>
        modify
      </button>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        delete
      </button>
    </li>
  );
};

export default List;
