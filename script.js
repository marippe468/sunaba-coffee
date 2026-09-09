/* ==================================================
   SUNABA COFFEE
   script.js

   ・営業状況
   ・トップスライドショー
   ・メニュー写真スライドショー
   ・お知らせ
   ・イベント詳細開閉
   ・カレンダー
   ・カレンダーからお知らせへリンク
   ・スマホメニュー
   ・スクロール表示
   ・トップへ戻る
   ・QRコード
================================================== */


/* ==================================================
   初期処理
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  updateBusinessStatus();

  setupHeroSlideshow();

  setupMenuSlideshow();

  renderNews();

  renderCalendar();

  setupCalendarButtons();

  setupMobileMenu();

  setupScrollReveal();

  setupTopButton();

  setupQRCode();

});



/* ==================================================
   営業時間
================================================== */

const OPEN_TIME = 10 * 60;
const CLOSE_TIME = 17 * 60;


/* ==================================================
   定休日
   毎週水曜日
   第1・第3月曜日
================================================== */

function isRegularHoliday(date) {

  const day = date.getDay();

  /* 水曜日 */
  if (day === 3) {
    return true;
  }

  /* 月曜日 */
  if (day === 1) {

    const dateNumber = date.getDate();

    const weekNumber = Math.ceil(dateNumber / 7);

    if (weekNumber === 1 || weekNumber === 3) {
      return true;
    }
  }

  return false;
}



/* ==================================================
   営業状況
================================================== */

function updateBusinessStatus() {

  const statusElement =
    document.getElementById("businessStatus");

  if (!statusElement) return;

  const now = new Date();

  if (isRegularHoliday(now)) {

    statusElement.textContent =
      "🔵 本日は定休日";

    return;
  }


  const minutes =
    now.getHours() * 60 +
    now.getMinutes();


  if (minutes < OPEN_TIME) {

    statusElement.textContent =
      "⚪ 本日の営業前";

  } else if (minutes >= OPEN_TIME && minutes < CLOSE_TIME - 60) {

    statusElement.textContent =
      "🟢 営業中";

  } else if (minutes >= CLOSE_TIME - 60 && minutes < CLOSE_TIME) {

    statusElement.textContent =
      "🟡 まもなく終了";

  } else {

    statusElement.textContent =
      "⚪ 本日の営業終了";

  }

}



/* ==================================================
   トップ スライドショー
================================================== */

function setupHeroSlideshow() {

  const slides =
    document.querySelectorAll(".hero-slide");

  if (!slides.length) return;


  let current = 0;


  function showSlide(index) {

    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === index
      );

    });

  }


  showSlide(0);


  /*

    gaikan.jpg
    → 5秒

    それ以外
    → 3秒

  */

  function nextSlide() {

    current =
      (current + 1) % slides.length;

    showSlide(current);


    const nextTime =
      current === 0 ? 5000 : 3000;

    setTimeout(nextSlide, nextTime);

  }


  setTimeout(nextSlide, 5000);

}



/* ==================================================
   メニュー写真スライドショー
================================================== */

function setupMenuSlideshow() {

  const photos =
    document.querySelectorAll(".menu-photo");

  if (!photos.length) return;


  let current = 0;


  setInterval(() => {

    photos[current].classList.remove("active");

    current =
      (current + 1) % photos.length;

    photos[current].classList.add("active");

  }, 3000);

}



/* ==================================================
   イベント
================================================== */

const events = [

  {
    id: "event-1",

    date: "2026-09-12",

    title: "秋のコーヒーを楽しむ小さな会",

    detail:
      "秋の午後に、ゆっくりコーヒーを楽しむ小さなイベントです。",

    isNew: true
  },


  {
    id: "event-2",

    date: "2026-09-19",

    title: "サンドイッチの日",

    detail:
      "おすすめの日替わりサンドイッチを数量限定でご用意します。",

    isNew: true
  },


  {
    id: "event-3",

    date: "2026-09-27",

    title: "しまなみ海道・旅の途中に",

    detail:
      "旅の途中に、コーヒーと軽食でひと休みしませんか。",

    isNew: false
  },


  {
    id: "event-4",

    date: "2026-10-04",

    title: "秋のおすすめコーヒー週間",

    detail:
      "店主おすすめのブラジルコーヒーをお楽しみください。",

    isNew: false
  }

];



/* ==================================================
   日付
================================================== */

function formatDate(dateString) {

  const date =
    new Date(dateString + "T00:00:00");

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

}



/* ==================================================
   お知らせ
   最新3～4件の未来イベントだけ表示
================================================== */

