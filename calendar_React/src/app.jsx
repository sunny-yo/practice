import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import Calendar from './components/calendar/calendar';
import Login from './components/login/login';

function App({ authService, dataRepository }) {
  const location = useLocation();
  const today = new Date();
  const initialDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [date, setDate] = useState(initialDate);
  const [data, setData] = useState({});
  const [userId, setUserId] = useState(location.state.id);

  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;

  const getLastDate = () => {
    if (date.getMonth() < 11) {
      const _date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return _date.getDate();
    } else {
      const _date = new Date(date.getFullYear() + 1, 0, 0);
      return _date.getDate();
    }
  };

  const getPrevLastDate = () => {
    const _date = new Date(date.getFullYear(), date.getMonth(), 0);
    return _date.getDate();
  };

  const getFirstDay = () => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const updateData = (oneData) => {
    let updated = { ...data };
    updated[oneData.id] = oneData;
    setData(updated);
    dataRepository.saveData(userId, oneData);
  };

  const getDateData = (dateNum) => {
    let dateId = `${date.getFullYear()}.${date.getMonth() + 1}.${dateNum}`;
    if (data[dateId]) {
      return data[dateId];
    } else {
      return {
        id: dateId,
        date: dateNum,
        period: false,
        memo: '',
      };
    }
  };

  const currDateDataArray = () => {
    const dateDataArray = [];
    for (let i = 1; i <= getLastDate(); i++) {
      let dateData = getDateData(i);
      dateDataArray.push(dateData);
    }
    return dateDataArray;
  };

  const prevDateArray = () => {
    const prevArray = [];
    for (let i = getFirstDay(); i > 0; i--) {
      const _date = getPrevLastDate() - i + 1;
      prevArray.push(_date);
    }
    return prevArray;
  };

  const nextDateArray = () => {
    const nextArray = [];
    let num = 42 - currDateDataArray().length - prevDateArray().length;
    for (let i = 1; i <= num; i++) {
      nextArray.push(i);
    }
    return nextArray;
  };

  const showPrev = () => {
    const month = date.getMonth();
    if (month > 0) {
      const setPrev = new Date(date.getFullYear(), date.getMonth() - 1);
      setDate(setPrev);
    } else {
      const setPrev = new Date(date.getFullYear() - 1, 11);
      setDate(setPrev);
    }
  };

  const showNext = () => {
    const month = date.getMonth();
    if (month < 11) {
      const setNext = new Date(date.getFullYear(), date.getMonth() + 1);
      setDate(setNext);
    } else {
      const setNext = new Date(date.getFullYear() + 1, 0);
      setDate(setNext);
    }
  };

  const showThis = () => {
    setDate(initialDate);
  };

  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path="/" element={<Login authService={authService} />} />
        <Route
          path="calendar"
          element={
            <Calendar
              authService={authService}
              dateYear={dateYear}
              dateMonth={dateMonth}
              curr={currDateDataArray}
              prev={prevDateArray}
              next={nextDateArray}
              goPrevMonth={showPrev}
              goNextMonth={showNext}
              goThisMonth={showThis}
              saveData={updateData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
