/* =========================================
   SINADO NNN CHAMPION
   KHMER FUNNY EDITION 😂👑
========================================= */

/* 1. BACKGROUND STARS */

const starsContainer = document.getElementById("stars");

if (starsContainer) {
  for (let i = 0; i < 70; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 3 + "s";

    starsContainer.appendChild(star);
  }
}

/* 2. MUSIC PLAYER 🎵 */

const music = document.getElementById("background-music");

const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

const progressBar = document.getElementById("music-progress");
const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");

function formatTime(time) {
  if (!Number.isFinite(time)) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

if (music && playButton && pauseButton) {
  music.loop = true;

  // ចុច Play ដើម្បីចាប់ផ្ដើមតន្ត្រី
  playButton.addEventListener("click", async () => {
    try {
      await music.play();
    } catch (error) {
      console.error("Music playback error:", error);

      alert("មិនអាចចាក់តន្ត្រីបានទេ! សូមពិនិត្យទីតាំង MP3 របស់អ្នក។");
    }
  });

  // ចុច Pause ដើម្បីផ្អាកតន្ត្រី
  pauseButton.addEventListener("click", () => {
    music.pause();
  });

  // បង្ហាញរយៈពេលបទចម្រៀង
  music.addEventListener("loadedmetadata", () => {
    durationText.textContent = formatTime(music.duration);
  });

  // Update Music Progress
  music.addEventListener("timeupdate", () => {
    if (Number.isFinite(music.duration) && music.duration > 0) {
      const progress = (music.currentTime / music.duration) * 100;

      progressBar.style.width = progress + "%";

      currentTimeText.textContent = formatTime(music.currentTime);

      durationText.textContent = formatTime(music.duration);
    }
  });

  // Music Playing
  music.addEventListener("play", () => {
    playButton.innerHTML = '<i class="fa-solid fa-music"></i>';
  });

  // Music Paused
  music.addEventListener("pause", () => {
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
  });
}

/* 3. COUNTDOWN */

const targetDate = new Date("2026-12-01T00:00:00");

function updateCountdown() {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  const now = new Date();

  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  daysElement.textContent = String(days).padStart(2, "0");

  hoursElement.textContent = String(hours).padStart(2, "0");

  minutesElement.textContent = String(minutes).padStart(2, "0");

  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* 4. CALENDAR PROGRESS */

function generateCalendar() {
  const calendarGrid = document.getElementById("calendar-grid");

  const calendarMonth = document.getElementById("calendar-month");

  if (!calendarGrid || !calendarMonth) {
    return;
  }

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  const monthName = today.toLocaleString("en-US", {
    month: "long",
  });

  calendarMonth.textContent = `${monthName} ${year}`;

  calendarGrid.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ឈ្មោះថ្ងៃក្នុងសប្ដាហ៍
  dayNames.forEach((day) => {
    const dayElement = document.createElement("div");

    dayElement.className = "calendar-day-name";
    dayElement.textContent = day;

    calendarGrid.appendChild(dayElement);
  });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // ប្រអប់ទទេមុនថ្ងៃដំបូង
  for (let i = 0; i < firstDay; i++) {
    const emptyElement = document.createElement("div");

    emptyElement.className = "calendar-date empty";

    calendarGrid.appendChild(emptyElement);
  }

  // បង្កើតថ្ងៃទាំងអស់ក្នុងខែ
  for (let day = 1; day <= daysInMonth; day++) {
    const dateElement = document.createElement("div");

    dateElement.className = "calendar-date";
    dateElement.textContent = day;

    if (day < today.getDate()) {
      dateElement.classList.add("past");
    }

    if (day === today.getDate()) {
      dateElement.classList.add("today");
    }

    calendarGrid.appendChild(dateElement);
  }
}

generateCalendar();

/* 5. PHOTO GALLERY LIGHTBOX */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxClose = document.getElementById("lightbox-close");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");

    if (!image || !lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("active");

  lightboxImage.src = "";

  document.body.style.overflow = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

// ចុច ESC ដើម្បីបិទរូបភាព
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/* 6. KHMER FUNNY QUOTES 😂 */

const quotes = [
  {
    text: "គិតថាឈ្នះ​ challenge ហើយគេមកវិញមែន 😂",
    author: " SINADO",
  },

  {
    text: "ស្រឡាញ់ទាំងអស់​ ស្មោះតែមួយ 🥰😇",
    author: " ពីបុរសស្មោះស្នេហ៍",
  },

  {
    text: "យកប្រពន្ធអោយលឿនៗទៅអញចាំធ្វើកួនកំដរអោយលុយអោយច្រើនផង។ 🥱",
    author: "​ លុយសុទ្ធ",
  },

  {
    text: "កុំខំរៀនពេកប្រយ័ត្នឆ្កួត​ ការងារក្រុមទុកអោយគេធ្វើទៅបានពិន្ទុស្មើរគ្នាសោះ 😂",
    author: " IQ",
  },

  {
    text: "ច័ន្ទ-សុក្រស្រីស្អាតឡើងច្រើនហើយនាំសៅរ៏-អាទិត្យទៀតក្ដីសុខមិចទៅ 😩",
    author: " ក្ដីសុខផ្លូវចិត្ដ",
  },

  {
    text: "កុំសួរអញមិចហើយជីវិត អញជិតឆ្កួតហើយ​​ 🙂‍",
    author: " ដើរតាសើច",
  },

  {
    text: "ស្អែកចាំចាប់ផ្ដើម ថ្ងៃនេះសុំសម្រាកសិន 😴",
    author: " មនុស្សមានផែនការ",
  },

  {
    text: "ជីវិតជាការតស៊ូ បើងុយដេកទៅអញដេកដែរនិង​ 😴",
    author: " មេរៀនេជីវិត",
  },

  {
    text: "រឿងពិបាកបំផុតគឺទូរស័ព្ទអស់លុយកណ្ដាលយប់ 😂",
    author: " បទពិសោធន៍ដ៏ឈឺចាប់",
  },

  {
    text: "គ្រប់បញ្ហាទាំងអស់គឺមានផ្លូវចេញ ចេញទៅទិញស្រាផឹក 😷",
    author: " អញផឹកដែរ",
  },

  {
    text: "ខ្ញុំមានផែនការច្រើនណាស់ តែបញ្ហាគឺខ្ញុំមិនទាន់ចាប់ផ្ដើម 😎",
    author: " មានមហិច្ឆតា",
  },

  {
    text: "ការសិក្សាធ្វើឱ្យយើងមានចំណេះដឹង តែការគេងធ្វើឱ្យយើងមានកម្លាំង 😴",
    author: " អ្នកឆ្លាតដឹងហើយថាគួរយកមួយណា",
  },

  {
    text: "មនុស្សគ្រប់គ្នាមានសិទ្ធិសម្រាក តែខ្ញុំហាក់ដូចជាប្រើសិទ្ធិលើសកំណត់ 😂",
    author: " ដេកសំខាន់ជាង",
  },

  {
    text: "កុំសប្បាយភ្លេចខ្លូន អ្នកអាចភ្លេចអេដស៏តែអេដស៏មិនភ្លេចអ្នកទេ ☠️",
    author: " មនុស្សពេញវ័យ",
  },

  {
    text: "ខ្ញុំទៅរៀនមិនយឺតទេ គ្រាន់តែមកដល់តាមម៉ោងផ្ទាល់ខ្លួន ⏰",
    author: " គោរពពេលវេលា",
  },

  {
    text: "CV ដាក់សុទ្ធតែ Good Teamwork តែAssignmentsធ្វើតែម្នាក់ដាក់ឈ្មោះ5នាក់ 😂",
    author: " Good Teamwork",
  },

  {
    text: "ជីវិតដឹងកាលបានភ្លឺស្វាងតេ មើលទៅមានតែស្រាតេអាចជួយបាន 😎",
    author: " ភ្លឺស្វាង",
  },

  {
    text: "ស្រឡាញ់មនុស្សម្នាក់មិនបាច់យកគេទេ ត្រឹមឃើញគេវេទនាមួយអ្នកដ៏ទៃក៏បានដែរ 😍",
    author: " អត្ថន័យស្នេហ៍",
  },

  {
    text: "តាំងពីតូចដល់ឡូវស្រឡាញ់គេខ្លាំងបានម្ដងច្រលំបោកគេទៀត 😔",
    author: " បោកព្រោះស្រឡាញ់",
  },

  {
    text: "លុយក្នុងកុងសន្សំទុកអោយច្រើនៗទៅស្រួលអញខ្ចី ☺️",
    author: " អញជិតដាច់លុយហើយ",
  },
];

const quoteText = document.getElementById("quote-text");

const quoteAuthor = document.getElementById("quote-author");

const nextQuoteButton = document.getElementById("next-quote");

let currentQuoteIndex = -1;

function showRandomQuote() {
  if (!quoteText || !quoteAuthor) {
    return;
  }

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === currentQuoteIndex && quotes.length > 1);

  currentQuoteIndex = randomIndex;

  quoteText.style.opacity = "0";

  setTimeout(() => {
    quoteText.textContent = quotes[randomIndex].text;

    quoteAuthor.textContent = quotes[randomIndex].author;

    quoteText.style.opacity = "1";
  }, 200);
}

if (nextQuoteButton) {
  nextQuoteButton.addEventListener("click", showRandomQuote);
}

// បង្ហាញឃ្លាកំប្លែងដោយចៃដន្យនៅពេលបើក Website
showRandomQuote();

/* 7. CELEBRATION CONFETTI 🎉 */

const celebrateButton = document.getElementById("celebrate-button");

if (celebrateButton) {
  celebrateButton.addEventListener("click", () => {
    const symbols = ["✨", "⭐", "👑", "🎉", "💛", "😂"];

    for (let i = 0; i < 70; i++) {
      const confetti = document.createElement("span");

      confetti.className = "confetti";

      confetti.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      confetti.style.left = Math.random() * 100 + "vw";

      confetti.style.fontSize = 12 + Math.random() * 20 + "px";

      const duration = 2 + Math.random() * 3;

      confetti.style.animationDuration = duration + "s";

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }

    // ប្ដូរឃ្លាកំប្លែងនៅពេល Celebrate
    showRandomQuote();
  });
}

/* 8. SMOOTH NAVIGATION */

document
  .querySelectorAll(".navbar nav a, .hero-buttons a, .footer-social a")
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

/* 9. STOP MUSIC WHEN LEAVING WEBSITE */

window.addEventListener("pagehide", () => {
  if (music) {
    music.pause();
  }
});

/* 10. WEBSITE LOADED */

console.log("👑 SINADO NNN CHAMPION WEBSITE LOADED!");

console.log("😂 Khmer Funny Edition Activated!");
