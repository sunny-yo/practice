import React, { useRef, useState } from 'react';
import styles from './date-popup.module.css';

const DatePopup = ({ data, updatePopupData, closePopup }) => {
  const { id, period, memo } = data;
  const [inputHide, setInputHide] = useState(true);
  const inputRef = useRef();

  const handlePopup = () => {
    !inputHide && toggleInput();
    closePopup(data);
  };

  const togglePeriod = () => {
    if (period) {
      let updated = { ...data };
      updated.period = false;
      updatePopupData(updated);
    } else {
      let updated = { ...data };
      updated.period = true;
      updatePopupData(updated);
    }
  };

  const toggleInput = () => {
    if (inputHide) {
      inputRef.current.value = data.memo;
      setInputHide(false);
    } else {
      let updated = { ...data };
      updated.memo = inputRef.current.value;
      updatePopupData(updated);
      setInputHide(true);
    }
  };

  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      toggleInput();
    } else return;
  };

  return (
    <>
      <h1 className={styles.date}>{id}</h1>
      <button
        className={`${styles.start} ${startClass(period)}`}
        onClick={togglePeriod}
      >
        start
      </button>
      <dl className={styles.memo}>
        <dt>memo</dt>
        <dd className={`${styles.memoText} ${inputClass(!inputHide)}`}>
          {memo}
        </dd>
        <textarea
          ref={inputRef}
          name="memo"
          rows="10"
          className={`${styles.memoInput} ${inputClass(inputHide)}`}
          onKeyPress={handleEnter}
        ></textarea>
        <button className={styles.edit} onClick={toggleInput}>
          edit
        </button>
      </dl>
      <button className={styles.close} onClick={handlePopup}>
        close
      </button>
    </>
  );
};

const inputClass = (inputHide) => {
  if (inputHide) {
    return styles.hide;
  } else return;
};

const startClass = (period) => {
  if (period) {
    return styles.checked;
  } else return;
};

export default DatePopup;
