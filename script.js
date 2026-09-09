/* ==================================================
   SUNABA COFFEE
   script.js

   ・営業状況
   ・現在月のカレンダー
   ・前月 / 次月
   ・スマホ横スワイプ
   ・イベント表示
   ・トップ画像スライドショー
================================================== */


document.addEventListener("DOMContentLoaded", () => {

  updateBusinessStatus();

  renderCalendar();

  setupCalendarButtons();

  setupSwipe();

  setupHeroSlideshow();

});


/* ==================================================
   営業時間
================================================== */

const OPEN_TIME = 10 * 60;

const CLOSE_TIME = 17 * 60;


function updateBusinessStatus() {

  const status =
    document.getElementById("businessStatus");

  if (!status) return;


  const now = new Date();

  const day = now.getDay();

  const date = now.getDate();

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();


  const holiday =
    isHoliday(
      now.getFullYear(),
      now.getMonth(),
      date
    );


  if (holiday) {

    status.textContent =
      "本日の営業は終了しました";

    status.classList.add("closed");

    return;

  }


  if (currentMinutes < OPEN_TIME) {

    status.textContent =
      "10時から営業します";

    status.classList.remove("closed");

    return;

  }


  if (currentMinutes < 16 * 60) {

    status.textContent =
      "営業中　10:00～17:00";

    status.classList.remove("closed");

    return;

  }


  if (currentMinutes < CLOSE_TIME) {

    status.textContent =
      "まもなく終了　17:00まで";

    status.classList.remove("closed");

    return;

  }


  status.textContent =
    "本日の営業は終了しました";

  status.classList.add("closed");

}


/* ==================================================
   イベント
================================================== */

const events = {

  "2026-08-08": "コーヒー教室",

  "2026-08-16": "ミニ音楽会",

  "2026-08-29": "夏の読書会",

  "2026-09-05": "コーヒー教室",

  "2026-09-12": "小さな音楽会",

  "2026-09-26": "秋の読書会",

  "2026-10-10": "秋のコーヒー会",

  "2026-10-17": "ミニ音楽会",

  "2026-10-31": "ハロウィンイベント",

  "2026-11-07": "コーヒー教室",

  "2026-11-14": "読書会",

  "2026-11-28": "小さな音楽会"

};


/* ==================================================
   カレンダー
================================================== */

let calendarDate =
  new Date(2026, 7, 1);


/* ==================================================
   日付キー
================================================== */

function makeDateKey(year, month, day) {

  return (
    year +
    "-" +
    String(month + 1).padStart(2, "0") +
    "-" +
    String(day).padStart(2, "0")
  );

}


/* ==================================================
   定休日
================================================== */

function isHoliday(year, month, day) {

  const date =
    new Date(year, month, day);

  const weekDay =
    date.getDay();


  /* 毎週水曜日 */

  if (weekDay === 3) {
    return true;
  }


  /* 第1・第3月曜日 */

  if (weekDay === 1) {

    const week =
      Math.ceil(day / 7);

    if (week === 1 || week === 3) {
      return true;
    }

  }


  return false;

}


/* ==================================================
   カレンダー表示
================================================== */

