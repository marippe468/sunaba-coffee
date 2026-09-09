/* ==================================================
   SUNABA COFFEE
   script.js
================================================== */

const OPEN_TIME = 10 * 60;
const CLOSE_TIME = 17 * 60;


/* ==================================================
   LANGUAGE
================================================== */

let currentLanguage =
  localStorage.getItem("sunabaLanguage") || "ja";


/* ==================================================
   EVENTS
================================================== */

const events = [

  {
    id: "event-1",
    date: "2026-09-12",

    ja: {
      title: "秋のコーヒーを楽しむ小さな会",
      detail:
        "秋の午後に、ゆっくりコーヒーを楽しむ小さなイベントです。"
    },

    en: {
      title: "A Small Autumn Coffee Gathering",
      detail:
        "Enjoy a relaxing cup of coffee on a peaceful autumn afternoon."
    },

    isNew: true
  },

  {
    id: "event-2",
    date: "2026-09-19",

    ja: {
      title: "サンドイッチの日",
      detail:
        "おすすめの日替わりサンドイッチを数量限定でご用意します。"
    },

    en: {
      title: "Sandwich Day",
      detail:
        "Our recommended daily sandwich will be available in limited quantities."
    },

    isNew: true
  },

  {
    id: "event-3",
    date: "2026-09-27",

    ja: {
      title: "しまなみ海道・旅の途中に",
      detail:
        "旅の途中に、コーヒーと軽食でひと休みしませんか。"
    },

    en: {
      title: "A Break Along the Shimanami Kaido",
      detail:
        "Take a relaxing break with coffee and a light meal during your journey."
    },

    isNew: false
  },

  {
    id: "event-4",
    date: "2026-10-04",

    ja: {
      title: "秋のおすすめコーヒー週間",
      detail:
        "秋の季節に合わせたコーヒーをお楽しみください。"
    },

    en: {
      title: "Autumn Coffee Week",
      detail:
        "Enjoy coffee selections specially suited to the autumn season."
    },

    isNew: false
  }

];


let calendarDate = new Date();

calendarDate.setDate(1);


/* ==================================================
   STATIC TRANSLATIONS
================================================== */

