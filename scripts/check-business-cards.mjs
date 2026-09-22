import assert from "node:assert/strict";
import { test } from "node:test";
import sharp from "sharp";
import jsQR from "jsqr";

const base = process.env.UI_BASE_URL ?? "http://localhost:3000";
const people = [
  ["hasan-ghazanfar", "Syed Hasan Ghazanfar", "Founder and Chief Executive Officer"],
  ["ali-nauman-gilani", "Syed Ali Nauman Gilani", "Founding Member and Director"],
  ["zarmina-sanam", "Zarmina Sanam", "Founding Member and Managing Director"],
];

for (const [slug, name, role] of people) {
  test(`${name}: page, imported contact and both QR codes identify the same person`, async () => {
    const page = await fetch(`${base}/cards/${slug}`);
    assert.equal(page.status, 200, "The digital business card must exist");
    const html = await page.text();
    assert.ok(html.includes(name));
    assert.ok(html.includes("Save contact"));

    const downloadBase = `${base}/cards/${slug}/download`;
    const response = await fetch(`${downloadBase}/contact.vcf`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /^text\/vcard/);
    assert.match(response.headers.get("content-disposition"), /attachment/);
    const raw = await response.text();
    const vcard = raw.replace(/\r\n /g, "");
    assert.ok(vcard.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
    assert.ok(vcard.endsWith("END:VCARD\r\n"));
    assert.ok(vcard.includes(`FN:${name}\r\n`));
    assert.ok(vcard.includes(`TITLE:${role}\r\n`));
    assert.ok(vcard.includes("TEL;TYPE=WORK,VOICE:+923328118425"));
    assert.ok(vcard.includes("EMAIL;TYPE=INTERNET,WORK:hasanghazanfar1987@gmail.com"));
    assert.ok(vcard.includes("Office 4030"));
    assert.ok(vcard.includes(";Lahore Cantt;;;Pakistan"));
    assert.ok(vcard.includes("Creston Biz office contact"));
    if (slug !== "hasan-ghazanfar") assert.ok(!vcard.includes("linkedin.com/in/HasanGhazanfar"));
    for (const line of raw.split("\r\n")) assert.ok(Buffer.byteLength(line) <= 75);

    for (const asset of ["qr.png", "contact-qr.png"]) {
      const qrResponse = await fetch(`${downloadBase}/${asset}`);
      assert.equal(qrResponse.status, 200);
      assert.match(qrResponse.headers.get("content-type"), /^image\/png/);
      const { data, info } = await sharp(Buffer.from(await qrResponse.arrayBuffer()))
        .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
      assert.ok(decoded, `${asset} must scan`);
      if (asset === "qr.png") {
        assert.equal(decoded.data, `https://crestonbiz.com/cards/${slug}`);
      } else {
        assert.ok(decoded.data.includes(`FN:${name}\r\n`));
        assert.ok(decoded.data.includes("TEL;TYPE=WORK,VOICE:+923328118425"));
      }
    }
    const svg = await fetch(`${downloadBase}/qr.svg`);
    assert.equal(svg.status, 200);
    assert.match(svg.headers.get("content-type"), /^image\/svg\+xml/);
    assert.ok((await svg.text()).includes("<svg"));
  });
}

test("Unknown people and unsupported downloads are rejected", async () => {
  for (const path of ["/cards/not-a-person", "/cards/not-a-person/download/qr.png", "/cards/hasan-ghazanfar/download/anything.exe"]) {
    assert.equal((await fetch(`${base}${path}`)).status, 404);
  }
});
