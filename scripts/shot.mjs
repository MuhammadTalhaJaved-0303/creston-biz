/**
 * Screenshot a section of the running dev server.
 *   node scripts/shot.mjs <#anchor|full> <out.png> [width] [height]
 * Waits for fonts and the hero timeline, scrolls the anchor into view
 * so scroll-linked motion has run, then captures the viewport (or full page).
 */
import { chromium } from "playwright";

const [target = "full", out = ".shots/out.png", w = "1440", h = "900"] = process.argv.slice(2);
const base = process.env.SHOT_BASE ?? "http://localhost:3210/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

if (target === "walk") {
  // Viewport-by-viewport captures as a reader would see them: <out>-NN.png
  const stem = out.replace(/\.png$/, "");
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round(Number(h) * 0.85);
  const frames = Array.from({ length: Math.ceil(total / step) }, (_, i) => i * step);
  for (const [i, y] of frames.entries()) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(i === 0 ? 3600 : 900);
    await page.screenshot({ path: `${stem}-${String(i).padStart(2, "0")}.png`, fullPage: false });
  }
  await browser.close();
  console.log(`saved ${frames.length} frames as ${stem}-NN.png`);
  process.exit(0);
}

if (target === "full") {
  // Walk the page so in-view animations fire before a full capture.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: out, fullPage: true });
} else {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`No element matches ${sel}`);
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "instant" });
  }, target);
  await page.waitForTimeout(target === "#top" ? 3600 : 2200);
  await page.screenshot({ path: out, fullPage: false });
}
await browser.close();
console.log(`saved ${out}`);
