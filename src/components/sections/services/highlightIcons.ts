import { FileCheck2, LayoutDashboard, Receipt, RefreshCcw, type LucideIcon } from "lucide-react";
import type { Highlight } from "@/lib/content";

/** Lucide icons for the highlight tiles, keyed by the name stored in content. */
export const highlightIcons: Record<Highlight["icon"], LucideIcon> = {
  FileCheck2,
  RefreshCcw,
  Receipt,
  LayoutDashboard,
};
