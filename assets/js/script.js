function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("siteLanguage", lang);

  document.querySelectorAll("[data-de][data-en]").forEach(el => {
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return;
    el.innerHTML = lang === "de" ? el.dataset.de : el.dataset.en;
  });

  document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));

  const btn1 = document.getElementById(lang === "de" ? "lang-de" : "lang-en");
  const btn2 = document.getElementById(lang === "de" ? "lang-de-mobile" : "lang-en-mobile");

  if (btn1) btn1.classList.add("active");
  if (btn2) btn2.classList.add("active");

  const topic = document.getElementById("topic");
  if (topic) {
    const firstOption = topic.querySelector('option[value=""]');
    if (firstOption) {
      firstOption.textContent = lang === "de" ? "Bitte auswählen" : "Please select";
    }
  }
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("mobileOverlay");
  const toggle = document.getElementById("menuToggle");

  if (menu) menu.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  if (toggle) toggle.classList.remove("active");

  document.body.classList.remove("menu-open");
}

function openMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("mobileOverlay");
  const toggle = document.getElementById("menuToggle");

  if (menu) menu.classList.add("active");
  if (overlay) overlay.classList.add("active");
  if (toggle) toggle.classList.add("active");

  document.body.classList.add("menu-open");
}

function showPage(pageName) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));

  const targetPage = document.getElementById("page-" + pageName);
  if (targetPage) targetPage.classList.add("active");

  document.querySelectorAll(".nav-link[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  localStorage.setItem("activePage", pageName);
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-link[data-page]").forEach(link => {
  link.addEventListener("click", () => showPage(link.dataset.page));
});

document.getElementById("lang-de")?.addEventListener("click", () => setLanguage("de"));
document.getElementById("lang-en")?.addEventListener("click", () => setLanguage("en"));
document.getElementById("lang-de-mobile")?.addEventListener("click", () => setLanguage("de"));
document.getElementById("lang-en-mobile")?.addEventListener("click", () => setLanguage("en"));

const menuToggle = document.getElementById("menuToggle");
const mobileOverlay = document.getElementById("mobileOverlay");

menuToggle?.addEventListener("click", () => {
  if (document.getElementById("mobileMenu")?.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileOverlay?.addEventListener("click", closeMobileMenu);

const savedLang = localStorage.getItem("siteLanguage") || "de";
setLanguage(savedLang);

const savedPage = localStorage.getItem("activePage") || "who";
showPage(savedPage);

const cookieBanner = document.getElementById("cookieBanner");
const cookieModal = document.getElementById("cookieModal");
const cookieAccept = document.getElementById("cookieAccept");
const cookieReject = document.getElementById("cookieReject");
const cookieCustomize = document.getElementById("cookieCustomize");
const cookieSave = document.getElementById("cookieSave");
const cookieClose = document.getElementById("cookieClose");
const analyticsCookies = document.getElementById("analyticsCookies");

const savedCookieSettings = localStorage.getItem("cookieSettings");

if (savedCookieSettings && cookieBanner) {
  cookieBanner.style.display = "none";

  try {
    const parsed = JSON.parse(savedCookieSettings);
    if (analyticsCookies) analyticsCookies.checked = !!parsed.analytics;
  } catch {}
}

cookieAccept?.addEventListener("click", () => {
  localStorage.setItem("cookieSettings", JSON.stringify({ necessary: true, analytics: true }));
  if (cookieBanner) cookieBanner.style.display = "none";
  cookieModal?.classList.remove("active");
});

cookieReject?.addEventListener("click", () => {
  localStorage.setItem("cookieSettings", JSON.stringify({ necessary: true, analytics: false }));
  if (cookieBanner) cookieBanner.style.display = "none";
  cookieModal?.classList.remove("active");
});

cookieCustomize?.addEventListener("click", () => cookieModal?.classList.add("active"));
cookieClose?.addEventListener("click", () => cookieModal?.classList.remove("active"));

cookieSave?.addEventListener("click", () => {
  localStorage.setItem("cookieSettings", JSON.stringify({
    necessary: true,
    analytics: analyticsCookies ? analyticsCookies.checked : false
  }));

  if (cookieBanner) cookieBanner.style.display = "none";
  cookieModal?.classList.remove("active");
});

const impressumModal = document.getElementById("impressumModal");
const privacyModal = document.getElementById("privacyModal");
const agbModal = document.getElementById("agbModal");

document.getElementById("openImpressum")?.addEventListener("click", () => impressumModal?.classList.add("active"));
document.getElementById("openPrivacy")?.addEventListener("click", () => privacyModal?.classList.add("active"));
document.getElementById("openAGB")?.addEventListener("click", () => agbModal?.classList.add("active"));

document.querySelectorAll(".close-legal").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.target)?.classList.remove("active");
  });
});

[impressumModal, privacyModal, agbModal].forEach(modal => {
  modal?.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });
});

