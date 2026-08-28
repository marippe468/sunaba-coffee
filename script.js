```javascript
/* ==================================================
   SUNABA COFFEE
   script.js
================================================== */


/* ==================================================
   ページが読み込まれてから実行
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateBusinessStatus();

    renderCalendar();

    setupCalendarButtons();

    setupSwipe();

  }
);



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



  const now =
    new Date();


  const day =
    now.getDay();


  const date =
    now.getDate();


  const hour =
    now.getHours();


  const minute =
    now.getMinutes();


  const currentMinutes =
    hour * 60 + minute;



  const openingTime =
    10 * 60;


  const closingTime =
    17 * 60;



  /* ------------------------------------------
     定休日判定
  ------------------------------------------ */

  let holiday =
    false;



  /* 水曜日 */

  if (
    day === 3
  ) {

    holiday =
      true;

  }



  /* 第1・第3月曜日 */

  if (
    day === 1
  ) {


    const week =
      Math.ceil(
        date / 7
      );


    if (
      week === 1 ||
      week === 3
    ) {

      holiday =
        true;

    }

  }



  /* ------------------------------------------
     表示
  ------------------------------------------ */


  if (holiday) {


    status.textContent =
      "本日の営業は終了しました";


    status.classList.add(
      "closed"
    );


    return;

  }



  /* 10時より前 */

  if (
    currentMinutes <
    openingTime
  ) {


    status.textContent =
      "10時から営業します";


    status.classList.remove(
      "closed"
    );


    return;

  }



  /* 10時～16時 */

  if (
    currentMinutes >=
    openingTime
    &&
    currentMinutes <
    16 * 60
  ) {


    status.textContent =
      "営業中　10:00～17:00";


    status.classList.remove(
      "closed"
    );


    return;

  }



  /* 16時～17時 */

  if (
    currentMinutes >=
    16 * 60
    &&
    currentMinutes <
    closingTime
  ) {


    status.textContent =
      "まもなく終了　17:00まで";


    status.classList.remove(
      "closed"
    );


    return;

  }



  /* 17時以降 */

  status.textContent =
    "本日の営業は終了しました";


  status.classList.add(
    "closed"
  );

}



/* ==================================================
   イベント
   各月3件のサンプル
================================================== */

const events = {


  /* ------------------------------------------
     2026年8月
  ------------------------------------------ */

  "2026-08-08":
    "コーヒー教室",


  "2026-08-16":
    "ミニ音楽会",


  "2026-08-29":
    "夏の読書会",



  /* ------------------------------------------
     2026年9月
  ------------------------------------------ */

  "2026-09-05":
    "コーヒー教室",


  "2026-09-12":
    "小さな音楽会",


  "2026-09-26":
    "秋の読書会",



  /* ------------------------------------------
     2026年10月
  ------------------------------------------ */

  "2026-10-10":
    "秋のコーヒー会",


  "2026-10-17":
    "ミニ音楽会",


  "2026-10-31":
    "ハロウィンイベント",



  /* ------------------------------------------
     2026年11月
  ------------------------------------------ */

  "2026-11-07":
    "コーヒー教室",


  "2026-11-14":
    "読書会",


  "2026-11-28":
    "小さな音楽会"

};



/* ==================================================
   カレンダー表示開始
   2026年8月
================================================== */

let calendarDate =
  new Date(
    2026,
    7,
    1
  );



/* ==================================================
   日付キー
================================================== */

function makeDateKey(
  year,
  month,
  day
) {


  return (
    String(year) +
    "-" +
    String(month + 1)
      .padStart(2, "0") +
    "-" +
    String(day)
      .padStart(2, "0")
  );

}



/* ==================================================
   定休日判定
================================================== */

function isHoliday(
  year,
  month,
  day
) {


  const date =
    new Date(
      year,
      month,
      day
    );


  const weekDay =
    date.getDay();



  /* 水曜日 */

  if (
    weekDay === 3
  ) {

    return true;

  }



  /* 第1・第3月曜日 */

  if (
    weekDay === 1
  ) {


    const week =
      Math.ceil(
        day / 7
      );


    if (
      week === 1 ||
      week === 3
    ) {

      return true;

    }

  }


  return false;

}



/* ==================================================
   カレンダー描画
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



  const year =
    calendarDate.getFullYear();


  const month =
    calendarDate.getMonth();



  /* ------------------------------------------
     タイトル
  ------------------------------------------ */

  title.textContent =
    year +
    "年" +
    (month + 1) +
    "月";



  /* ------------------------------------------
     中身を消す
  ------------------------------------------ */

  calendar.innerHTML =
    "";



  /* ------------------------------------------
     月初の曜日
  ------------------------------------------ */

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();



  /* ------------------------------------------
     月末の日付
  ------------------------------------------ */

  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();



  /* ------------------------------------------
     月初の空白
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


    empty.className =
      "calendar-day empty";


    calendar.appendChild(
      empty
    );

  }



  /* ------------------------------------------
     日付を作る
  ------------------------------------------ */

  for (
    let day = 1;
    day <= lastDate;
    day++
  ) {


    const cell =
      document.createElement(
        "div"
      );


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



    /* ----------------------------------------
       日曜日
    ---------------------------------------- */

    if (
      weekDay === 0
    ) {

      cell.classList.add(
        "sunday"
      );

    }



    /* ----------------------------------------
       土曜日
    ---------------------------------------- */

    if (
      weekDay === 6
    ) {

      cell.classList.add(
        "saturday"
      );

    }



    /* ----------------------------------------
       1行目：日付
    ---------------------------------------- */

    const number =
      document.createElement(
        "div"
      );


    number.className =
      "day-number";


    number.textContent =
      day;


    cell.appendChild(
      number
    );



    /* ----------------------------------------
       2行目：定休日
    ---------------------------------------- */

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



    /* ----------------------------------------
       イベント
    ---------------------------------------- */

    const dateKey =
      makeDateKey(
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



    /* ----------------------------------------
       カレンダーへ追加
    ---------------------------------------- */

    calendar.appendChild(
      cell
    );

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



  /* ------------------------------------------
     前月
  ------------------------------------------ */

  if (prev) {


    prev.addEventListener(
      "click",
      function () {


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
      function () {


        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );


        renderCalendar();

      }
    );

  }

}



/* ==================================================
   スマホ横スライド
================================================== */

function setupSwipe() {


  const slider =
    document.getElementById(
      "calendarSlider"
    );


  if (!slider) {

    return;

  }



  let startX =
    0;


  let startY =
    0;



  /* ------------------------------------------
     タッチ開始
  ------------------------------------------ */

  slider.addEventListener(
    "touchstart",
    function (event) {


      const touch =
        event.changedTouches[0];


      startX =
        touch.screenX;


      startY =
        touch.screenY;


    },
    {
      passive: true
    }
  );



  /* ------------------------------------------
     タッチ終了
  ------------------------------------------ */

  slider.addEventListener(
    "touchend",
    function (event) {


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



      /* 縦方向の操作なら無視 */

      if (
        Math.abs(diffY) >
        Math.abs(diffX)
      ) {

        return;

      }



      /* ----------------------------------------
         左スワイプ → 次月
      ---------------------------------------- */

      if (
        diffX > 50
      ) {


        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );


        renderCalendar();

      }



      /* ----------------------------------------
         右スワイプ → 前月
      ---------------------------------------- */

      if (
        diffX < -50
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



/* ==================================================
   営業状況を1分ごとに更新
================================================== */

setInterval(
  updateBusinessStatus,
  60000
);
```
