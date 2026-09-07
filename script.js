/* ==================================================
   SUNABA COFFEE
   script.js

   ・営業状況
   ・営業カレンダー
   ・前月 / 次月
   ・スマホ横スワイプ
   ・イベント表示
   ・トップ写真スライドショー
================================================== */


/* ==================================================
   初期処理
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateBusinessStatus();

    renderCalendar();

    setupCalendarButtons();

    setupSwipe();

    setupSlideshow();

  }
);


/* ==================================================
   営業時間
================================================== */

const OPEN_TIME = 10 * 60;

const CLOSE_TIME = 17 * 60;


/* ==================================================
   定休日
   毎週月曜日
   第1・第3水曜日
================================================== */

function isClosedDay(date) {

  const day =
    date.getDay();


  /* 月曜日 */

  if (day === 1) {
    return true;
  }


  /* 水曜日 */

  if (day === 3) {

    const dateNumber =
      date.getDate();

    const weekNumber =
      Math.ceil(
        dateNumber / 7
      );


    if (
      weekNumber === 1 ||
      weekNumber === 3
    ) {

      return true;

    }

  }


  return false;

}


/* ==================================================
   営業状況
================================================== */

function updateBusinessStatus() {

  const status =
    document.getElementById(
      "businessStatus"
    );


  if (!status) {
    return;
  }


  status.classList.remove(
    "open",
    "soon",
    "before-open",
    "closed"
  );


  const now =
    new Date();


  /* ------------------------------------------
     定休日
  ------------------------------------------ */

  if (
    isClosedDay(now)
  ) {

    status.textContent =
      "本日は定休日です";

    status.classList.add(
      "closed"
    );

    return;

  }


  /* ------------------------------------------
     現在時刻
  ------------------------------------------ */

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();


  /* ------------------------------------------
     開店前
  ------------------------------------------ */

  if (
    currentMinutes < OPEN_TIME
  ) {

    status.textContent =
      "10:00から営業します";

    status.classList.add(
      "before-open"
    );

    return;

  }


  /* ------------------------------------------
     営業中
  ------------------------------------------ */

  if (
    currentMinutes >= OPEN_TIME &&
    currentMinutes < CLOSE_TIME
  ) {

    const remaining =
      CLOSE_TIME -
      currentMinutes;


    if (
      remaining <= 60
    ) {

      status.textContent =
        "まもなく終了します";

      status.classList.add(
        "soon"
      );

    } else {

      status.textContent =
        "営業中";

      status.classList.add(
        "open"
      );

    }

    return;

  }


  /* ------------------------------------------
     閉店後
  ------------------------------------------ */

  status.textContent =
    "本日の営業は終了しました";

  status.classList.add(
    "closed"
  );

}


/* ==================================================
   CALENDAR
================================================== */

let calendarDate =
  new Date();


/* ==================================================
   イベント

   今は空欄。
   イベントを追加するときは、

   "2026-09-20": "イベント"

   のように記入。
================================================== */

const events = {};


/* ==================================================
   カレンダー表示
================================================== */

