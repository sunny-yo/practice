import React from 'react';
import styles from './calendar-date.module.css';

const CalendarDate = ({ dateNum, type, id, period, memo, openPopup }) => {
  const showMemoState = memo !== '' ? true : false;

  const handlePopup = () => {
    if (type === 'curr') {
      openPopup(dateNum);
    } else return;
  };

  return (
    <div
      className={`${styles.date} ${showPeriod(period)}`}
      onClick={handlePopup}
    >
      <span className={`${getClassName(type)}`}>{dateNum}</span>
      {type === 'curr' && showMemoState && (
        <div className={styles.icon}>Icon</div>
      )}
    </div>
  );
};

const showPeriod = (period) => {
  if (period) {
    return styles.onStart;
  } else return;
};

const getClassName = (type) => {
  switch (type) {
    case 'prev':
      return styles.prev;
    case 'curr':
      return styles.curr;
    case 'next':
      return styles.next;
    default:
      throw new Error(`unknow type : ${type}`);
  }
};

export default CalendarDate;
