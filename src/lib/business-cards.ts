import { founder, foundingMembers } from "./content";
import { contact, site } from "./site";

export type BusinessCard = {
  readonly slug: string;
  readonly name: string;
  readonly nameParts: readonly [string, string, string, string, string];
  readonly role: string;
  readonly photo: string;
  readonly bio: readonly string[];
  readonly education?: readonly string[];
  readonly linkedin?: string;
};

export const businessCards: readonly BusinessCard[] = [
  {
    slug: "hasan-ghazanfar",
    name: founder.name,
    nameParts: ["Ghazanfar", "Hasan", "", "Syed", ""],
    role: founder.role,
    photo: founder.photo.portrait,
    bio: founder.bio,
    education: founder.education,
    linkedin: contact.linkedin,
  },
  ...foundingMembers.map((member): BusinessCard => ({
    slug: member.id,
    name: member.name,
    nameParts: member.id === "ali-nauman-gilani"
      ? ["Gilani", "Ali", "Nauman", "Syed", ""]
      : ["Sanam", "Zarmina", "", "", ""],
    role: member.role,
    photo: member.photo,
    bio: [member.summary, member.bio],
  })),
];

export function getBusinessCard(slug: string) {
  return businessCards.find((card) => card.slug === slug);
}

export function businessCardUrl(card: BusinessCard) {
  return `${site.url}/cards/${card.slug}`;
}

export const officeContactNote = "Creston Biz office contact. Phone and email are shared business contact details.";
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.addressLines.join(", "))}`;
