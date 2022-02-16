export default class Calendar {
  constructor() {
    this.viewToday = document.querySelector(".today");
    this.viewMonth = document.querySelector(".month");
    this.viewInfo = document.querySelector(".info");
    this.viewDates = document.querySelector(".dates");
    this.prevBtn = document.querySelector(".prev-button");
    this.nextBtn = document.querySelector(".next-button");
    this.today = new Date();
    this.dayArray = ["일", "월", "화", "수", "목", "금", "토"];
    this.prevBtn.addEventListener("click", () => {
      this.viewDates.innerHTML = "";
      this.handlePrev && this.handlePrev();
    });
    this.nextBtn.addEventListener("click", () => {
      this.viewDates.innerHTML = "";
      this.handleNext && this.handleNext();
    });
  }

  setPrevClickListener = (handlePrev) => {
    this.handlePrev = handlePrev;
  };

  setNextClickListener = (handleNext) => {
    this.handleNext = handleNext;
  };

  showToday = () => {
    this.viewToday.textContent = `Today: ${
      this.today.getMonth() + 1
    }월 ${this.today.getDate()}일 ${this.getDayName(
      this.today
    )}, ${this.today.getFullYear()}`;
  };

  showMonth = (date) => {
    this.viewMonth.textContent = `${
      date.getMonth() + 1
    }월, ${date.getFullYear()}`;
  };

  showDates = (date) => {
    const prevMonth = [];
    const currMonth = [];
    const nextMonth = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const prevLastDate = new Date(year, month, 0).getDate();
    const currLastDate =
      month === 11 //
        ? new Date(year + 1, 0, 0).getDate()
        : new Date(year, month + 1, 0).getDate();
    const currFirstDay = new Date(year, month, 1).getDay();

    // prev
    for (let i = prevLastDate - currFirstDay + 1; i <= prevLastDate; i++) {
      prevMonth.push(i);
      const viewDate = document.createElement("div");
      viewDate.setAttribute("class", "date prev");
      viewDate.textContent = i;
      this.viewDates.appendChild(viewDate);
    }
    // curr
    for (let i = 1; i <= currLastDate; i++) {
      currMonth.push(i);
      const viewDate = document.createElement("div");
      viewDate.setAttribute("class", "date curr");
      viewDate.textContent = i;
      this.viewDates.appendChild(viewDate);
    }
    // next
    for (let i = 1; i <= 42 - prevMonth.length - currMonth.length; i++) {
      nextMonth.push(i);
      const viewDate = document.createElement("div");
      viewDate.setAttribute("class", "date next");
      viewDate.textContent = i;
      this.viewDates.appendChild(viewDate);
    }
  };

  getDayName = (date) => {
    return this.dayArray[date.getDay()];
  };
}
