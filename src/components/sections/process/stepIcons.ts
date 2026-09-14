import { BadgeCheck, ChartColumn, ClipboardCheck, FileCheck2, FileSignature, ListChecks, ReceiptText, type LucideIcon } from "lucide-react";

/** Icon for the document that closes each stage, keyed by step number. */
export const closingIcons: Readonly<Record<number, LucideIcon>> = {
  1: ClipboardCheck,
  2: ReceiptText,
  3: FileSignature,
  4: ListChecks,
  5: BadgeCheck,
  6: ChartColumn,
};

/** Used when a step has no dedicated icon. */
export const fallbackClosingIcon: LucideIcon = FileCheck2;
