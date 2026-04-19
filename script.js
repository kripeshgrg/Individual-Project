const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const themeToggle = document.getElementById("themeToggle");

let manualThemeOverride = false;

// HEADER SCROLL + ACTIVE NAV
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  },
  { passive: true }
);

// MOBILE MENU
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
  });
});

// FOOTER YEAR
if (year) {
  year.textContent = new Date().getFullYear();
}

// CONTACT FORM TO EMAIL
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const subject = document.getElementById("subject")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    const emailSubject = encodeURIComponent(subject || "Portfolio Contact Form Message");
    const emailBody = encodeURIComponent(
      `Name: ${name}
Email: ${email}

Message:
${message}`
    );

    window.location.href = `mailto:Kripesh.gurung@westcliff.edu?subject=${emailSubject}&body=${emailBody}`;

    contactForm.reset();
  });
}

// AUTO THEME BASED ON USER TIME
function setThemeByUserTime() {
  if (manualThemeOverride) return;

  const now = new Date();
  const hour = now.getHours();

  // 6am to 5:59pm => light
  if (hour >= 6 && hour < 18) {
    document.body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
}

// MANUAL THEME TOGGLE
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    manualThemeOverride = true;
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  });
}

// CLOCKS
function updateClocks() {
  const now = new Date();

  // LOCAL TIME
  const localTimeEl = document.getElementById("localTime");
  if (localTimeEl) {
    localTimeEl.textContent = now.toLocaleTimeString();
  }

  // USER TIMEZONE
  const timezoneEl = document.getElementById("userTimezone");
  if (timezoneEl) {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezoneEl.textContent = timezone.replace(/_/g, " ");
    } catch (error) {
      timezoneEl.textContent = "Local Time";
    }
  }

  // NEPAL TIME (UTC +5:45)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nepalDate = new Date(utc + 5.75 * 60 * 60 * 1000);

  const nepalTimeEl = document.getElementById("nepalTime");
  if (nepalTimeEl) {
    nepalTimeEl.textContent = nepalDate.toLocaleTimeString();
  }
}

// INITIAL RUN
setThemeByUserTime();
updateClocks();

// INTERVALS
setInterval(updateClocks, 1000);
setInterval(setThemeByUserTime, 60000);