const translations = {

  "しまなみ海道":
    "Shimanami Kaido",

  "～愛媛県今治市・夫婦で営む小さな駅前カフェ～":
    "A small husband-and-wife café near Imabari Station, Ehime",

  "JR今治駅、バス停から徒歩3分":
    "3-minute walk from JR Imabari Station and the bus stop",

  "🐾 Wi-Fi・電源利用可":
    "🐾 Wi-Fi & power outlets available",

  "電車の音をBGMに、ゆっくりとした時間を過ごせる小さなカフェです。":
    "A cozy little café where you can relax to the sound of passing trains.",

  "🐾 愛犬とともに・テラス席OK":
    "🐾 Dogs welcome on the terrace",

  "営業時間 10:00～17:00":
    "Open 10:00 AM–5:00 PM",

  "お知らせ":
    "NEWS",

  "カレンダー":
    "CALENDAR",

  "OWNER'S NOTE｜店主のひとこと":
    "OWNER'S NOTE",

  "メニュー":
    "MENU",

  "アクセス":
    "ACCESS",

  "～ いつもの一杯に、旅の途中の一杯にも。～":
    "For your everyday cup, or a cup along your journey.",

  "夫婦で営む、気取らず立ち寄れる場所。":
    "A relaxed little place run by a husband-and-wife team.",

  "コーヒーを片手に、ほっとひと息ついてください。":
    "Take a break and enjoy a comforting cup of coffee.",

  "お知らせ・イベント情報です。":
    "News and event information from SUNABA COFFEE.",

  "SUNABA COFFEEからのお知らせ・イベント情報です。":
    "News and event information from SUNABA COFFEE.",

  "☕ コーヒーチケット販売中":
    "☕ Coffee Tickets Available",

  "5杯分　2,200円":
    "5 cups  ¥2,200",

  "お好きな飲み物にご利用いただけます。":
    "Use them for any drink of your choice.",

  "有効期間：購入から6か月未満":
    "Valid for less than 6 months from purchase.",

  "店頭のみで販売しています。":
    "Available for purchase at the café only.",

  "スマートフォンで残り回数を管理できます。":
    "You can manage your remaining visits on your smartphone.",

  "定休日：水曜日・第1・第3月曜日":
    "Closed: Wednesdays and the 1st & 3rd Mondays",

  "〈 前月":
    "〈 Previous",

  "次月 〉":
    "Next 〉",

  "店主のひとこと":
    "OWNER'S NOTE",

  "気軽に立ち寄れる、駅前の喫茶店":
    "A Relaxed Café Near the Station",

  "駅前で、気軽に立ち寄っていただける喫茶店を夫婦で営んでいます。":
    "We run a relaxed café near the station as a husband-and-wife team.",

  "電車を待つ時間や旅の途中にも、ふらっとお立ち寄りください。":
    "Please drop in while waiting for your train or during your journey.",

  "コーヒーのこだわり":
    "Our Coffee",

  "私はブラジルコーヒーが好きで、香りと飲みやすさを楽しんでいただける一杯を大切にしています。":
    "I love Brazilian coffee and value a cup that is both aromatic and easy to enjoy.",

  "愛犬家、テラス席":
    "A Dog Lover's Terrace",

  "私は大の愛犬家です。愛犬と一緒に過ごせる場所があればという思いから、テラス席はペットOKにしています。":
    "I am a devoted dog lover. Our terrace is pet-friendly because I wanted a place where guests could relax with their dogs.",

  "愛犬と一緒に、ゆっくりどうぞ。":
    "Relax and enjoy your time with your dog.",

  "テラス席はペットOK。お散歩の途中や旅の途中にも、愛犬と一緒に気軽にお立ち寄りください。":
    "Our terrace is pet-friendly. Please feel free to stop by with your dog while out for a walk or traveling.",

  "電車の音が聞こえたら、もうすぐ駅です。":
    "When you hear the train, the station is just around the corner.",

  "いつもの一杯と、軽いお食事をご用意しています。":
    "We offer your favorite cup of coffee and light meals.",

  "写真":
    "PHOTO",

  "モーニング":
    "MORNING",

  "提供 10:00～12:00":
    "Served 10:00 AM–12:00 PM",

  "トースト、サラダ、コーヒー":
    "Toast, salad & coffee",

  "ホットサンド、サラダ、コーヒー":
    "Hot sandwich, salad & coffee",

  "和食セット（おにぎり2個、卵、サラダ）、コーヒー":
    "Japanese breakfast set (2 rice balls, egg, salad) & coffee",

  "軽食":
    "LIGHT MEAL",

  "おすすめ":
    "Recommended",

  "日替わりサンドイッチ":
    "Daily Sandwich",

  "（地産野菜、たまご）":
    "(local vegetables & egg)",

  "限定20食":
    "Limited to 20",

  "サンドイッチ（たまご）":
    "Egg sandwich",

  "サンドイッチ（ハム・レタス）":
    "Ham & lettuce sandwich",

  "カレー（ミニサラダ付き）":
    "Curry with mini salad",

  "エビフライカレー（ミニサラダ付き）":
    "Fried shrimp curry with mini salad",

  "ピラフ（ミニサラダ付き）":
    "Pilaf with mini salad",

  "飲み物":
    "DRINK",

  "ブラジルコーヒー":
    "Brazilian coffee",

  "ブレンドコーヒー":
    "Blend coffee",

  "アイスコーヒー":
    "Iced coffee",

  "カフェオレ":
    "Café au lait",

  "ウインナーコーヒー":
    "Vienna coffee",

  "☕ コーヒーチケット":
    "☕ Coffee Ticket",

  "5杯分・お好きな飲み物にご利用いただけます。":
    "5 cups · Use for any drink of your choice.",

  "デザート":
    "DESSERT",

  "日替わりデザート":
    "Daily dessert",

  "パンケーキ":
    "Pancakes",

  "ケーキセット":
    "Cake set",

  "店内メニューをご覧ください":
    "Please see our in-store menu.",

  "テイクアウト":
    "TAKE OUT",

  "コーヒー":
    "Coffee",

  "サンドイッチ":
    "Sandwich",

  "店舗情報":
    "Information",

  "愛媛県今治市常盤町4丁目8-18":
    "4-8-18 Tokiwa-cho, Imabari, Ehime",

  "しまなみイノベーションビル 2階":
    "Shimanami Innovation Building, 2F",

  "TEL：0898-11-2222":
    "TEL: 0898-11-2222",

  "営業時間：10:00～17:00":
    "Hours: 10:00 AM–5:00 PM",

  "駐車場":
    "Parking",

  "お車でお越しの際は、近隣のコインパーキングをご利用ください。":
    "If you arrive by car, please use a nearby coin-operated parking lot.",

  "お支払い方法":
    "Payment",

  "現金":
    "Cash",

  "各種クレジット":
    "Credit cards",

  "スマートフォンでご覧になる場合":
    "For smartphone access",

  "スマホでアクセス":
    "Open on your smartphone",

  "～愛媛県今治市・夫婦で営む小さな駅前カフェ～":
    "A small husband-and-wife café near Imabari Station, Ehime",

  "© 2026 SUNABA COFFEE":
    "© 2026 SUNABA COFFEE",

  "トップへ戻る":
    "Back to top",

  "TOPへ":
    "TOP"

};


