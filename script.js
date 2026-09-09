/* ==================================================
   SUNABA COFFEE
   script.js
   学習用ドラフト版

   ・営業状況
   ・スライドショー
   ・お知らせ
   ・イベント詳細開閉
   ・営業カレンダー
   ・イベント連動
   ・スマホメニュー
   ・スクロールアニメーション
   ・トップへ戻る
================================================== */


document.addEventListener("DOMContentLoaded", () => {

  updateBusinessStatus();

  setupHeroSlideshow();

  renderNews();

  renderCalendar();

  setupCalendarButtons();

  setupSwipe();

  setupMobileMenu();

  setupScrollReveal();

  setupTopButton();

});


/* ==================================================
   営業時間
================================================== */

const OPEN_TIME = 10 * 60;
const CLOSE_TIME = 17 * 60;


function updateBusinessStatus() {

  const status = document.getElementById("businessStatus");

  if (!status) return;

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();


  const holiday = isHoliday(year, month, date);


  status.className = "business-status";


  if (holiday) {

    status.textContent = "🔵 本日は定休日";
    status.classList.add("holiday");

    return;
  }


  if (currentMinutes < OPEN_TIME) {

    status.textContent = "🟢 10時から営業します";
    status.classList.add("open");

    return;
  }


  if (currentMinutes < 16 * 60) {

    status.textContent = "🟢 営業中　10:00～17:00";
    status.classList.add("open");

    return;
  }


  if (currentMinutes < CLOSE_TIME) {

    status.textContent = "🟡 まもなく終了　17:00まで";
    status.classList.add("soon");

    return;
  }


  status.textContent = "⚪ 本日の営業は終了しました";
  status.classList.add("closed");

}


/* ==================================================
   イベント
   ※ここを変更すると
   お知らせとカレンダーの両方に反映
================================================== */

const events = {

  "2026-09-12": {
    title: "小さな音楽会",
    detail:
      "店内で小さな音楽会を開催します。コーヒーを楽しみながら、ゆったり音楽をお楽しみください。"
  },

  "2026-09-26": {
    title: "秋の読書会",
    detail:
      "お気に入りの本を持ち寄って、コーヒーと一緒に読書を楽しむ小さな会です。"
  },

  "2026-10-10": {
    title: "秋のコーヒー会",
    detail:
      "秋の季節に合わせて、コーヒーをゆっくり楽しむ会を予定しています。"
  },

  "2026-10-31": {
    title: "ハロウィンイベント",
    detail:
      "ハロウィンに合わせた小さなイベントを予定しています。"
  },

  "2026-11-07": {
    title: "コーヒー教室",
    detail:
      "コーヒーをもっと身近に楽しんでいただくための小さな教室です。"
  },

  "2026-11-14": {
    title: "読書会",
    detail:
      "コーヒーを片手に、ゆっくり本を楽しむ読書会です。"
  },

  "2026-11-28": {
    title: "小さな音楽会",
    detail:
      "コーヒーと音楽を楽しむ小さな音楽会を予定しています。"
  }

};


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

  const date = new Date(year, month, day);

  const weekDay = date.getDay();


  /* 毎週水曜日 */

  if (weekDay === 3) {
    return true;
  }


  /* 第1・第3月曜日 */

  if (weekDay === 1) {

    const week = Math.ceil(day / 7);

    if (week === 1 || week === 3) {
      return true;
    }

  }


  return false;

}


/* ==================================================
   お知らせ
   最新3～4件のみ表示
================================================== */

function renderNews() {

  const newsList = document.getElementById("newsList");

  if (!newsList) return;


  const today = new Date();

  const todayKey = makeDateKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );


  const futureEvents = Object.entries(events)
    .filter(([dateKey]) => dateKey >= todayKey)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 4);


  newsList.innerHTML = "";


  futureEvents.forEach(([dateKey, event], index) => {

    const card = document.createElement("article");

    card.className = "news-card";


    const dateParts = dateKey.split("-");

    const formattedDate =
      `${dateParts[0]}年${Number(dateParts[1])}月${Number(dateParts[2])}日`;


    card.innerHTML = `

      <time datetime="${dateKey}">
        ${formattedDate}
      </time>

      <h3>
        ${event.title}
      </h3>

      <p>
        クリックすると詳細をご覧いただけます。
      </p>

      <div class="news-detail">

        <div class="news-detail-inner">

          <p>
            ${event.detail}
          </p>

        </div>

      </div>

    `;


    card.addEventListener("click", () => {

      card.classList.toggle("open");

    });


    newsList.appendChild(card);

  });

}


/* ==================================================
   カレンダー
================================================== */

let calendarDate = new Date();


