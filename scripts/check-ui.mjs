/** Run against the local site: UI_BASE_URL=http://localhost:3210 node scripts/check-ui.mjs */
import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.UI_BASE_URL ?? "http://localhost:3210";
const browser = await chromium.launch();
const serviceNames = ["Facilities Management", "Office Operations & Administration", "Events Management"];

try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert.deepEqual(await page.locator("#services article h3").allTextContents(), serviceNames);
    assert.equal(await page.getByText("Workforce Solutions", { exact: true }).count(), 0);
    assert.match(await page.locator("h1").innerText(), /Three functions/);
    assert.equal(await page.locator("header").getByText("C", { exact: true }).count(), 0);
    assert.deepEqual((await page.locator("select option").allTextContents()).slice(1, 4), serviceNames);

    // Walk the page: offscreen animated sections can also cause horizontal overflow.
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < pageHeight; y += 700) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Horizontal overflow at ${width}px / scroll ${y}`);
    }
    for (const [index, count] of [10, 11, 12].entries()) {
      const article = page.locator("#services article").nth(index);
      const image = article.locator("img");
      await image.scrollIntoViewIfNeeded();
      await page.waitForFunction((alt) => {
        const image = [...document.images].find((item) => item.alt === alt);
        return image?.complete && image.naturalWidth > 0 && image.clientHeight > 0;
      }, await image.getAttribute("alt"));
      await article.getByRole("button", { name: `See all ${count} services for ${serviceNames[index]}`, exact: true }).click();
      assert.equal(await article.locator("li:visible").count(), count);
      await article.getByRole("button", { name: `Show fewer services for ${serviceNames[index]}`, exact: true }).click();
      await page.waitForFunction((id) => !document.getElementById(id), `${await article.getAttribute("aria-labelledby")}`.replace("-title", "-scope-more"));
      assert.equal(await article.locator("li:visible").count(), 4);
    }
    if (width >= 1024) {
      const height = await page.locator("#stack").evaluate((element) => element.clientHeight);
      assert.ok(height < 1800, `Reduced-motion section is unnecessarily tall: ${height}px`);
    }
    if (width === 390) await page.screenshot({ path: ".shots/final-mobile.png" });
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    console.log(`PASS: ${width}px layout, images, service scopes and reduced motion`);
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 667, height: 375 }, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  const opener = page.getByRole("button", { name: "Open menu", exact: true });
  await opener.click();
  const dialog = page.getByRole("dialog");
  assert.ok(await dialog.evaluate((element) => element.getBoundingClientRect().bottom <= innerHeight), "Landscape menu exceeds screen");
  assert.ok(await dialog.evaluate((element) => element.contains(document.activeElement)), "Menu must receive focus");
  await page.keyboard.press("Shift+Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("href")), "tel:+923328118425");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Close menu");
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.equal(await opener.evaluate((element) => element === document.activeElement), true);
  await opener.click();
  await dialog.getByRole("link", { name: "Book a consultation" }).click();
  await dialog.waitFor({ state: "hidden" });
  await page.waitForFunction(() => {
    const top = document.querySelector("#contact").getBoundingClientRect().top;
    return top >= 0 && top < 150;
  });
  assert.notEqual(await page.evaluate(() => getComputedStyle(document.documentElement).overflow), "hidden");

  // Empty submission is rejected before any inquiry can be delivered.
  await page.getByRole("button", { name: "Send inquiry", exact: true }).click();
  await page.getByText("Please check the highlighted fields and try again.").waitFor();
  await page.waitForFunction(() => document.activeElement?.id === "inquiry-name");
  assert.equal(await page.locator("#inquiry-name").getAttribute("aria-invalid"), "true");
  console.log("PASS: landscape menu, focus trap, Escape, consultation link and validation focus");
  await page.close();

  const animated = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference" });
  await animated.goto(base, { waitUntil: "networkidle" });
  await animated.getByRole("button", { name: "Open menu", exact: true }).click();
  await animated.getByRole("dialog").getByRole("link", { name: "Book a consultation" }).click();
  await animated.getByRole("dialog").waitFor({ state: "hidden" });
  await animated.waitForFunction(() => {
    const top = document.querySelector("#contact").getBoundingClientRect().top;
    return top >= 76 && top < 120;
  });
  await animated.setViewportSize({ width: 1440, height: 900 });
  await animated.reload({ waitUntil: "networkidle" });
  await animated.waitForFunction(() => document.querySelector("#stack").clientHeight > innerHeight * 3);
  const stackTop = await animated.locator("#stack").evaluate((element) => element.getBoundingClientRect().top + scrollY);
  await animated.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), stackTop + 1000);
  await animated.waitForFunction(() => getComputedStyle(document.querySelector("#stack > div > div")).position === "sticky");
  assert.equal(await animated.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  console.log("PASS: normal-motion consultation navigation and desktop sticky stack");
  await animated.close();
} finally {
  await browser.close();
}