function renderCalendar() {

  const calendar =
    document.getElementById("calendar");

  const title =
    document.getElementById("calendarTitle");


  if (!calendar || !title) {
    return;
  }


  const year =
    calendarDate.getFullYear();

  const month =
    calendarDate.getMonth();


  title.textContent =
    `${year}年${month + 1}月`;


  calendar.innerHTML = "";


  const firstDay =
    new Date(year, month, 1).getDay();


  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  /* 月初までの空白 */

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


    if (weekDay === 0) {

      cell.classList.add(
        "sunday"
      );

    }


    if (weekDay === 6) {

      cell.classList.add(
        "saturday"
      );

    }


    /* 日付 */

    const number =
      document.createElement("div");

    number.className =
      "day-number";

    number.textContent =
      day;

    cell.appendChild(number);


    /* 定休日 */

    const holiday =
      isHoliday(
        year,
        month,
        day
      );


    if (holiday) {

      cell.classList.add(
        "holiday"
      );


      const holidayLabel =
        document.createElement("div");

      holidayLabel.className =
        "holiday-label";

      holidayLabel.textContent =
        "定休日";

      cell.appendChild(
        holidayLabel
      );

    }


    /* イベント */

    const dateKey =
      makeDateKey(
        year,
        month,
        day
      );


    if (events[dateKey]) {

      const eventLabel =
        document.createElement("div");

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


/* ==================================================
   カレンダーボタン
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

  const slider =
    document.getElementById(
      "calendarSlider"
    );


  if (!slider) return;


  let startX = 0;

  let startY = 0;


  slider.addEventListener(
    "touchstart",
    (event) => {

      const touch =
        event.changedTouches[0];

      startX =
        touch.screenX;

      startY =
        touch.screenY;

    },
    { passive: true }
  );


  slider.addEventListener(
    "touchend",
    (event) => {

      const touch =
        event.changedTouches[0];


      const endX =
        touch.screenX;

      const endY =
        touch.screenY;


      const diffX =
        startX - endX;

      const diffY =
        startY - endY;


      if (
        Math.abs(diffY) >
        Math.abs(diffX)
      ) {

        return;

      }


      /* 左スワイプ → 次月 */

      if (diffX > 50) {

        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );

        renderCalendar();

      }


      /* 右スワイプ → 前月 */

      if (diffX < -50) {

        calendarDate.setMonth(
          calendarDate.getMonth() - 1
        );

        renderCalendar();

      }

    },
    { passive: true }
  );

}


/* ==================================================
   トップ画像スライドショー
================================================== */


/*
  表示順

  1. gaikan.jpg   → 8秒
  2. coffee2.jpg  → 5秒
  3. gaikan2.jpg  → 5秒
  4. tennai1.jpg  → 5秒
  5. tennai2.jpg  → 5秒
  6. tennai3.jpg  → 5秒

  その後、gaikan.jpgへ戻る
*/


const heroSlides = [

  {
    src: "./image/gaikan.jpg",
    alt: "SUNABA COFFEE 外観",
    duration: 8000
  },

  {
    src: "./image/coffee2.jpg",
    alt: "SUNABA COFFEE コーヒー",
    duration: 5000
  },

  {
    src: "./image/gaikan2.jpg",
    alt: "SUNABA COFFEE 外観",
    duration: 5000
  },

  {
    src: "./image/tennai1.jpg",
    alt: "SUNABA COFFEE 店内",
    duration: 5000
  },

  {
    src: "./image/tennai2.jpg",
    alt: "SUNABA COFFEE 店内",
    duration: 5000
  },

  {
    src: "./image/tennai3.jpg",
    alt: "SUNABA COFFEE 店内",
    duration: 5000
  }

];


/* ==================================================
   スライドショー開始
================================================== */

function setupHeroSlideshow() {

  const heroImage =
    document.getElementById(
      "heroSlide"
    );


  if (!heroImage) {
    return;
  }


  if (heroSlides.length < 2) {
    return;
  }


  /* ------------------------------------------
     画像を先読み
     切り替え時に画像が遅れて表示されるのを防ぐ
  ------------------------------------------ */

  heroSlides.forEach(
    (slide) => {

      const preload =
        new Image();

      preload.src =
        slide.src;

    }
  );


  let currentIndex = 0;


  /* ------------------------------------------
     次の画像へ
  ------------------------------------------ */

  function changeSlide() {

    const nextIndex =
      (currentIndex + 1) %
      heroSlides.length;


    /* フェードアウト */

    heroImage.classList.add(
      "fade-out"
    );


    /*
      CSSのフェード時間
      0.7秒に合わせる
    */

    setTimeout(
      () => {

        heroImage.src =
          heroSlides[nextIndex].src;


        heroImage.alt =
          heroSlides[nextIndex].alt;


        /* フェードイン */

        heroImage.classList.remove(
          "fade-out"
        );


        currentIndex =
          nextIndex;


        /*
          現在の画像を指定秒数表示
        */

        setTimeout(
          changeSlide,
          heroSlides[currentIndex].duration
        );

      },
      700
    );

  }


  /*
    最初のgaikan.jpgを8秒表示
  */

  setTimeout(
    changeSlide,
    heroSlides[0].duration
  );

}


/* ==================================================
   営業状況を1分ごとに更新
================================================== */

setInterval(
  updateBusinessStatus,
  60000
);
