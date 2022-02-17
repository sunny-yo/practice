import React from 'react';
import { useState } from 'react/cjs/react.development';
import CalendarDate from './calendar-date/calendar-date';
import DatePopup from './calendar-date/date-popup/date-popup';
import styles from './calendar-dates.module.css';

const CalendarDates = ({ curr, prev, next, saveData }) => {
  const [popupHide, setPopupHide] = useState(true);
  const [popupData, setPopupData] = useState({});
  const currDateDatas = curr();
  const prevDates = prev();
  const nextDates = next();

  const openPopup = (num) => {
    if (!popupHide) {
      return;
    }
    setPopupData(currDateDatas[num - 1]);
    setPopupHide(false);
  };

  const closePopup = (data) => {
    saveData(data);
    setPopupHide(true);
  };

  const updatePopupData = (data) => {
    setPopupData(data);
    saveData(data);
  };

  return (
    <section className={styles.datesContainer}>
      <div className={styles.days}>
        <span className={styles.day}>일</span>
        <span className={styles.day}>월</span>
        <span className={styles.day}>화</span>
        <span className={styles.day}>수</span>
        <span className={styles.day}>목</span>
        <span className={styles.day}>금</span>
        <span className={styles.day}>토</span>
      </div>
      <div className={styles.dates}>
        {prevDates.map((dateNum) => (
          <CalendarDate key={dateNum} dateNum={dateNum} type="prev" />
        ))}
        {currDateDatas.map((data) => (
          <CalendarDate
            key={data.id}
            id={data.id}
            dateNum={data.date}
            period={data.period}
            memo={data.memo}
            type="curr"
            openPopup={openPopup}
          />
        ))}
        {nextDates.map((dateNum) => (
          <CalendarDate key={dateNum} dateNum={dateNum} type="next" />
        ))}
      </div>
      {!popupHide && (
        <section className={styles.popup}>
          <DatePopup
            data={popupData}
            updatePopupData={updatePopupData}
            closePopup={closePopup}
          />
        </section>
      )}
    </section>
  );
};

export default CalendarDates;
