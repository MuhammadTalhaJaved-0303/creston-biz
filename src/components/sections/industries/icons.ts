import { Building2, Cpu, Factory, GraduationCap, HeartHandshake, Landmark, type LucideIcon } from "lucide-react";
import type { Industry } from "@/lib/content";

/**
 * Content names its icon as a string so `content.ts` stays plain data.
 * This map resolves that name to the lucide component at render time.
 */
export const industryIcons: Readonly<Record<Industry["icon"], LucideIcon>> = {
  Building2,
  HeartHandshake,
  Landmark,
  Cpu,
  Factory,
  GraduationCap,
};
