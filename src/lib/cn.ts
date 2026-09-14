/** Joins class names, dropping falsy values. Small enough not to need a dependency. */
export function cn(...parts: ReadonlyArray<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
