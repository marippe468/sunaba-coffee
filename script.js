/* =========================
   営業状況
========================= */

function updateBusinessStatus() {

  const status =
    document.getElementById("businessStatus");

  if (!status) return;


  const now = new Date();

  const day = now.getDay();

  const date = now.getDate();

  const hour = now.getHours();

  const minute = now.getMinutes();

  const currentMinutes =
    hour * 60 + minute;


  const openingTime =
    10 * 60;

  const closingTime =
    17 * 60;



  /* 水曜日 */

  if (day === 3) {

    status.innerHTML =
      "本日の営業は終了しました";

    return;

  }



  /* 第1・第3月曜日 */

  if (day === 1) {

    const weekOfMonth =
      Math.ceil(date / 7);


    if (
      weekOfMonth === 1 ||
      weekOfMonth === 3
    ) {

      status.innerHTML =
        "本日の営業は終了しました";

      return;

    }

  }



  /* 10時前 */

  if (
    currentMinutes < openingTime
  ) {

    status.innerHTML =
      "10時から営業します";

    return;

  }



  /* 16時以降 */

  if (
    currentMinutes >= 16 * 60 &&
    currentMinutes < closingTime
  ) {

    status.innerHTML =
      "まもなく終了";

    return;

  }



  /* 17時以降 */

  if (
    currentMinutes >= closingTime
  ) {

    status.innerHTML =
      "本日の営業は終了しました";

    return;

  }



  /* 営業中 */

  status.innerHTML =
    "営業中";

}


updateBusinessStatus();


setInterval(
  updateBusinessStatus,
  60000
);



/* =========================
   カレンダー
========================= */


/*
   最初は2026年8月
*/

let calendarDate =
  new Date(2026, 7, 1);



/* =========================
   イベント
========================= */

const events = {

  /* 8月 */

  "2026-08-08":
    "コーヒー教室",

  "2026-08-16":
    "ミニ音楽会",

  "2026-08-29":
    "夏の読書会",


  /* 9月 */

  "2026-09-05":
    "コーヒー教室",

  "2026-09-12":
    "小さな音楽会",

  "2026-09-26":
    "秋の読書会",


  /* 10月 */

  "2026-10-10":
    "秋のコーヒー会",

  "2026-10-17":
    "ミニ音楽会",

  "2026-10-31":
    "ハロウィンイベント",


  /* 11月 */

  "2026-11-07":
    "コーヒー教室",

  "2026-11-14":
    "読書会",

  "2026-11-28":
    "小さな音楽会"

};



/* =========================
   日付キー
========================= */

function formatDate(
  year,
  month,
  day
) {

  return (

    year +
    "-" +
    String(month + 1).padStart(2, "0") +
    "-" +
    String(day).padStart(2, "0")

  );

}



/* =========================
   カレンダー表示
========================= */

function renderCalendar() {


  const calendar =
    document.getElementById("calendar");


  const title =
    document.getElementById("calendarTitle");


  if (
    !calendar ||
    !title
  ) return;


  const year =
    calendarDate.getFullYear();


  const month =
    calendarDate.getMonth();


  title.textContent =
    `${year}年${month + 1}月`;


  calendar.innerHTML = "";


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();


  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();



  /* 月初の空白 */

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day empty";

    calendar.appendChild(empty);

  }



  /* 日付 */

  for (
    let day = 1;
    day <= lastDate;
    day++
  ) {


    const cell =
      document.createElement("div");


    cell.className =
      "calendar-day";


    const date =
      new Date(
        year,
        month,
        day
      );


    const weekDay =
      date.getDay();



    /* 曜日 */

    if (
      weekDay === 0
    ) {

      cell.classList.add(
        "sunday"
      );

    }


    if (
      weekDay === 6
    ) {

      cell.classList.add(
        "saturday"
      );

    }



    /* 1行目：日付 */

    const number =
      document.createElement("div");


    number.className =
      "day-number";


    number.textContent =
      day;


    cell.appendChild(number);



    /* =====================
       定休日
    ===================== */

    let holiday = false;


    /* 水曜日 */

    if (
      weekDay === 3
    ) {

      holiday = true;

    }


    /* 第1・第3月曜日 */

    if (
      weekDay === 1
    ) {

      const week =
        Math.ceil(day / 7);


      if (
        week === 1 ||
        week === 3
      ) {

        holiday = true;

      }

    }



    if (holiday) {


      cell.classList.add(
        "holiday"
      );


      const holidayLabel =
        document.createElement(
          "div"
        );


      holidayLabel.className =
        "holiday-label";


      holidayLabel.textContent =
        "定休日";


      cell.appendChild(
        holidayLabel
      );

    }



    /* =====================
       イベント
    ===================== */

    const dateKey =
      formatDate(
        year,
        month,
        day
      );


    if (
      events[dateKey]
    ) {


      const eventLabel =
        document.createElement(
          "div"
        );


      eventLabel.className =
        "event-label";


      eventLabel.textContent =
        events[dateKey];


      cell.appendChild(
        eventLabel
      );

    }



    calendar.appendChild(cell);

  }

}



/* =========================
   前月ボタン
========================= */

const prevButton =
  document.getElementById(
    "prevMonth"
  );


if (prevButton) {

  prevButton.addEventListener(
    "click",
    function () {

      calendarDate.setMonth(
        calendarDate.getMonth() - 1
      );

      renderCalendar();

    }
  );

}



/* =========================
   次月ボタン
========================= */

const nextButton =
  document.getElementById(
    "nextMonth"
  );


if (nextButton) {

  nextButton.addEventListener(
    "click",
    function () {

      calendarDate.setMonth(
        calendarDate.getMonth() + 1
      );

      renderCalendar();

    }
  );

}



/* =========================
   スマホ横スライド
========================= */

const calendarArea =
  document.querySelector(
    ".calendar-slider"
  );


let touchStartX = 0;


if (calendarArea) {


  calendarArea.addEventListener(
    "touchstart",
    function (event) {

      touchStartX =
        event.changedTouches[0]
          .screenX;

    },
    {
      passive: true
    }
  );



  calendarArea.addEventListener(
    "touchend",
    function (event) {


      const touchEndX =
        event.changedTouches[0]
          .screenX;


      const difference =
        touchStartX -
        touchEndX;



      /* 左スワイプ → 翌月 */

      if (
        difference > 50
      ) {

        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );

        renderCalendar();

      }



      /* 右スワイプ → 前月 */

      if (
        difference < -50
      ) {

        calendarDate.setMonth(
          calendarDate.getMonth() - 1
        );

        renderCalendar();

      }

    },
    {
      passive: true
    }
  );

}



/* =========================
   初期表示
========================= */

renderCalendar();
