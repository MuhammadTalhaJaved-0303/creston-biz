import type { BusinessCard } from "./business-cards";
import { businessCardUrl, officeContactNote } from "./business-cards";
import { contact, site } from "./site";

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

/** Fold at 75 UTF-8 octets without splitting a Unicode character. */
function foldLine(line: string) {
  let result = "";
  let bytes = 0;
  for (const character of line) {
    const length = Buffer.byteLength(character, "utf8");
    if (bytes + length > 75) {
      result += "\r\n ";
      bytes = 1;
    }
    result += character;
    bytes += length;
  }
  return result;
}

export function createVCard(card: BusinessCard, compact = false) {
  const notes = [officeContactNote, ...(compact ? [] : [...card.bio, ...(card.education ?? [])])];
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${card.nameParts.map(escapeText).join(";")}`,
    `FN:${escapeText(card.name)}`,
    `ORG:${escapeText(site.legalName)}`,
    `TITLE:${escapeText(card.role)}`,
    `TEL;TYPE=WORK,VOICE:${contact.phoneHref.slice(4)}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    `ADR;TYPE=WORK:;;${escapeText(contact.addressLines.slice(0, 2).join(", "))};Lahore Cantt;;;Pakistan`,
    `URL:${site.url}`,
    ...(compact ? [] : [`URL:${businessCardUrl(card)}`, `PHOTO;VALUE=URI:${site.url}${card.photo}`]),
    ...(card.linkedin ? [`URL:${card.linkedin}`] : []),
    `NOTE:${escapeText(notes.join("\n\n"))}`,
    "END:VCARD",
  ];
  // A compact QR stays unfolded for contact-scanner compatibility.
  return lines.map((line) => compact ? line : foldLine(line)).join("\r\n") + "\r\n";
}