function renderCalendar() {

  const calendar =
    document.getElementById("calendar");

  const title =
    document.getElementById("calendarTitle");


  if (!calendar || !title) return;


  const year = calendarDate.getFullYear();

  const month = calendarDate.getMonth();


  title.textContent =
    `${year}年${month + 1}月`;


  calendar.innerHTML = "";


  const firstDay =
    new Date(year, month, 1).getDay();


  const lastDate =
    new Date(year, month + 1, 0).getDate();


  /* 月初までの空白 */

  for (let i = 0; i < firstDay; i++) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day empty";

    calendar.appendChild(empty);

  }


  /* 日付 */

  for (let day = 1; day <= lastDate; day++) {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day";


    const date =
      new Date(year, month, day);


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


    /* 定休日 */

    const holiday =
      isHoliday(year, month, day);


    /* イベント */

    const dateKey =
      makeDateKey(year, month, day);


    const event =
      events[dateKey];


    if (holiday) {

      cell.classList.add("holiday");

    }


    if (event) {

      cell.classList.add("event");

    }


    /* 2行目 */

    const status =
      document.createElement("div");

    status.className =
      "calendar-status";


    if (holiday && event) {

      status.textContent =
        `休み・${event.title}`;

      cell.classList.add("event");

    }

    else if (holiday) {

      status.textContent =
        "休み";

    }

    else if (event) {

      status.textContent =
        event.title;

    }


    cell.appendChild(status);


    calendar.appendChild(cell);

  }

}


/* ==================================================
   カレンダー ボタン
================================================== */

function setupCalendarButtons() {

  const prev =
    document.getElementById("prevMonth");

  const next =
    document.getElementById("nextMonth");


  if (prev) {

    prev.addEventListener("click", () => {

      calendarDate.setMonth(
        calendarDate.getMonth() - 1
      );

      renderCalendar();

    });

  }


  if (next) {

    next.addEventListener("click", () => {

      calendarDate.setMonth(
        calendarDate.getMonth() + 1
      );

      renderCalendar();

    });

  }

}


/* ==================================================
   カレンダー スワイプ
================================================== */

function setupSwipe() {

  const slider =
    document.getElementById("calendarSlider");

  if (!slider) return;


  let startX = 0;
  let startY = 0;


  slider.addEventListener(
    "touchstart",
    (event) => {

      const touch =
        event.changedTouches[0];

      startX = touch.screenX;
      startY = touch.screenY;

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
   スライドショー
================================================== */

const heroSlides = [

  {
    src: "./image/gaikan.jpg",
    alt: "SUNABA COFFEE 外観",
    duration: 5000
  },

  {
    src: "./image/coffee2.jpg",
    alt: "SUNABA COFFEE コーヒー",
    duration: 3000
  },

  {
    src: "./image/gaikan2.jpg",
    alt: "SUNABA COFFEE 外観",
    duration: 3000
  },

  {
    src: "./image/tennai1.jpg",
    alt: "SUNABA COFFEE 店内",
    duration: 3000
  },

  {
    src: "./image/tennai2.jpg",
    alt: "SUNABA COFFEE 店内",
    duration: 3000
  },

  {
    src: "./image/tennai3.jpg",
    alt: "SUNABA COFFEE 店内",
    duration: 3000
  }

];


function setupHeroSlideshow() {

  const image =
    document.getElementById("heroSlide");

  const dots =
    document.getElementById("slideDots");


  if (!image) return;


  /* 画像を先読み */

  heroSlides.forEach(slide => {

    const preload =
      new Image();

    preload.src =
      slide.src;

  });


  /* ドット */

  if (dots) {

    heroSlides.forEach((slide, index) => {

      const dot =
        document.createElement("span");

      dot.className =
        "slide-dot";

      if (index === 0) {
        dot.classList.add("active");
      }

      dots.appendChild(dot);

    });

  }


  let currentIndex = 0;


  function updateDots() {

    if (!dots) return;

    const allDots =
      dots.querySelectorAll(".slide-dot");


    allDots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === currentIndex
      );

    });

  }


  function nextSlide() {

    const nextIndex =
      (currentIndex + 1) %
      heroSlides.length;


    /* 現在の画像を左へ */

    image.classList.add("slide-out");


    setTimeout(() => {

      currentIndex =
        nextIndex;


      image.src =
        heroSlides[currentIndex].src;

      image.alt =
        heroSlides[currentIndex].alt;


      /*
        いったん右側へ配置
      */

      image.classList.remove("slide-out");

      image.classList.add("slide-in");


      /*
        ブラウザに状態を認識させてから
        中央へ移動
      */

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          image.classList.remove("slide-in");

          updateDots();

        });

      });


      /*
        次の画像へ
      */

      setTimeout(
        nextSlide,
        heroSlides[currentIndex].duration
      );


    }, 750);

  }


  setTimeout(
    nextSlide,
    heroSlides[0].duration
  );

}


/* ==================================================
   スマホメニュー
================================================== */

function setupMobileMenu() {

  const button =
    document.getElementById("menuButton");

  const nav =
    document.getElementById("mobileNav");


  if (!button || !nav) return;


  button.addEventListener("click", () => {

    const isOpen =
      nav.classList.toggle("open");


    button.setAttribute(
      "aria-expanded",
      isOpen
    );


    button.textContent =
      isOpen ? "×" : "☰";

  });


  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      button.setAttribute(
        "aria-expanded",
        "false"
      );

      button.textContent = "☰";

    });

  });

}


/* ==================================================
   スクロールでふわっと表示
================================================== */

function setupScrollReveal() {

  const elements =
    document.querySelectorAll(".reveal");


  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {

      element.classList.add("visible");

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

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
   トップへ戻るボタン
================================================== */

function setupTopButton() {

  const button =
    document.getElementById("topButton");

  if (!button) return;


  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 500) {

        button.classList.add("show");

      }
      else {

        button.classList.remove("show");

      }

    },
    { passive: true }
  );

}


/* ==================================================
   営業状況を1分ごとに更新
================================================== */

setInterval(
  updateBusinessStatus,
  60000
);
