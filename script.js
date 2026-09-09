/* ==================================================
   SUNABA COFFEE
   script.js
================================================== */

const OPEN_TIME = 10 * 60;
const CLOSE_TIME = 17 * 60;


/* ==================================================
   EVENTS
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
      "秋の季節に合わせたコーヒーをお楽しみください。",
    isNew: false
  }

];


let calendarDate = new Date();

calendarDate.setDate(1);


/* ==================================================
   START
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateBusinessStatus();

    setupHeroSlideshow();

    setupMenuSlideshow();

    renderNews();

    setupTicketToggle();

    renderCalendar();

    setupCalendarButtons();

    setupMobileMenu();

    setupScrollReveal();

    setupTopButton();

    setupQRCode();

    setupLanguageSwitch();

  }
);


/* ==================================================
   HOLIDAY
   毎週水曜日
   第1・第3月曜日
================================================== */

function isRegularHoliday(date) {

  const day =
    date.getDay();


  if (day === 3) {
    return true;
  }


  if (day === 1) {

    const week =
      Math.ceil(
        date.getDate() / 7
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
   BUSINESS STATUS
================================================== */

function updateBusinessStatus() {

  const element =
    document.getElementById(
      "businessStatus"
    );

  if (!element) {
    return;
  }


  const now =
    new Date();


  if (
    isRegularHoliday(now)
  ) {

    element.textContent =
      "🔵 本日は定休日";

    return;

  }


  const minutes =
    now.getHours() * 60 +
    now.getMinutes();


  if (
    minutes < OPEN_TIME
  ) {

    element.textContent =
      "⚪ 本日の営業前";

  }

  else if (
    minutes <
    CLOSE_TIME - 60
  ) {

    element.textContent =
      "🟢 営業中";

  }

  else if (
    minutes < CLOSE_TIME
  ) {

    element.textContent =
      "🟡 まもなく終了";

  }

  else {

    element.textContent =
      "⚪ 本日の営業終了";

  }

}


/* ==================================================
   HERO SLIDESHOW
   gaikan 5秒
   その他 3秒
================================================== */

function setupHeroSlideshow() {

  const slides =
    document.querySelectorAll(
      ".hero-slide"
    );

  if (!slides.length) {
    return;
  }


  let current = 0;


  function showSlide(index) {

    slides.forEach(
      (slide, i) => {

        slide.classList.toggle(
          "active",
          i === index
        );

      }
    );

  }


  function nextSlide() {

    current =
      (current + 1) %
      slides.length;


    showSlide(current);


    const nextTime =
      current === 0
        ? 5000
        : 3000;


    setTimeout(
      nextSlide,
      nextTime
    );

  }


  showSlide(0);

  setTimeout(
    nextSlide,
    5000
  );

}


/* ==================================================
   MENU PHOTO
================================================== */

function setupMenuSlideshow() {

  const photos =
    document.querySelectorAll(
      ".menu-photo"
    );

  if (!photos.length) {
    return;
  }


  let current = 0;


  setInterval(
    () => {

      photos[current]
        .classList
        .remove("active");


      current =
        (current + 1) %
        photos.length;


      photos[current]
        .classList
        .add("active");

    },
    3000
  );

}


/* ==================================================
   DATE
================================================== */

function formatDate(dateString) {

  const date =
    new Date(
      dateString +
      "T00:00:00"
    );


  return (
    `${date.getFullYear()}年` +
    `${date.getMonth() + 1}月` +
    `${date.getDate()}日`
  );

}


/* ==================================================
   NEWS
================================================== */

function renderNews() {

  const container =
    document.getElementById(
      "newsList"
    );

  if (!container) {
    return;
  }


  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const upcoming =
    events
      .filter(
        event =>
          new Date(
            event.date +
            "T00:00:00"
          ) >= today
      )
      .sort(
        (a, b) =>
          a.date.localeCompare(
            b.date
          )
      )
      .slice(0, 4);


  container.innerHTML = "";


  upcoming.forEach(
    event => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "news-card";


      card.id =
        event.id;


      const header =
        document.createElement(
          "div"
        );

      header.className =
        "news-header";


      const left =
        document.createElement(
          "div"
        );


      const date =
        document.createElement(
          "div"
        );

      date.className =
        "news-date";

      date.textContent =
        formatDate(
          event.date
        );


      const title =
        document.createElement(
          "div"
        );

      title.className =
        "news-title";

      title.textContent =
        event.title;


      if (event.isNew) {

        const label =
          document.createElement(
            "span"
          );

        label.className =
          "new-label";

        label.textContent =
          "NEW";

        title.appendChild(
          label
        );

      }


      left.appendChild(
        date
      );

      left.appendChild(
        title
      );


      const toggle =
        document.createElement(
          "button"
        );

      toggle.className =
        "event-toggle";

      toggle.type =
        "button";

      toggle.textContent =
        "▽";

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );


      const detail =
        document.createElement(
          "div"
        );

      detail.className =
        "news-detail";


      const detailText =
        document.createElement(
          "p"
        );

      detailText.textContent =
        event.detail;


      detail.appendChild(
        detailText
      );


      toggle.addEventListener(
        "click",
        () => {

          const open =
            detail.classList.contains(
              "open"
            );


          detail.classList.toggle(
            "open",
            !open
          );


          toggle.textContent =
            open
              ? "▽"
              : "△";


          toggle.setAttribute(
            "aria-expanded",
            String(!open)
          );

        }
      );


      header.appendChild(
        left
      );

      header.appendChild(
        toggle
      );


      card.appendChild(
        header
      );

      card.appendChild(
        detail
      );


      container.appendChild(
        card
      );

    }
  );

}


/* ==================================================
   COFFEE TICKET
================================================== */

function setupTicketToggle() {

  const toggle =
    document.getElementById(
      "ticketToggle"
    );

  const detail =
    document.getElementById(
      "ticketDetail"
    );


  if (
    !toggle ||
    !detail
  ) {
    return;
  }


  toggle.addEventListener(
    "click",
    () => {

      const open =
        detail.classList.contains(
          "open"
        );


      detail.classList.toggle(
        "open",
        !open
      );


      toggle.textContent =
        open
          ? "▽"
          : "△";


      toggle.setAttribute(
        "aria-expanded",
        String(!open)
      );

    }
  );

}


/* ==================================================
   CALENDAR
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


  title.textContent =
    `${year}年${month + 1}月`;


  calendar.innerHTML = "";


  const dayNames = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土"
  ];


  dayNames.forEach(
    day => {

      const cell =
        document.createElement(
          "div"
        );

      cell.className =
        "calendar-day-name";

      cell.textContent =
        day;

      calendar.appendChild(
        cell
      );

    }
  );


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  const prevDays =
    new Date(
      year,
      month,
      0
    ).getDate();


  for (
    let i = firstDay - 1;
    i >= 0;
    i--
  ) {

    const cell =
      document.createElement(
        "div"
      );

    cell.className =
      "calendar-day calendar-other";

    cell.innerHTML =
      `<span class="calendar-date">
        ${prevDays - i}
      </span>`;

    calendar.appendChild(
      cell
    );

  }


  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const date =
      new Date(
        year,
        month,
        day
      );


    const cell =
      document.createElement(
        "div"
      );

    cell.className =
      "calendar-day";


    const dateEl =
      document.createElement(
        "span"
      );

    dateEl.className =
      "calendar-date";

    dateEl.textContent =
      day;


    cell.appendChild(
      dateEl
    );


    const holiday =
      isRegularHoliday(
        date
      );


    const event =
      events.find(
        item =>
          item.date ===
          formatISODate(date)
      );


    if (
      holiday ||
      event
    ) {

      const info =
        document.createElement(
          "span"
        );

      info.className =
        "calendar-info";


      if (
        holiday &&
        event
      ) {

        info.textContent =
          `定休日・${event.title}`;

        info.classList.add(
          "calendar-holiday"
        );

      }

      else if (holiday) {

        info.textContent =
          "定休日";

        info.classList.add(
          "calendar-holiday"
        );

      }

      else {

        info.textContent =
          event.title;

        info.classList.add(
          "calendar-event"
        );


        info.addEventListener(
          "click",
          () =>
            openEventFromCalendar(
              event.id
            )
        );

      }


      cell.appendChild(
        info
      );

    }


    calendar.appendChild(
      cell
    );

  }

}


function formatISODate(date) {

  return [
    date.getFullYear(),

    String(
      date.getMonth() + 1
    ).padStart(2, "0"),

    String(
      date.getDate()
    ).padStart(2, "0")

  ].join("-");

}


/* ==================================================
   CALENDAR → NEWS
================================================== */

function openEventFromCalendar(
  eventId
) {

  const news =
    document.getElementById(
      "news"
    );


  const card =
    document.getElementById(
      eventId
    );


  if (
    !news ||
    !card
  ) {
    return;
  }


  news.scrollIntoView({
    behavior: "smooth"
  });


  setTimeout(
    () => {

      const detail =
        card.querySelector(
          ".news-detail"
        );


      const toggle =
        card.querySelector(
          ".event-toggle"
        );


      if (detail) {

        detail.classList.add(
          "open"
        );

      }


      if (toggle) {

        toggle.textContent =
          "△";

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    },
    600
  );

}


/* ==================================================
   CALENDAR BUTTONS
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
   MOBILE MENU
================================================== */

function setupMobileMenu() {

  const toggle =
    document.getElementById(
      "menuToggle"
    );

  const nav =
    document.getElementById(
      "mobileNav"
    );


  if (
    !toggle ||
    !nav
  ) {
    return;
  }


  toggle.addEventListener(
    "click",
    () => {

      nav.classList.toggle(
        "open"
      );

    }
  );


  nav
    .querySelectorAll("a")
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            nav.classList.remove(
              "open"
            );

          }
        );

      }
    );

}


