import React, { memo, useRef } from "react";
import styles from "./add-form.module.css";

const AddForm = memo((props) => {
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    name && props.onAdd(name);
    inputRef.current.value = "";
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          ref={inputRef}
          type="text"
          placeholder="Habit"
        />
        <button className={styles.button} type="submit">
          Add
        </button>
      </form>
    </>
  );
});

export default AddForm;
