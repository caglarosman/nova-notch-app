const SHOTS = ["02-assistant", "09-live-music", "03-calendar", "04-weather", "05-focus", "06-shelf", "07-clipboard", "08-eyes", "10-airpods"];

const T = {
  en: {
    "nav.features": "Features", "nav.privacy": "Privacy", "nav.support": "Support",
    "hero.title": "Your Mac's notch,<br>reimagined.",
    "hero.lead": "Music, calendar, weather, files, clipboard, focus timers and an Apple Intelligence assistant — all living in the notch.",
    "hero.req": "Free · macOS 14 Sonoma or later · Apple Silicon · Signed &amp; notarized by Apple",
    "cta.download": "Download for Mac", "cta.coffee": "Buy me a coffee",
    "install.title": "Get started in seconds",
    "install.1": "Download <b>Nova.dmg</b> and open it.",
    "install.2": "Drag Nova into your Applications folder.",
    "install.3": "Launch Nova — it lives in the notch and the menu bar.",
    "install.note": "Apple Intelligence features require a Mac that supports Apple Intelligence with it turned on.",
    "footer.releases": "Releases", "footer.feedback": "Feedback",
    "footer.fine": "Mac, macOS and Apple Intelligence are trademarks of Apple Inc. Nova is not affiliated with Apple.",
    shots: {
      "02-assistant": ["Ask Nova anything.", "A built-in assistant that works with Apple Intelligence on supported Macs."],
      "09-live-music": ["Music, even when it's closed.", "Album art, a live equalizer and optional lyrics right under the notch."],
      "03-calendar": ["Always know what's next.", "Upcoming events and countdowns at a glance."],
      "04-weather": ["Weather at a glance.", "Current conditions and the hourly forecast, without opening an app."],
      "05-focus": ["Stay in the zone.", "Focus sessions, breaks and ambient sounds, built in."],
      "06-shelf": ["A shelf for your files.", "Drop files on the notch, then drag them wherever you need."],
      "07-clipboard": ["Clipboard history, instantly.", "Find and reuse anything you've copied."],
      "08-eyes": ["A companion in your notch.", "When nothing's going on, Nova's eyes keep you company — and react to what you're doing."],
      "10-airpods": ["Know what just happened.", "Headphone connections, charging and battery alerts appear briefly in the notch."]
    }
  },
  tr: {
    "nav.features": "Özellikler", "nav.privacy": "Gizlilik", "nav.support": "Destekle",
    "hero.title": "Mac'inin notch'u,<br>yeniden tasarlandı.",
    "hero.lead": "Müzik, takvim, hava durumu, dosyalar, pano, odak zamanlayıcısı ve Apple Intelligence asistanı — hepsi notch'ta.",
    "hero.req": "Ücretsiz · macOS 14 Sonoma veya üstü · Apple Silicon · Apple tarafından imzalı ve onaylı",
    "cta.download": "Mac için indir", "cta.coffee": "Bir kahve ısmarla",
    "install.title": "Saniyeler içinde başla",
    "install.1": "<b>Nova.dmg</b> dosyasını indir ve aç.",
    "install.2": "Nova'yı Uygulamalar klasörüne sürükle.",
    "install.3": "Nova'yı başlat — notch'ta ve menü çubuğunda yaşar.",
    "install.note": "Apple Intelligence özellikleri, Apple Intelligence destekleyen ve bu özelliği açık olan bir Mac gerektirir.",
    "footer.releases": "Sürümler", "footer.feedback": "Geri bildirim",
    "footer.fine": "Mac, macOS ve Apple Intelligence, Apple Inc.'in ticari markalarıdır. Nova, Apple ile bağlantılı değildir.",
    shots: {
      "02-assistant": ["Nova'ya her şeyi sor.", "Desteklenen Mac'lerde Apple Intelligence ile çalışan yerleşik asistan."],
      "09-live-music": ["Kapalıyken bile müzik.", "Albüm kapağı, canlı ekolayzer ve isteğe bağlı şarkı sözleri notch'un hemen altında."],
      "03-calendar": ["Sırada ne var, hep bil.", "Yaklaşan etkinlikler ve geri sayımlar tek bakışta."],
      "04-weather": ["Hava durumu, tek bakışta.", "Anlık durum ve saatlik tahmin, uygulama açmadan."],
      "05-focus": ["Odağını koru.", "Odak seansları, molalar ve ortam sesleri tek yerde."],
      "06-shelf": ["Dosyaların için bir raf.", "Dosyaları notch'a bırak, sonra istediğin yere sürükle."],
      "07-clipboard": ["Pano geçmişi, anında.", "Kopyaladığın her şeyi bul ve yeniden kullan."],
      "08-eyes": ["Notch'ta bir arkadaş.", "Ortalık sakinken Nova'nın gözleri sana eşlik eder ve yaptıklarına tepki verir."],
      "10-airpods": ["Ne olduğunu anında gör.", "Kulaklık bağlantıları, şarj ve pil uyarıları kısa süreliğine notch'ta belirir."]
    }
  }
};

function render(lang) {
  const t = T[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = t[el.dataset.i18n];
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll("[data-shot]").forEach(img => {
    img.src = `assets/shots/${lang}/${img.dataset.shot}.jpg`;
  });
  const video = document.getElementById("demo");
  if (video) {
    const src = `assets/video/nova-demo-${lang}.mp4`;
    if (!video.currentSrc.endsWith(src)) {
      video.poster = `assets/video/poster-${lang}.jpg`;
      video.querySelector("source").src = src;
      video.load();
      if (!reduceMotion) video.play().catch(() => {});
    }
  }
  const features = document.getElementById("features");
  if (features) {
    features.innerHTML = SHOTS.map(id => `
      <article class="feature">
        <div class="copy"><h2>${t.shots[id][0]}</h2><p>${t.shots[id][1]}</p></div>
        <img loading="lazy" src="assets/shots/${lang}/${id}.jpg" alt="${t.shots[id][0]}">
      </article>`).join("");
  }
  const btn = document.getElementById("lang");
  if (btn) btn.textContent = lang === "en" ? "TR" : "EN";
  localStorage.setItem("lang", lang);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const demo = document.getElementById("demo");
const vtoggle = document.getElementById("vtoggle");
function syncToggle() {
  if (!demo || !vtoggle) return;
  vtoggle.textContent = demo.paused ? "▶" : "❚❚";
  vtoggle.setAttribute("aria-label", demo.paused ? "Play video" : "Pause video");
}
if (demo) {
  if (reduceMotion) { demo.removeAttribute("autoplay"); demo.pause(); }
  demo.addEventListener("play", syncToggle);
  demo.addEventListener("pause", syncToggle);
  vtoggle?.addEventListener("click", () => demo.paused ? demo.play() : demo.pause());
}

const saved = localStorage.getItem("lang");
let lang = saved || ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en");
document.getElementById("lang")?.addEventListener("click", () => { lang = lang === "en" ? "tr" : "en"; render(lang); });
document.getElementById("y") && (document.getElementById("y").textContent = new Date().getFullYear());
render(lang);
