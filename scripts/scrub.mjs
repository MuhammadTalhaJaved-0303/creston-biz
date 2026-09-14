/** Capture a pinned section at several scroll offsets: scrub.mjs <#id> <outprefix> <w> <h> <offsets(vh) comma list> */
import { chromium } from "playwright";
const [target, out = ".shots/scrub", w = "1440", h = "900", offs = "0,0.6,1.4,2.2,3"] = process.argv.slice(2);
const base = process.env.SHOT_BASE ?? "http://localhost:3210/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
for (const [i, f] of offs.split(",").map(Number).entries()) {
  await page.evaluate(([sel, frac]) => {
    const el = document.querySelector(sel);
    const top = el.getBoundingClientRect().top + window.scrollY + frac * window.innerHeight;
    window.scrollTo({ top, behavior: "instant" });
  }, [target, f]);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}-${i}.png` });
}
await browser.close();
console.log("ok");