const teamStats = [
  { name: "VNGX Extended", points: 775, wins: 7, losses: 3, totalWins: 16 },
  { name: "VNGX NextGen", points: 0, wins: 0, losses: 0, totalWins: 0 },
  { name: "VNGX Origin", points: 775, wins: 7, losses: 3, totalWins: 11 },
  { name: "VNGX Rebirth", points: 600, wins: 5, losses: 4, totalWins: 6 },
  { name: "VNGX Omega", points: 375, wins: 3, losses: 3, totalWins: 14 },
  { name: "VNGX Riftborn", points: 325, wins: 1, losses: 9, totalWins: 2 },
  { name: "VNGX ONI", points: 425, wins: 3, losses: 5, totalWins: 8 },
  { name: "VNGX Quantum", points: 475, wins: 3, losses: 7, totalWins: 3 },
  { name: "VNGX Vision", points: 0, wins: 0, losses: 0, totalWins: 0 }
];

async function generateStoryImage() {
  const canvas = document.getElementById("storyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "#071325");
  bg.addColorStop(0.55, "#0a1126");
  bg.addColorStop(1, "#21122d");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.06)";

  for (let x = 0; x < canvas.width; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += 54) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const logo = new Image();
  logo.src = "assets/LogoVNGX.png";

  await new Promise((resolve) => {
    logo.onload = resolve;
    logo.onerror = resolve;
  });

  if (logo.complete && logo.naturalWidth > 0) {
    const logoWidth = 280;
    const ratio = logo.naturalHeight / logo.naturalWidth;
    const logoHeight = logoWidth * ratio;
    ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 50, logoWidth, logoHeight);
  }

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = "bold 52px Arial";
  ctx.fillText("VNGX TEAM STATS", canvas.width / 2, 270);

  ctx.font = "26px Arial";
  ctx.fillStyle = "#8fe9ff";
  ctx.fillText("Saison 2026 • V26: A2", canvas.width / 2, 320);

  const cardX = 60;
  const cardW = canvas.width - 120;
  const startY = 380;
  const rowH = 150;
  const radius = 26;

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  teamStats.forEach((team, index) => {
    const y = startY + index * (rowH + 14);

    const cardGradient = ctx.createLinearGradient(cardX, y, cardX + cardW, y + rowH);
    cardGradient.addColorStop(0, "rgba(127,233,255,0.08)");
    cardGradient.addColorStop(1, "rgba(255,120,218,0.08)");

    roundRect(cardX, y, cardW, rowH, radius);
    ctx.fillStyle = cardGradient;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.font = "bold 30px Arial";

    const gradient = ctx.createLinearGradient(cardX + 28, y, cardX + 300, y);
    gradient.addColorStop(0, "#7fe9ff");
    gradient.addColorStop(1, "#ff78da");

    ctx.fillStyle = gradient;
    ctx.fillText(team.name, cardX + 28, y + 40);

    const statsY = y + 74;
    const boxW = 215;
    const gap = 16;

    const boxes = [
      { label: "Punkte", value: team.points },
      { label: "Wins", value: team.wins },
      { label: "Losses", value: team.losses },
      { label: "Gesamt Wins", value: team.totalWins }
    ];

    boxes.forEach((box, i) => {
      const bx = cardX + 28 + i * (boxW + gap);

      roundRect(bx, statsY, boxW, 50, 16);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px Arial";
      ctx.fillText(String(box.value), bx + boxW / 2, statsY + 22);

      ctx.fillStyle = "#c4cad6";
      ctx.font = "14px Arial";
      ctx.fillText(box.label.toUpperCase(), bx + boxW / 2, statsY + 40);
    });
  });

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "24px Arial";
  ctx.fillText("VNGX • Valorant Esport", canvas.width / 2, 1860);

  const link = document.createElement("a");
  link.download = "VNGX-Teamstats-Story.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

const generateStoryBtn = document.getElementById("generateStoryBtn");
generateStoryBtn?.addEventListener("click", generateStoryImage);

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitContactBtn = document.getElementById("submitContactBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    formStatus.className = "form-status";
    formStatus.textContent = "";

    const currentLang = localStorage.getItem("siteLanguage") || "de";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      company: document.getElementById("company").value.trim(),
      topic: document.getElementById("topic").value,
      message: document.getElementById("message").value.trim(),
      _subject: "VNGX Kooperationsanfrage",
      _template: "table"
    };

    submitContactBtn.disabled = true;
    submitContactBtn.textContent = currentLang === "de" ? "Wird gesendet..." : "Sending...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@jayyvong.de", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("request_failed");

      formStatus.className = "form-status success";
      formStatus.textContent = currentLang === "de"
        ? "Deine Anfrage wurde erfolgreich abgeschickt."
        : "Your request was sent successfully.";

      contactForm.reset();
    } catch (error) {
      formStatus.className = "form-status error";
      formStatus.textContent = currentLang === "de"
        ? "Die Anfrage konnte gerade nicht abgeschickt werden. Bitte versuche es später erneut."
        : "The request could not be sent right now. Please try again later.";
    } finally {
      submitContactBtn.disabled = false;
      submitContactBtn.textContent = currentLang === "de" ? "Anfrage abschicken" : "Send request";
    }
  });
}
