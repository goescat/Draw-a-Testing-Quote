# Draw-a-Testing-Quote

我在 goescat/README.md 裡放的本日金句，效果如下：
<img src="https://testing-quotes.goescat1024.workers.dev/" width="500">

Cloudflare Worker 可以把一小段 JavaScript 部署成一個 HTTP endpoint。

適合用來做一些不需要自己架 Server 的小型後端，例如：
* API
* 動態產生 SVG
* Webhook
* Redirect
* 小型資料處理

## 建立 Worker

進入 Cloudflare Dashboard：
Workers & Pages → Create → Worker

建立後可以直接在 Cloudflare 的線上 Editor 編輯程式。

不需要自己準備 Server、VM、Docker、Nginx、Domain，Deploy 後 Cloudflare 會提供一個：

` https://<worker-name>.<subdomain>.workers.dev `

的網址。

## 最基本的 Worker

Worker 最核心的概念就是：
```
export default {
  async fetch(request) {
    return new Response("Hello World!");
  }
};
```

每次有人 request Worker：

```
HTTP Request
     ↓
fetch(request)
     ↓
Response
```
## 回傳 SVG

如果希望瀏覽器把 Response 當成 SVG：

```
const svg = `
<svg width="700" height="220"
     xmlns="http://www.w3.org/2000/svg">

  <rect
    width="700"
    height="220"
    fill="#0D1117"
  />

  <text
    x="350"
    y="110"
    text-anchor="middle"
    fill="white"
  >
    Hello SVG
  </text>

</svg>
`;

return new Response(svg, {
  headers: {
    "Content-Type": "image/svg+xml; charset=utf-8"
  }
});
```

打開 Worker URL：

https://example.workers.dev

就會直接看到 SVG。

## 動態產生內容

Worker 可以在 Response 之前執行 JavaScript。

例如隨機抽一句：

```
const quotes = [
  {
    quote: "It works on my machine.",
    source: "Every developer, at least once"
  },
  {
    quote: "The test passed. The user didn't.",
    source: "Unknown"
  }
];

const item =
  quotes[Math.floor(Math.random() * quotes.length)];

```

然後把資料放進 SVG：

```
const svg = `
<svg ...>

  <text>
    “${item.quote}”
  </text>

  <text>
    — ${item.source}
  </text>

</svg>
`;
```

因此每次 Request 都可以產生不同內容：

```
GET /
 ↓
Worker
 ↓
Random Quote
 ↓
Generate SVG
 ↓
Response
```