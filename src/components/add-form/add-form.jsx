import React, { PureComponent } from "react";
import styles from "./add-form.module.css";

class AddForm extends PureComponent {
  inputRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const name = this.inputRef.current.value;
    name && this.props.onAdd(name);
    this.inputRef.current.value = "";
  };

  render() {
    return (
      <>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <input
            className={styles.input}
            ref={this.inputRef}
            type="text"
            placeholder="Habit"
          />
          <button className={styles.button} type="submit">
            Add
          </button>
        </form>
      </>
    );
  }
}

export default AddForm;