/* ==================================================
   START
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupFixedHeader();

    setupLanguageSwitch();

    updateBusinessStatus();

    setupHeroSlideshow();

    setupMenuSlideshow();

    renderNews();

    setupTicketToggle();

    renderCalendar();

    setupCalendarButtons();

    setupCalendarSwipe();

    setupMobileMenu();

    setupScrollReveal();

    setupTopButton();

    setupQRCode();

    applyLanguage(currentLanguage);

  }
);


/* ==================================================
   FIXED HEADER
================================================== */

function setupFixedHeader() {

  const header =
    document.querySelector(
      ".site-header"
    );

  if (!header) {
    return;
  }


  function updateHeight() {

    const height =
      header.offsetHeight;

    document.documentElement.style
      .setProperty(
        "--header-height",
        `${height}px`
      );

  }


  updateHeight();


  if (
    typeof ResizeObserver !==
    "undefined"
  ) {

    const observer =
      new ResizeObserver(
        updateHeight
      );

    observer.observe(
      header
    );

  }

  else {

    window.addEventListener(
      "resize",
      updateHeight
    );

  }

}


/* ==================================================
   HOLIDAY
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
      currentLanguage === "en"
        ? "🔵 Closed today"
        : "🔵 本日は定休日";

    return;

  }


  const minutes =
    now.getHours() * 60 +
    now.getMinutes();


  if (
    minutes < OPEN_TIME
  ) {

    element.textContent =
      currentLanguage === "en"
        ? "⚪ Not open yet"
        : "⚪ 本日の営業前";

  }

  else if (
    minutes <
    CLOSE_TIME - 60
  ) {

    element.textContent =
      currentLanguage === "en"
        ? "🟢 Open"
        : "🟢 営業中";

  }

  else if (
    minutes < CLOSE_TIME
  ) {

    element.textContent =
      currentLanguage === "en"
        ? "🟡 Closing soon"
        : "🟡 まもなく終了";

  }

  else {

    element.textContent =
      currentLanguage === "en"
        ? "⚪ Closed for today"
        : "⚪ 本日の営業終了";

  }

}


/* ==================================================
   HERO SLIDESHOW
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


  if (
    currentLanguage === "en"
  ) {

    return date.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

  }


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
        event[currentLanguage].title;


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
        event[currentLanguage].detail;


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
    currentLanguage === "en"
      ? calendarDate.toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long"
          }
        )
      : `${year}年${month + 1}月`;


  calendar.innerHTML = "";


  const dayNames =
    currentLanguage === "en"
      ? [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ]
      : [
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
          currentLanguage === "en"
            ? `Closed · ${event.en.title}`
            : `定休日・${event.ja.title}`;

        info.classList.add(
          "calendar-holiday"
        );

      }

      else if (holiday) {

        info.textContent =
          currentLanguage === "en"
            ? "Closed"
            : "定休日";

        info.classList.add(
          "calendar-holiday"
        );

      }

      else {

        info.textContent =
          event[currentLanguage].title;

        info.classList.add(
          "calendar-event"
        );

      }


      if (event) {

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
   CALENDAR SWIPE
================================================== */

