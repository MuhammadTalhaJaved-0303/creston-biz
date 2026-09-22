import QRCode from "qrcode";
import { businessCardUrl, type BusinessCard } from "./business-cards";
import { createVCard } from "./vcard";

export const cardAssets = ["contact.vcf", "qr.png", "qr.svg", "contact-qr.png", "contact-qr.svg"] as const;
export type CardAsset = (typeof cardAssets)[number];

export function isCardAsset(value: string): value is CardAsset {
  return cardAssets.some((asset) => asset === value);
}

export async function createCardDownload(card: BusinessCard, asset: CardAsset) {
  if (asset === "contact.vcf") {
    return { body: createVCard(card), contentType: "text/vcard; charset=utf-8" };
  }
  const payload = asset.startsWith("contact-") ? createVCard(card, true) : businessCardUrl(card);
  const options = { errorCorrectionLevel: "M" as const, margin: 4, width: 1200, color: { dark: "#0a2647", light: "#ffffff" } };
  if (asset.endsWith(".svg")) {
    return { body: await QRCode.toString(payload, { ...options, type: "svg" }), contentType: "image/svg+xml" };
  }
  return { body: new Uint8Array(await QRCode.toBuffer(payload, options)), contentType: "image/png" };
}
