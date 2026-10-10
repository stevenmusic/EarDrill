// App 圖示:黑底 + 金色線稿耳朵(跟 FingerDrill 的手同一種畫法:24 格、圓端點);用 Chromium 畫成 PNG。
// 產生:icons/icon-192.png、icon-512.png、icon-maskable-512.png(四周留安全區)、apple-touch-icon.png(180)、icon-1024.png(App Store)
// 執行:cd tools/test && node icons.mjs
import { chromium } from "playwright";
const OUT = new URL("../../icons/", import.meta.url).pathname;
export const EAR = `<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>`;
const svg = (size, pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
<defs><radialGradient id="g" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#2A2112"/><stop offset="1" stop-color="#0C0A07"/></radialGradient></defs>
<rect width="100" height="100" fill="url(#g)"/>
<g transform="translate(${pad} ${pad}) scale(${(100 - 2 * pad) / 24})" fill="none" stroke="#F2B94B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${EAR}</g></svg>`;
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined }); const p = await b.newPage();
for (const [name, size, pad] of [["icon-192.png", 192, 12], ["icon-512.png", 512, 12], ["icon-maskable-512.png", 512, 20], ["apple-touch-icon.png", 180, 12], ["icon-1024.png", 1024, 12]]) {
  await p.setViewportSize({ width: size, height: size });
  await p.setContent(`<html><body style="margin:0">${svg(size, pad)}</body></html>`);
  await p.screenshot({ path: OUT + name, clip: { x: 0, y: 0, width: size, height: size } });
}
await b.close(); console.log("ok");
