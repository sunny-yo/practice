import React, { useState, useRef } from 'react';
import styles from './calendar-popup.module.css';

const CalendarPopup = ({ dateData, editDateData, popupClose }) => {
  const [hide, setHide] = useState(true);
  const inputRef = useRef();
  const memoRef = useRef();

  const editMemo = () => {
    if (!hide) {
      let updated = { ...dateData };
      updated.memo = inputRef.current.value;
      editDateData(updated);
      memoRef.current.textContent = inputRef.current.value;
    } else {
      inputRef.current.value = memoRef.current.textContent;
    }
    toggleHide();
  };

  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      editMemo();
    } else return;
  };

  const toggleStart = () => {
    if (dateData.start) {
      let updated = { ...dateData };
      updated.start = false;
      editDateData(updated);
    } else {
      let updated = { ...dateData };
      updated.start = true;
      editDateData(updated);
    }
  };

  const toggleHide = () => {
    if (hide) {
      setHide(false);
      inputRef.current.focus();
    } else {
      setHide(true);
    }
  };

  const closePopup = () => {
    if (!hide) {
      toggleHide();
    }
    popupClose(dateData);
  };

  return (
    <>
      <h3 className={styles.date}>{dateData.id}</h3>
      <button
        className={`${styles.start} ${getStartClass(dateData.start)}`}
        onClick={toggleStart}
      >
        start
      </button>
      <dl className={styles.memo}>
        <dt>memo</dt>
        <dd ref={memoRef} className={`${styles.text} ${getHideClass(!hide)}`}>
          {dateData.memo}
        </dd>
        <textarea
          ref={inputRef}
          className={`${styles.input} ${getHideClass(hide)}`}
          name="memo"
          rows="10"
          onKeyPress={handleEnter}
        ></textarea>
        <button className={styles.edit} onClick={editMemo}>
          edit
        </button>
      </dl>
      <button className={styles.close} onClick={closePopup}>
        close
      </button>
    </>
  );
};

const getHideClass = (hide) => {
  if (hide) {
    return styles.hide;
  } else return;
};

const getStartClass = (start) => {
  if (start) {
    return styles.active;
  } else return;
};

export default CalendarPopup;