function renderCalendar() {

  const calendar =
    document.getElementById(
      "calendar"
    );


  const title =
    document.getElementById(
      "calendarTitle"
    );


  if (
    !calendar ||
    !title
  ) {

    return;

  }


  calendar.innerHTML =
    "";


  const year =
    calendarDate.getFullYear();


  const month =
    calendarDate.getMonth();


  /* ------------------------------------------
     タイトル
  ------------------------------------------ */

  title.textContent =
    `${year}年 ${month + 1}月`;


  /* ------------------------------------------
     月初
  ------------------------------------------ */

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();


  /* ------------------------------------------
     月末
  ------------------------------------------ */

  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  /* ------------------------------------------
     空白
  ------------------------------------------ */

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    const empty =
      document.createElement(
        "div"
      );


    empty.classList.add(
      "calendar-day",
      "empty"
    );


    calendar.appendChild(
      empty
    );

  }


  /* ------------------------------------------
     今日
  ------------------------------------------ */

  const today =
    new Date();


  const todayYear =
    today.getFullYear();


  const todayMonth =
    today.getMonth();


  const todayDate =
    today.getDate();


  /* ------------------------------------------
     日付
  ------------------------------------------ */

  for (
    let dateNumber = 1;
    dateNumber <= lastDate;
    dateNumber++
  ) {

    const current =
      new Date(
        year,
        month,
        dateNumber
      );


    const cell =
      document.createElement(
        "div"
      );


    cell.classList.add(
      "calendar-day"
    );


    const day =
      current.getDay();


    /* ----------------------------------------
       日曜日
    ---------------------------------------- */

    if (
      day === 0
    ) {

      cell.classList.add(
        "sunday"
      );

    }


    /* ----------------------------------------
       土曜日
    ---------------------------------------- */

    if (
      day === 6
    ) {

      cell.classList.add(
        "saturday"
      );

    }


    /* ----------------------------------------
       今日
    ---------------------------------------- */

    if (
      year === todayYear &&
      month === todayMonth &&
      dateNumber === todayDate
    ) {

      cell.classList.add(
        "today"
      );

    }


    /* ----------------------------------------
       日付番号
    ---------------------------------------- */

    const number =
      document.createElement(
        "span"
      );


    number.classList.add(
      "day-number"
    );


    number.textContent =
      dateNumber;


    cell.appendChild(
      number
    );


    /* ----------------------------------------
       定休日
    ---------------------------------------- */

    if (
      isClosedDay(current)
    ) {

      cell.classList.add(
        "holiday"
      );


      const holidayLabel =
        document.createElement(
          "span"
        );


      holidayLabel.classList.add(
        "holiday-label"
      );


      holidayLabel.textContent =
        "休";


      cell.appendChild(
        holidayLabel
      );

    }


    /* ----------------------------------------
       イベント
    ---------------------------------------- */

    const key =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(dateNumber).padStart(2, "0")}`;


    if (
      events[key]
    ) {

      const eventLabel =
        document.createElement(
          "span"
        );


      eventLabel.classList.add(
        "event-label"
      );


      eventLabel.textContent =
        events[key];


      cell.appendChild(
        eventLabel
      );

    }


    calendar.appendChild(
      cell
    );

  }

}


/* ==================================================
   カレンダー ボタン
================================================== */

function setupCalendarButtons() {

  const prev =
    document.getElementById(
      "prevMonth"
    );


  const next =
    document.getElementById(
      "nextMonth"
    );


  /* ------------------------------------------
     前月
  ------------------------------------------ */

  if (prev) {

    prev.addEventListener(
      "click",
      () => {

        calendarDate.setMonth(
          calendarDate.getMonth() - 1
        );


        renderCalendar();

      }
    );

  }


  /* ------------------------------------------
     次月
  ------------------------------------------ */

  if (next) {

    next.addEventListener(
      "click",
      () => {

        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );


        renderCalendar();

      }
    );

  }

}


/* ==================================================
   スマホ横スワイプ
================================================== */

function setupSwipe() {

  const calendar =
    document.querySelector(
      ".calendar-container"
    );


  if (!calendar) {
    return;
  }


  let startX = 0;


  let endX = 0;


  /* ------------------------------------------
     タッチ開始
  ------------------------------------------ */

  calendar.addEventListener(
    "touchstart",
    (event) => {

      startX =
        event.touches[0].clientX;

    },
    {
      passive: true
    }
  );


  /* ------------------------------------------
     タッチ終了
  ------------------------------------------ */

  calendar.addEventListener(
    "touchend",
    (event) => {

      endX =
        event.changedTouches[0].clientX;


      const distance =
        endX - startX;


      if (
        Math.abs(distance) < 50
      ) {

        return;

      }


      /* 左 → 次月 */

      if (
        distance < 0
      ) {

        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );

      }


      /* 右 → 前月 */

      else {

        calendarDate.setMonth(
          calendarDate.getMonth() - 1
        );

      }


      renderCalendar();

    },
    {
      passive: true
    }
  );

}


/* ==================================================
   HERO スライドショー
================================================== */

function setupSlideshow() {

  const slides =
    document.querySelectorAll(
      ".hero-slideshow .slide"
    );


  if (
    !slides.length
  ) {

    return;

  }


  /* ------------------------------------------
     表示時間

     1枚目
     gaikan.jpg → 8秒

     2枚目以降
     → 各5秒
  ------------------------------------------ */

  const durations = [

    8000,

    5000,

    5000,

    5000,

    5000,

    5000

  ];


  let currentIndex =
    0;


  /* ------------------------------------------
     最初の画像
  ------------------------------------------ */

  slides.forEach(
    (slide, index) => {

      slide.classList.toggle(
        "active",
        index === 0
      );

    }
  );


  /* ------------------------------------------
     次の画像
  ------------------------------------------ */

  function showNextSlide() {

    slides[
      currentIndex
    ].classList.remove(
      "active"
    );


    currentIndex =
      (currentIndex + 1) %
      slides.length;


    slides[
      currentIndex
    ].classList.add(
      "active"
    );


    setTimeout(
      showNextSlide,
      durations[currentIndex]
    );

  }


  /* ------------------------------------------
     最初のgaikanを8秒
  ------------------------------------------ */

  setTimeout(
    showNextSlide,
    durations[0]
  );

}


/* ==================================================
   営業状況を1分ごとに更新
================================================== */

setInterval(
  updateBusinessStatus,
  60000
);
