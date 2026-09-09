/* ==================================================
   SUNABA COFFEE
   script.js

   ・営業状況
   ・イベント
   ・営業カレンダー
   ・トップスライドショー
   ・メニュースライドショー
   ・スマホメニュー
   ・スクロール表示
   ・トップへ戻る
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  updateBusinessStatus();

  renderNews();

  renderCalendar();

  setupCalendarButtons();

  setupSwipe();

  setupHeroSlideshow();

  setupMenuSlideshow();

  setupMobileMenu();

  setupNavButtons();

  setupReveal();

  setupTopButton();

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

  const year = now.getFullYear();

  const month = now.getMonth();

  const date = now.getDate();

  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();


  const holiday =
    isHoliday(year, month, date);


  status.className = "business-status";


  /* 定休日 */

  if (holiday) {

    status.textContent =
      "🔵 本日は定休日";

    status.classList.add("holiday");

    return;
  }


  /* 開店前 */

  if (currentMinutes < OPEN_TIME) {

    status.textContent =
      "⚪ 10時から営業します";

    status.classList.add("closed");

    return;
  }


  /* 営業中 */

  if (currentMinutes < 16 * 60) {

    status.textContent =
      "🟢 営業中　10:00～17:00";

    status.classList.add("open");

    return;
  }


  /* まもなく終了 */

  if (currentMinutes < CLOSE_TIME) {

    status.textContent =
      "🟡 まもなく終了　17:00まで";

    status.classList.add("soon");

    return;
  }


  /* 営業終了 */

  status.textContent =
    "⚪ 本日の営業終了";

  status.classList.add("closed");
}


/* ==================================================
   EVENTS
================================================== */

const events = {

  "2026-09-12":
    "小さな音楽会",

  "2026-09-26":
    "秋の読書会",

  "2026-10-10":
    "秋のコーヒー会",

  "2026-10-17":
    "ミニ音楽会",

  "2026-10-31":
    "ハロウィンイベント",

  "2026-11-07":
    "コーヒー教室",

  "2026-11-14":
    "読書会",

  "2026-11-28":
    "小さな音楽会"

};


/* ==================================================
   DATE KEY
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
   HOLIDAY
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
   NEWS
================================================== */

function renderNews() {

  const newsList =
    document.getElementById("newsList");

  if (!newsList) return;


  const today =
    new Date();

  today.setHours(0, 0, 0, 0);


  const upcomingEvents =
    Object.entries(events)

      .map(([date, title]) => ({
        date,
        title
      }))

      .filter(event => {

        const eventDate =
          new Date(event.date + "T00:00:00");

        return eventDate >= today;

      })

      .sort((a, b) =>
        a.date.localeCompare(b.date)
      )

      .slice(0, 4);


  newsList.innerHTML = "";


  if (upcomingEvents.length === 0) {

    const empty =
      document.createElement("p");

    empty.textContent =
      "現在予定されているイベントはありません。";

    newsList.appendChild(empty);

    return;
  }


  upcomingEvents.forEach(event => {

    const article =
      document.createElement("article");

    article.className =
      "news-card clickable";


    const date =
      new Date(event.date + "T00:00:00");


    const dateText =
      `${date.getFullYear()}年` +
      `${date.getMonth() + 1}月` +
      `${date.getDate()}日`;


    article.innerHTML = `

      <time datetime="${event.date}">
        ${dateText}
      </time>

      <h3>${event.title}</h3>

      <p>
        SUNABA COFFEEで開催予定のイベントです。
        詳細は店内にてご案内します。
      </p>

      <div class="news-detail">
        <p>
          開催日にぜひお気軽にお立ち寄りください。
        </p>
      </div>

    `;


    article.addEventListener("click", () => {

      article.classList.toggle("open");

    });


    newsList.appendChild(article);

  });

}


/* ==================================================
   CALENDAR
================================================== */

/*
   現在の月を最初に表示
*/

const todayForCalendar =
  new Date();

let calendarDate =
  new Date(
    todayForCalendar.getFullYear(),
    todayForCalendar.getMonth(),
    1
  );


function renderCalendar() {

  const calendar =
    document.getElementById("calendar");

  const title =
    document.getElementById("calendarTitle");

  if (!calendar || !title) return;


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


  /* 空白 */

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
      cell.classList.add("sunday");
    }

    if (weekDay === 6) {
      cell.classList.add("saturday");
    }


    /* 日付 */

    const number =
      document.createElement("div");

    number.className =
      "day-number";

    number.textContent =
      day;

    cell.appendChild(number);


    /* 休み・イベント */

    const holiday =
      isHoliday(
        year,
        month,
        day
      );


    const dateKey =
      makeDateKey(
        year,
        month,
        day
      );


    const hasEvent =
      Boolean(events[dateKey]);


    if (holiday) {
      cell.classList.add("holiday");
    }

    if (hasEvent) {
      cell.classList.add("event");
    }


    if (holiday || hasEvent) {

      const info =
        document.createElement("div");

      info.className =
        "calendar-info";


      if (holiday && hasEvent) {

        info.textContent =
          `休み・${events[dateKey]}`;

      } else if (holiday) {

        info.textContent =
          "休み";

      } else {

        info.textContent =
          events[dateKey];

      }


      cell.appendChild(info);

    }


    calendar.appendChild(cell);

  }

}


