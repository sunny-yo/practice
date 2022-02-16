"use strict";

import AddData from "./add-data.js";
import Calendar from "./calendar.js";
import Period from "./period.js";

const today = new Date();
const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const showCalendar = new Calendar();
const addDescription = new AddData();
const showPeriod = new Period();

const dates = document.querySelector(".dates");
const popUp = document.querySelector(".pop-up");
const popUpDate = document.querySelector(".pop-up h3");
const popUpPeriod = document.querySelector(".period-toggle");
const popUpMemo = document.querySelector(".memo dd");
const popUpEdit = document.querySelector(".edit-button");
const popUpInput = document.querySelector(".memo-input");
const popUpCloseBtn = document.querySelector(".popup-close");

let calendarData = {};

showPeriod.setOnClickListener(() => {});

dates.addEventListener("click", (e) => {
  if (popUp.className === "pop-up hide" && e.target.className === "date curr") {
    date.setDate(e.target.textContent);
    const dataObj = getDateData(date);
    showPopup(dataObj);
  }
  return;
});

popUp.addEventListener("click", (e) => {
  if (e.target.parentNode.className === "period-toggle") {
    let dataObj = getDateData(date);
    dataObj.period
      ? (dataObj = { ...dataObj, period: false })
      : (dataObj = { ...dataObj, period: true });
    showPopupPeriod(dataObj);
    setCalendarData(dataObj);
    showPeriod.showList(calendarData);
  } else if (e.target.parentNode.className === "popup-close") {
    closeEdit();
    const dataObj = getDateData(date);
    !dataObj.period && dataObj.memo === "" && deleteData(dataObj);
    closePopup();
    console.log(calendarData);
  } else if (e.target.parentNode.className === "edit-button") {
    popUpInput.className === "memo-input hide" ? openEdit() : closeEdit();
  }
  return;
});

popUpInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") {
    let dataObj = getDateData(date);
    dataObj.memo = e.target.value;
    setCalendarData(dataObj);
  } else {
    closeEdit();
  }
});

function openEdit() {
  const dataObj = getDateData(date);
  popUpInput.value = dataObj.memo;
  popUpMemo.classList.add("hide");
  popUpInput.classList.remove("hide");
  popUpInput.focus();
}

function closeEdit() {
  const dataObj = getDateData(date);
  popUpMemo.textContent = dataObj.memo;
  popUpInput.classList.add("hide");
  popUpMemo.classList.remove("hide");
}

function deleteData(data) {
  const updated = { ...calendarData };
  delete updated[data.id];
  calendarData = updated;
  return calendarData;
}

function setCalendarData(data) {
  const updated = { ...calendarData };
  updated[data.id] = data;
  calendarData = updated;
  return calendarData;
}

function getDateData(date) {
  const dateNum = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const monthNum =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dateId = `${date.getFullYear()}.${monthNum}.${dateNum}`;
  if (calendarData[dateId]) {
    return calendarData[dateId];
  } else {
    return makeDataForm(date);
  }
}

function makeDataForm(date) {
  const dateNum = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const monthNum =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return {
    id: `${date.getFullYear()}.${monthNum}.${dateNum}`,
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    period: false,
    memo: "",
  };
}

function showPopup(data) {
  popUpDate.textContent = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
  showPopupPeriod(data);
  popUpMemo.textContent = data.memo;
  popUp.classList.remove("hide");
}

function showPopupPeriod(data) {
  const dateList = document.querySelectorAll(".date.curr");
  if (data.period) {
    popUpPeriod.setAttribute("data-checked", "true");
    dateList[date.getDate() - 1].setAttribute("data-checked", "true");
  } else {
    popUpPeriod.removeAttribute("data-checked", "true");
    dateList[date.getDate() - 1].removeAttribute("data-checked", "true");
  }
}

function closePopup() {
  popUp.classList.add("hide");
}

const showDateData = () => {
  const dateList = document.querySelectorAll(".date.curr");
  for (let i = 0; i < dateList.length; i++) {
    const dateId = `${date.getFullYear()}.${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${
      dateList[i].textContent < 10
        ? `0${dateList[i].textContent}`
        : dateList[i].textContent
    }`;
    const dateData = calendarData[dateId];
    dateData &&
      dateData.period &&
      dateList[i].setAttribute("data-checked", "true");
  }
};

showCalendar.showToday();
showCalendar.showMonth(date);
showCalendar.showDates(date);
showPeriod.showList(calendarData);

showCalendar.setPrevClickListener(() => {
  date.getMonth === 0
    ? date.setFullYear(date.getFullYear() - 1).setMonth(11)
    : date.setMonth(date.getMonth() - 1);
  showCalendar.showMonth(date);
  showCalendar.showDates(date);
  showDateData();
});

showCalendar.setNextClickListener(() => {
  date.getMonth === 11
    ? date.setFullYear(date.getFullYear() + 1).setMonth(0)
    : date.setMonth(date.getMonth() + 1);
  showCalendar.showMonth(date);
  showCalendar.showDates(date);
  showDateData();
});