/* ==================================================
   SCROLL REVEAL
================================================== */

function setupScrollReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (!elements.length) {
    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(
    element =>
      observer.observe(
        element
      )
  );

}


/* ==================================================
   TOP BUTTON
================================================== */

function setupTopButton() {

  const button =
    document.getElementById(
      "topButton"
    );


  if (!button) {
    return;
  }


  window.addEventListener(
    "scroll",
    () => {

      button.classList.toggle(
        "show",
        window.scrollY > 400
      );

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
   QR
================================================== */

function setupQRCode() {

  const qr =
    document.getElementById(
      "qrCode"
    );


  if (!qr) {
    return;
  }


  const url =
    "https://marippe468.github.io/sunaba-coffee/";


  qr.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=" +
    encodeURIComponent(url);

}


/* ==================================================
   LANGUAGE SWITCH
================================================== */

function setupLanguageSwitch() {

  const ja =
    document.getElementById(
      "jaButton"
    );

  const en =
    document.getElementById(
      "enButton"
    );


  if (ja) {

    ja.addEventListener(
      "click",
      () => {

        document.documentElement.lang =
          "ja";

        document.body.classList.remove(
          "english"
        );

        ja.classList.add(
          "active"
        );

        en?.classList.remove(
          "active"
        );

      }
    );

  }


  if (en) {

    en.addEventListener(
      "click",
      () => {

        document.documentElement.lang =
          "en";

        document.body.classList.add(
          "english"
        );

        en.classList.add(
          "active"
        );

        ja?.classList.remove(
          "active"
        );

        alert(
          "English version is being prepared."
        );

      }
    );

  }

}
