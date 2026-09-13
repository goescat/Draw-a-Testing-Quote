const QUOTES = [
  {
    quote: "Testing shows the presence, not the absence of bugs.",
    translation: "測試可以證明 Bug 存在，卻不能證明 Bug 不存在。",
    source: "Edsger W. Dijkstra"
  },
  {
    quote: "It works on my machine.",
    translation: "在我的機器上可以正常運作。",
    source: "Every developer, at least once"
  },
  {
    quote: "Quality is everyone's responsibility.",
    translation: "品質是每個人的責任。",
    source: "W. Edwards Deming"
  },
  {
    quote: "It's not a bug, it's a feature.",
    translation: "這不是 Bug，這是 Feature。",
    source: "Every developer, when cornered"
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    translation: "簡單是可靠性的前提。",
    source: "Edsger W. Dijkstra"
  },
  {
    quote: "The requirements were clear. Until we implemented them.",
    translation: "需求很清楚，直到我們開始實作。",
    source: "Every software project"
  },
  {
    quote: "There's no place like 127.0.0.1.",
    translation: "在家睡覺最好（？）",
    source: "Programmer folklore"
  },
  {
    quote: "The best code is no code at all.",
    translation: "最好的程式碼，就是根本不存在的程式碼。",
    source: "Jeff Atwood"
  },
  {
    quote: "Works perfectly in staging.",
    translation: "在 Staging 完美運作。",
    source: "Production's favorite joke"
  },
  {
    quote: "The bug wasn't reproducible. Until the demo.",
    translation: "這個 Bug 無法重現，直到 Demo 的那一刻。",
    source: "Murphy's Law"
  }
];

function escapeXML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function fontSize(text) {
  if (text.length <= 40) return 27;
  if (text.length <= 60) return 24;
  if (text.length <= 80) return 21;
  return 18;
}

function translationFontSize(text) {
  if (text.length <= 18) return 17;
  if (text.length <= 28) return 15;
  return 13;
}

function createSVG({ quote, translation, source }) {
  return `<svg width="700" height="220"
    viewBox="0 0 700 220"
    xmlns="http://www.w3.org/2000/svg">

  <rect width="700"
        height="220"
        rx="16"
        fill="#e0e4eaff"/>

  <text x="350"
        y="42"
        text-anchor="middle"
        fill="#8B949E"
        font-family="Arial, Helvetica, sans-serif"
        font-size="13"
        font-weight="700"
        letter-spacing="3">
    TESTING QUOTE OF THE DAY
  </text>

  <text x="350"
        y="94"
        text-anchor="middle"
        fill="#45586cff"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${fontSize(quote)}"
        font-weight="600">
    “${escapeXML(quote)}”
  </text>

  <text x="350"
        y="128"
        text-anchor="middle"
        fill="#8B949E"
        font-family="Arial, 'Noto Sans TC', sans-serif"
        font-size="${translationFontSize(translation)}">
    ${escapeXML(translation)}
  </text>

  <text x="350"
        y="165"
        text-anchor="middle"
        fill="#8B949E"
        font-family="Arial, Helvetica, sans-serif"
        font-size="14">
    — ${escapeXML(source)}
  </text>

</svg>`;
}

export default {
  async fetch(request) {

    const item =
      QUOTES[Math.floor(Math.random() * QUOTES.length)];

    const svg = createSVG(item);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};
