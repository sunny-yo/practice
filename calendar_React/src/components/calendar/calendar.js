import React, { useEffect } from 'react';
import styles from './calendar.module.css';
import CalendarDates from './calendar-dates/calendar-dates';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from 'react-router-dom';

const Calendar = ({
  authService,
  dateYear,
  dateMonth,
  curr,
  prev,
  next,
  goPrevMonth,
  goNextMonth,
  goThisMonth,
  saveData,
}) => {
  const navigate = useNavigate();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate('/');
      }
    });
  });

  return (
    <section className={styles.container}>
      <Header onLogout={onLogout} />
      <section className={styles.header}>
        <button className={styles.prev} onClick={goPrevMonth}>
          prev
        </button>
        <h1 className={styles.month}>{`${dateYear}년 ${dateMonth}월`}</h1>
        <button className={styles.next} onClick={goNextMonth}>
          next
        </button>
        <button className={styles.today} onClick={goThisMonth}>
          today
        </button>
      </section>
      <CalendarDates curr={curr} prev={prev} next={next} saveData={saveData} />
      <Footer />
    </section>
  );
};

export default Calendar;
