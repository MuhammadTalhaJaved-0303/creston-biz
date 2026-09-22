import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { businessCards, businessCardUrl } from "../src/lib/business-cards";
import { cardAssets, createCardDownload } from "../src/lib/card-downloads";
import { contact, site } from "../src/lib/site";

const root = process.cwd();
const output = path.join(root, "artifacts/business-cards");
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
await mkdir(output, { recursive: true });
const panels: string[] = [];

for (const card of businessCards) {
  const directory = path.join(output, card.slug);
  await mkdir(directory, { recursive: true });
  for (const asset of cardAssets) {
    const { body } = await createCardDownload(card, asset);
    await writeFile(path.join(directory, asset), body);
  }
  const photo = (await readFile(path.join(root, "public", card.photo))).toString("base64");
  const qr = (await readFile(path.join(directory, "contact-qr.svg"))).toString("base64");
  panels.push(`<section class="pair" aria-label="${escapeHtml(card.name)}">
    <article class="front">
      <img class="portrait" src="data:image/jpeg;base64,${photo}" alt="${escapeHtml(card.name)}">
      <div class="identity"><div class="logo">CRESTON <span>BIZ</span></div><h2>${escapeHtml(card.name)}</h2><p class="role">${escapeHtml(card.role)}</p><p class="web">crestonbiz.com</p></div>
    </article>
    <article class="back">
      <div class="details"><h3>Creston Biz</h3><p class="label">Office contact</p><p>${escapeHtml(contact.phoneDisplay)}<br>${escapeHtml(contact.email)}</p><p>${contact.addressLines.map(escapeHtml).join("<br>")}</p><p class="hint">Scan to save<br>${escapeHtml(card.name)}</p></div>
      <img class="qr" src="data:image/svg+xml;base64,${qr}" alt="Contact QR code for ${escapeHtml(card.name)}">
    </article>
  </section>`);
}

await writeFile(path.join(output, "printable-visiting-cards.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Creston Biz visiting cards</title>
<style>
*{box-sizing:border-box}body{margin:0;padding:32px;background:#eef2f9;color:#0b1c33;font-family:"Segoe UI",Arial,sans-serif}main{max-width:190mm;margin:auto}h1{font-size:26px;margin:0 0 12px}.instructions{font-size:14px;line-height:1.6;margin-bottom:28px}.pair{display:grid;grid-template-columns:90mm 90mm;gap:7mm;margin-bottom:9mm;break-inside:avoid}.front,.back{width:90mm;height:55mm;overflow:hidden;border:1px solid #d3dae6}.front{display:flex;background:#0a2647;color:white}.portrait{width:30mm;height:100%;object-fit:cover;object-position:50% 15%}.identity{padding:6mm 4mm;display:flex;flex-direction:column;flex:1}.logo{font-size:10px;font-weight:800;letter-spacing:1px}.logo span{color:#2bc4ec}h2{font-size:20px;line-height:1.15;letter-spacing:-.5px;margin:7mm 0 2mm}p{margin:0}.role{font-size:9px;line-height:1.5;color:#bfeeff}.web{font-size:9px;margin-top:auto;padding-top:3mm}.back{display:flex;align-items:center;background:white;padding:3mm;gap:1mm}.details{width:39mm;overflow-wrap:anywhere}h3{font-size:12px;margin:0 0 3mm}.details p{font-size:7px;line-height:1.6;margin:0 0 2mm}.details .label{font-size:8px;font-weight:700;color:#1f55d6}.details .hint{font-size:8px;font-weight:700;margin-top:3mm}.qr{width:43mm;height:43mm;flex-shrink:0}button{border:0;background:#1f55d6;color:white;padding:12px 20px;border-radius:24px;font:inherit;cursor:pointer}button:focus-visible{outline:3px solid #0a2647;outline-offset:3px}@media(max-width:760px){body{padding:16px}.pair{grid-template-columns:90mm;overflow-x:auto}}@page{size:A4 portrait;margin:12mm}@media print{body{padding:0;background:white;-webkit-print-color-adjust:exact;print-color-adjust:exact}.instructions,h1,button{display:none}.pair{grid-template-columns:90mm 90mm;gap:6mm;margin-bottom:10mm}main{max-width:none}}
</style></head><body><main><h1>Creston Biz visiting cards</h1><div class="instructions">Front and back designs for each person, 90 × 55 mm. Print at 100% scale with background graphics enabled. These are paired proofs; give the designs to your printer for double-sided alignment. QR codes contain contact details and work without a website. All phone and email details are the shared Creston Biz office contact.</div><button onclick="window.print()">Print cards</button><div style="height:24px" aria-hidden="true"></div>${panels.join("\n")}</main></body></html>`);

await writeFile(path.join(output, "README.txt"), `CRESTON BIZ BUSINESS CARDS

Names and roles match the website source. All phone/email fields are the shared office contact, not verified personal contacts for Ali or Zarmina.

Each person's folder contains:
- contact.vcf: contact file with role, company, office contact, address, biography, photo URL and available social link.
- contact-qr.png / contact-qr.svg: contact-only QR. Works offline and does not expire. Photos and long biographies are omitted to keep this QR scannable.
- qr.png / qr.svg: website QR. Opens the full digital business card after the new pages are deployed to ${site.url}. These codes require the domain and website to remain available.

printable-visiting-cards.html: self-contained front/back proofs. Open in a browser, then print at 100% with backgrounds enabled. These are not an automatically aligned duplex print sheet.

Digital card URLs (deployment required):
${businessCards.map((card) => `${card.name}: ${businessCardUrl(card)}`).join("\n")}

Regenerate after changing website profile/contact details: npm run cards:export
`);
console.log(`Exported ${businessCards.length} cards to ${output}`);
