"use strict";

export default class Period {
  constructor() {
    this.periodContainer = document.querySelector(".period-container");
    this.periods = document.querySelector(".period tbody");
    this.periodOn = document.querySelector(".period-on");
    this.periodOnI = document.querySelector(".period-on i");
    this.periodOn.addEventListener("click", () => {
      this.periodContainer.style.display = "block";
      this.periodOnI.style.transform = "rotateX(180deg)";
      this.onOpenClick && this.onOpenClick();
    });
  }

  setOnClickListener = (onOpenClick) => {
    this.onOpenClick = onOpenClick;
  };

  showList = (datas) => {
    this.periods.innerHTML = "";
    const periodData = this.calcPeriod(datas);
    periodData.reverse().map((data) => {
      const period = document.createElement("tr");
      period.innerHTML = `<td>${data.id}</td>
      <td>${data.time}</td>`;
      this.periods.appendChild(period);
    });
  };

  calcPeriod = (datas) => {
    const dateArray = Object.keys(datas)
      .sort()
      .map((key) => {
        if (datas[key].period) {
          return { id: key, time: datas[key].date.getTime() };
        }
      });
    for (let i = dateArray.length - 1; i >= 0; i--) {
      let elapseDate =
        (dateArray[i].time - (dateArray[i - 1] ? dateArray[i - 1].time : NaN)) /
        1000 /
        60 /
        60 /
        24;
      dateArray[i].time = isNaN(elapseDate) ? "-" : elapseDate;
    }
    return dateArray;
  };
}
