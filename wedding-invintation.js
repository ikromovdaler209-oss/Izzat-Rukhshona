/* ---------- Тексты (русский / узбекский) ---------- */
const T = {
  ru: {
    tap: "Нажмите, чтобы открыть", lead: "Приглашаем вас на свадьбу наших детей",
    invite: "Дорогие родные и друзья! Будем счастливы видеть вас на нашем свадебном торжестве.",
    date: "31 октября 2026", start: "Начать историю", ph: "Здесь будет ваше фото",
    until: "До свадьбы", days: "дней", hours: "часов", mins: "минут", secs: "секунд",
    month: "Октябрь 2026", at: "Свадьба в 18:00", where: "Место проведения",
    yandex: "Яндекс Карты", google: "Google Maps", thanks: "Спасибо!",
    thx2: "С нетерпением ждём возможности отметить этот долгожданный день вместе с вами.",
    regards: "С любовью и уважением", sign: '<span>Семья Турсуновых</span><span class="and">&amp;</span><span>Сафаевых</span>',
    wd: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  },
  uz: {
    tap: "Ochish uchun bosing", lead: "FArzandlarimizni nikoh toʻyiga taklif qulamiz",
    invite: "Aziz yaqinlarimiz va doʻstlarimiz! Sizni toʻyimizda koʻrsak xursand boʻlamiz.",
    date: "31 oktyabr 2026", start: "Hikoyani boshlash", ph: "Bu yerda sizning suratingiz boʻladi",
    until: "Toʻygacha", days: "kun", hours: "soat", mins: "daqiqa", secs: "soniya",
    month: "Oktyabr 2026", at: "Toʻy soat 18:00 da", where: "Toʻy oʻtkaziladigan joy",
    yandex: "Yandeks xarita", google: "Google Maps", thanks: "Rahmat!",
    thx2: "Bu kunni siz bilan birga nishonlashni intiqlik bilan kutamiz.",
    regards: "Mehr va hurmat bilan", sign: '<span>Tursunovlar</span><span class="and">&amp;</span><span>Safayevlar oilasi</span>',
    wd: ["Du", "Se", "Chor", "Pay", "Ju", "Sha", "Yak"]
  }
};

let lang = "ru";

function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i]").forEach(el => {
   el.innerHTML = T[lang][el.dataset.i];
  });
  // календарь: октябрь 2026 начинается с четверга (3 пустые клетки при неделе с понедельника)
  const days = Array.from({ length: 31 }, (_, k) =>
    `<div class="d${k === 30 ? " me" : ""}">${k + 1}</div>`).join("");
  document.getElementById("cal").innerHTML =
    T[lang].wd.map(w => `<i>${w}</i>`).join("") + "<span></span>".repeat(3) + days;
  document.querySelectorAll(".lang button").forEach(b =>
    b.setAttribute("aria-pressed", b.dataset.l === lang));
}

document.querySelectorAll(".lang button").forEach(b => {
  b.addEventListener("click", () => { lang = b.dataset.l; render(); });
});
render();

/* ---------- Плавное появление блоков ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

document.querySelectorAll(".reveal:not(.hero-r)").forEach(el => io.observe(el));

/* ---------- Конверт ---------- */
const env = document.getElementById("env");
let opened = false;

function openEnvelope() {
  if (opened) return;
  opened = true;
  env.classList.add("open");
  setTimeout(() => {
    document.body.classList.remove("locked");
    document.querySelectorAll(".hero-r").forEach(el => el.classList.add("in"));
  }, 1300);
  setTimeout(() => env.remove(), 3200);
}
env.addEventListener("click", openEnvelope);
env.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
});

/* ---------- Обратный отсчёт до 31.10.2026, 18:00 ---------- */
const target = new Date(2026, 9, 31, 18, 0, 0);

function tick() {
  const t = Math.max(0, target - new Date());
  const v = {
    d: Math.floor(t / 864e5),
    h: Math.floor(t / 36e5) % 24,
    m: Math.floor(t / 6e4) % 60,
    s: Math.floor(t / 1e3) % 60
  };
  for (const k in v) document.getElementById(k).textContent = v[k];
}
tick();
setInterval(tick, 1000);