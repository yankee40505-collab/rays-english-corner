/* ============================================================
   Ray's English Corner — 全站共用腳本
   ------------------------------------------------------------
   維護重點：
   1. 改導覽列 → 只改下面的 NAV_ITEMS 陣列
   2. 改頁尾   → 只改 renderFooter() 裡的文字
   每一頁只要：
     <head> 放 <link rel="stylesheet" href="styles.css">
     <body> 放 <div id="site-nav"></div> （取代原本整段 <nav>）
     結尾放 <div id="site-footer"></div> 和 <script src="main.js"></script>
   ============================================================ */

/* ---------- 1. 導覽列資料（唯一要改的地方）---------- */
const NAV_ITEMS = [
  { label: '關於 Ray',  href: 'index.html#about' },
  { label: '課程',      href: 'index.html#courses' },
  {
    label: '私校專區',
    children: [
      { label: 'NBA Finals G1 Video', href: 'nba-finals-u5.html' },
      { label: 'NBA Finals G1 NEWS',  href: 'nba-section-v3.html' },
      { label: '分詞構句',            href: 'participle-clauses.html' },
      { label: 'NBA Finals G4 NEWS', href: 'nba-finals-g4.html' },
    ],
  },
  { label: '教學經歷',  href: 'experience.html' },
  {
    label: '文法',
  children: [
      { label: '文法 國二U5', href: 'grammar-u5.html' },
      { label: '文法 國二U6', href: 'grammar-g2u6.html' },
      { label: '文法 國一U6', href: 'grammar-u6.html' },
      { label: '文法 國一U5', href: 'grammar-g1-u5.html' },
    ],
  },
  { label: '線上練習',  href: 'practice.html' },
  { label: '聯絡我',    href: 'index.html#contact' },
];

/* ---------- 2. 產生並注入導覽列 ---------- */
function renderNav() {
  const mount = document.getElementById('site-nav');
  if (!mount) return;

  // 目前在哪一頁（用來標記 active）
  const current = location.pathname.split('/').pop() || 'index.html';

  const linksHtml = NAV_ITEMS.map(item => {
    if (item.children) {
      const sub = item.children.map(c =>
        `<a href="${c.href}">${c.label}</a>`
      ).join('');
      return `
        <li class="dropdown">
          <a href="javascript:void(0)">${item.label} ▾</a>
          <div class="dropdown-content">${sub}</div>
        </li>`;
    }
    // 一般連結：比對檔名標記 active（錨點連結取 # 前的檔名）
    const file = item.href.split('#')[0];
    const isActive = file === current ? ' class="active"' : '';
    return `<li><a href="${item.href}"${isActive}>${item.label}</a></li>`;
  }).join('');

  mount.outerHTML = `
    <nav>
      <a href="index.html" class="nav-logo">Ray's <span class="dot">·</span> English Corner</a>
      <ul class="nav-links">${linksHtml}</ul>
    </nav>`;
}

/* ---------- 3. 產生並注入頁尾 ---------- */
function renderFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  const year = new Date().getFullYear();
  mount.outerHTML = `
    <footer>
      <div class="f-logo">Ray's <span>English</span> Corner</div>
      <p>新北市 · 國小 · 國中 · 高中英文 · 一對一家教 · 線上教學 · 補習班授課</p>
      <p style="margin-top:6px;font-size:.8rem;">© ${year} Ray's English Corner · 雷康誠老師 · 0958-938-383</p>
    </footer>`;
}

/* ---------- 4. 共用：捲動淡入 reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .sr');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible', 'vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

/* ---------- 5. 共用：點擊發音（Web Speech API）---------- */
function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } else {
    alert('你的瀏覽器不支援發音功能，請嘗試使用最新版的 Chrome 或 Safari。');
  }
}

function initSpeak() {
  // (a) 有 data-speak 屬性的元素，直接唸屬性內容
  document.querySelectorAll('[data-speak]').forEach(el => {
    el.addEventListener('click', () => speakWord(el.dataset.speak));
  });
  // (b) .word-eng 元素，唸純文字（避開 .word-pos 詞性標籤）
  document.querySelectorAll('.word-eng').forEach(el => {
    if (el.hasAttribute('data-speak')) return; // 已被 (a) 處理
    el.addEventListener('click', () => {
      let word = '';
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) word += node.textContent.trim();
      }
      if (word) speakWord(word);
    });
  });
}

/* ---------- 6. 共用：展開/收合卡片 ---------- */
function toggleCard(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

/* ---------- 7. 啟動 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initReveal();
  initSpeak();
});