function setupCalendarSwipe() {

  const calendar =
    document.getElementById(
      "calendar"
    );

  if (!calendar) {
    return;
  }


  let startX = 0;


  calendar.addEventListener(
    "touchstart",
    event => {

      startX =
        event.changedTouches[0].clientX;

    },
    {
      passive: true
    }
  );


  calendar.addEventListener(
    "touchend",
    event => {

      const endX =
        event.changedTouches[0].clientX;

      const diff =
        endX - startX;


      if (
        Math.abs(diff) < 50
      ) {
        return;
      }


      if (diff < 0) {

        calendarDate.setMonth(
          calendarDate.getMonth() + 1
        );

      }

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
   STATIC TRANSLATION
================================================== */

function translateStaticText() {

  const walker =
    document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );


  const nodes = [];


  while (
    walker.nextNode()
  ) {

    nodes.push(
      walker.currentNode
    );

  }


  nodes.forEach(
    node => {

      if (
        !node.parentElement
      ) {
        return;
      }


      if (
        node.parentElement.closest(
          "script, style"
        )
      ) {
        return;
      }


      const original =
        node.textContent.trim();


      if (
        !original
      ) {
        return;
      }


      const translated =
        translations[original];


      if (
        currentLanguage === "en" &&
        translated
      ) {

        node.textContent =
          node.textContent.replace(
            original,
            translated
          );

      }

      else if (
        currentLanguage === "ja"
      ) {

        const japanese =
          Object.keys(
            translations
          ).find(
            key =>
              translations[key] ===
              original
          );


        if (japanese) {

          node.textContent =
            node.textContent.replace(
              original,
              japanese
            );

        }

      }

    }
  );

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

        currentLanguage = "ja";

        localStorage.setItem(
          "sunabaLanguage",
          "ja"
        );

        applyLanguage(
          "ja"
        );

      }
    );

  }


  if (en) {

    en.addEventListener(
      "click",
      () => {

        currentLanguage = "en";

        localStorage.setItem(
          "sunabaLanguage",
          "en"
        );

        applyLanguage(
          "en"
        );

      }
    );

  }

}


/* ==================================================
   APPLY LANGUAGE
================================================== */

function applyLanguage(
  language
) {

  currentLanguage =
    language;


  document.documentElement.lang =
    language;


  document.body.classList.toggle(
    "english",
    language === "en"
  );


  const ja =
    document.getElementById(
      "jaButton"
    );

  const en =
    document.getElementById(
      "enButton"
    );


  if (ja) {

    ja.classList.toggle(
      "active",
      language === "ja"
    );

  }


  if (en) {

    en.classList.toggle(
      "active",
      language === "en"
    );

  }


  translateStaticText();

  updateBusinessStatus();

  renderNews();

  renderCalendar();


  document.title =
    language === "en"
      ? "SUNABA COFFEE | Shimanami Kaido · Imabari Station"
      : "SUNABA COFFEE｜しまなみ海道・今治駅前";

}


/* ==================================================
   INITIAL LANGUAGE SAFETY
================================================== */

if (
  currentLanguage !== "ja" &&
  currentLanguage !== "en"
) {

  currentLanguage = "ja";

}