/* ==================================================
   CALENDAR BUTTONS
================================================== */

function setupCalendarButtons() {

  const prev =
    document.getElementById("prevMonth");

  const next =
    document.getElementById("nextMonth");


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
   CALENDAR SWIPE
================================================== */

function setupSwipe() {

  const slider =
    document.getElementById("calendarSlider");

  if (!slider) return;


  let startX = 0;

  let startY = 0;


  slider.addEventListener(
    "touchstart",
    event => {

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
    event => {

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


      if (diffX > 50) {

        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );

        renderCalendar();

      }


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
   TOP SLIDESHOW
================================================== */

function setupHeroSlideshow() {

  const image =
    document.getElementById("heroSlideshow");

  if (!image) return;


  const slides = [

    "./image/gaikan.jpg",

    "./image/coffee2.jpg",

    "./image/gaikan2.jpg",

    "./image/tennai1.jpg",

    "./image/tennai2.jpg",

    "./image/tennai3.jpg"

  ];


  /* 画像先読み */

  slides.forEach(src => {

    const preload =
      new Image();

    preload.src = src;

  });


  let index = 0;


  function showNext() {

    const nextIndex =
      (index + 1) % slides.length;


    image.classList.remove(
      "slide-in"
    );

    image.classList.add(
      "slide-out"
    );


    setTimeout(() => {

      image.src =
        slides[nextIndex];

      image.classList.remove(
        "slide-out"
      );

      void image.offsetWidth;

      image.classList.add(
        "slide-in"
      );

      index =
        nextIndex;


      setTimeout(() => {

        image.classList.remove(
          "slide-in"
        );

      }, 750);


      scheduleNext();

    }, 750);

  }


  function scheduleNext() {

    const wait =
      index === 0
        ? 5000
        : 3000;


    setTimeout(
      showNext,
      wait
    );

  }


  /*
    最初のgaikan.jpgを5秒表示
  */

  scheduleNext();

}


/* ==================================================
   MENU SLIDESHOW
================================================== */

function setupMenuSlideshow() {

  const image =
    document.getElementById("menuSlideshow");

  if (!image) return;


  /*
    サンドイッチ写真については、
    現在登録されている menu.jpg を使用。
    coffee2.jpg はトップでも使用しているコーヒー写真。
  */

  const slides = [

    "./image/menu.jpg",

    "./image/coffee2.jpg",

    "./image/menu.jpg"

  ];


  let index = 0;


  slides.forEach(src => {

    const preload =
      new Image();

    preload.src = src;

  });


  setInterval(() => {

    index =
      (index + 1) % slides.length;


    image.classList.remove(
      "menu-slide"
    );

    void image.offsetWidth;

    image.src =
      slides[index];

    image.classList.add(
      "menu-slide"
    );

  }, 3000);

}


/* ==================================================
   MOBILE MENU
================================================== */

function setupMobileMenu() {

  const toggle =
    document.getElementById("menuToggle");

  const nav =
    document.getElementById("mobileNav");


  if (!toggle || !nav) return;


  toggle.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle("open");


      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );


      toggle.textContent =
        isOpen ? "×" : "☰";

    }
  );


  nav.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

          toggle.textContent =
            "☰";

        }
      );

    });

}


/* ==================================================
   NAV BUTTON SELECT
================================================== */

function setupNavButtons() {

  const buttons =
    document.querySelectorAll(
      ".nav-button"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        buttons.forEach(item => {

          item.classList.remove(
            "selected"
          );

        });


        button.classList.add(
          "selected"
        );

      }
    );

  });

}


/* ==================================================
   SCROLL REVEAL
================================================== */

function setupReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (!("IntersectionObserver" in window)) {

    elements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* ==================================================
   TOP BUTTON
================================================== */

function setupTopButton() {

  const button =
    document.getElementById(
      "topButton"
    );

  if (!button) return;


  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 500) {

        button.classList.add(
          "show"
        );

      } else {

        button.classList.remove(
          "show"
        );

      }

    }
  );


  button.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}


/* ==================================================
   営業状況 更新
================================================== */

setInterval(
  updateBusinessStatus,
  60000
);