function renderNews() {

  const container =
    document.getElementById("newsList");

  if (!container) return;


  const today = new Date();

  today.setHours(0, 0, 0, 0);


  const upcoming =
    events
      .filter(event => {

        const date =
          new Date(event.date + "T00:00:00");

        return date >= today;

      })
      .sort((a, b) =>
        a.date.localeCompare(b.date)
      )
      .slice(0, 4);


  container.innerHTML = "";


  upcoming.forEach(event => {

    const card =
      document.createElement("article");

    card.className = "news-card";

    card.id = event.id;


    const header =
      document.createElement("div");

    header.className = "news-header";


    const left =
      document.createElement("div");


    const date =
      document.createElement("div");

    date.className = "news-date";

    date.textContent =
      formatDate(event.date);


    const title =
      document.createElement("div");

    title.className = "news-title";

    title.textContent =
      event.title;


    if (event.isNew) {

      const newLabel =
        document.createElement("span");

      newLabel.className = "new-label";

      newLabel.textContent = "NEW";

      title.appendChild(newLabel);

    }


    left.appendChild(date);

    left.appendChild(title);


    const toggle =
      document.createElement("button");

    toggle.className = "event-toggle";

    toggle.type = "button";

    toggle.textContent = "▽";

    toggle.setAttribute(
      "aria-label",
      "イベント詳細を開く"
    );


    const detail =
      document.createElement("div");

    detail.className = "news-detail";

    detail.innerHTML = `
      <p>${event.detail}</p>
    `;


    toggle.addEventListener("click", () => {

      const isOpen =
        detail.classList.contains("open");


      detail.classList.toggle(
        "open",
        !isOpen
      );


      toggle.textContent =
        isOpen ? "▽" : "△";


      toggle.setAttribute(
        "aria-label",
        isOpen
          ? "イベント詳細を開く"
          : "イベント詳細を閉じる"
      );

    });


    header.appendChild(left);

    header.appendChild(toggle);

    card.appendChild(header);

    card.appendChild(detail);

    container.appendChild(card);

  });

}



/* ==================================================
   カレンダー
================================================== */

let calendarDate = new Date();

calendarDate.setDate(1);



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


  const dayNames =
    ["日", "月", "火", "水", "木", "金", "土"];


  dayNames.forEach(day => {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day-name";

    cell.textContent =
      day;

    calendar.appendChild(cell);

  });


  const firstDay =
    new Date(year, month, 1).getDay();


  const lastDate =
    new Date(year, month + 1, 0).getDate();


  const previousLastDate =
    new Date(year, month, 0).getDate();


  /* 前月 */

  for (let i = firstDay - 1; i >= 0; i--) {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day calendar-other";

    cell.innerHTML = `
      <span class="calendar-date">
        ${previousLastDate - i}
      </span>
    `;

    calendar.appendChild(cell);

  }


  /* 今月 */

  for (let day = 1; day <= lastDate; day++) {

    const cell =
      document.createElement("div");

    cell.className =
      "calendar-day";


    const date =
      new Date(year, month, day);


    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


    const dateNumber =
      document.createElement("span");

    dateNumber.className =
      "calendar-date";

    dateNumber.textContent =
      day;


    cell.appendChild(dateNumber);


    const holiday =
      isRegularHoliday(date);


    const event =
      events.find(item =>
        item.date === dateString
      );


    if (holiday || event) {

      const info =
        document.createElement("span");

      info.className =
        "calendar-info";


      if (holiday && event) {

        info.textContent =
          `定休日・${event.title}`;

      } else if (holiday) {

        info.textContent =
          "定休日";

        info.classList.add(
          "calendar-holiday"
        );

      } else if (event) {

        info.textContent =
          event.title;

        info.classList.add(
          "calendar-event"
        );


        info.addEventListener(
          "click",
          () => {

            openEventFromCalendar(
              event.id
            );

          }
        );

      }


      cell.appendChild(info);

    }


    calendar.appendChild(cell);

  }

}



/* ==================================================
   カレンダー → お知らせ
================================================== */

function openEventFromCalendar(eventId) {

  const news =
    document.getElementById("news");

  const eventCard =
    document.getElementById(eventId);


  if (!news || !eventCard) return;


  news.scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(() => {

    const detail =
      eventCard.querySelector(".news-detail");

    const toggle =
      eventCard.querySelector(".event-toggle");


    if (detail) {

      detail.classList.add("open");

    }


    if (toggle) {

      toggle.textContent = "△";

    }

  }, 600);

}



/* ==================================================
   カレンダーボタン
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
   スマホメニュー
================================================== */

function setupMobileMenu() {

  const toggle =
    document.getElementById("menuToggle");

  const nav =
    document.getElementById("mobileNav");


  if (!toggle || !nav) return;


  toggle.addEventListener("click", () => {

    nav.classList.toggle("open");

  });


  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

    });

  });

}



/* ==================================================
   スクロール表示
================================================== */

function setupScrollReveal() {

  const elements =
    document.querySelectorAll(".reveal");


  if (!elements.length) return;


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
   トップへ戻る
================================================== */

function setupTopButton() {

  const button =
    document.getElementById("topButton");


  if (!button) return;


  window.addEventListener(
    "scroll",
    () => {

      if (window.scrollY > 400) {

        button.classList.add("show");

      } else {

        button.classList.remove("show");

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
   QRコード
================================================== */

function setupQRCode() {

  const qr =
    document.getElementById("qrCode");


  if (!qr) return;


  const pageUrl =
    encodeURIComponent(
      "https://marippe468.github.io/sunaba-coffee/"
    );


  qr.src =
    `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${pageUrl}`;

}
