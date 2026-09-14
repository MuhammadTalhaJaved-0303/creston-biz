import { chromium } from "/Users/mtj-s2s/Crestonbiz/node_modules/playwright/index.mjs";
const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [1024, 768], [1440, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3210/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => document.querySelector("#industries").scrollIntoView());
  await page.waitForTimeout(1500);
  const before = await page.evaluate(() => {
    const p = document.querySelector("#industries p.mt-10");
    const dot = p.firstElementChild;
    const range = document.createRange();
    range.selectNodeContents(p);
    const rects = [...range.getClientRects()].filter(r => r.width > 12).map(r => [Math.round(r.left), Math.round(r.right), Math.round(r.top)]);
    return { p: [Math.round(p.getBoundingClientRect().left), Math.round(p.getBoundingClientRect().right)], dot: [Math.round(dot.getBoundingClientRect().left), Math.round(dot.getBoundingClientRect().top)], lines: rects };
  });
  // Prototype fix B: inline dot, keep text-center
  const after = await page.evaluate(() => {
    const p = document.querySelector("#industries p.mt-10");
    p.className = "mt-10 text-center text-small text-ink-3";
    const dot = p.firstElementChild;
    dot.className = "mr-2.5 inline-block size-2 rounded-full align-middle bg-[linear-gradient(135deg,#2e6bff,#2bc4ec)]";
    dot.style.background = "linear-gradient(135deg,#2e6bff,#2bc4ec)";
    const range = document.createRange();
    range.selectNodeContents(p);
    const rects = [...range.getClientRects()].filter(r => r.width > 12).map(r => [Math.round(r.left), Math.round(r.right), Math.round(r.top)]);
    return { p: [Math.round(p.getBoundingClientRect().left), Math.round(p.getBoundingClientRect().right)], dot: [Math.round(dot.getBoundingClientRect().left), Math.round(dot.getBoundingClientRect().top)], lines: rects };
  });
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-mtj-s2s-Crestonbiz/bddb5a2e-0ce1-419a-8ab8-4feb558be23a/scratchpad/fixB-${w}.png`, clip: { x: 0, y: (await page.evaluate(() => document.querySelector("#industries p.mt-10").getBoundingClientRect().top)) - 30, width: w, height: 90 } });
  console.log(w, "BEFORE", JSON.stringify(before));
  console.log(w, "AFTER ", JSON.stringify(after));
  await page.close();
}
await browser.close();
