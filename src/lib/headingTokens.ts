import { isValidElement, type ReactNode } from "react";

const GRADIENT_CLASS = "text-gradient";

export type HeadingToken =
  | { readonly kind: "word"; readonly text: string; readonly gradient: boolean }
  | { readonly kind: "space" }
  | { readonly kind: "break" };

type ElementProps = { readonly className?: string; readonly children?: ReactNode };

/**
 * Flattens heading JSX into words, spaces and line breaks. Runs on the
 * server, where the JSX is real React elements, so the client component
 * that animates the words receives plain data and hydrates identically.
 * A `text-gradient` wrapper marks its words as gradient.
 */
export function headingTokens(node: ReactNode, gradient = false): ReadonlyArray<HeadingToken> {
  if (node === null || node === undefined || typeof node === "boolean") return [];
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/)
      .filter((part) => part !== "")
      .map((part) => (/^\s+$/.test(part) ? { kind: "space" } : { kind: "word", text: part, gradient }));
  }
  if (Array.isArray(node)) return node.flatMap((child) => headingTokens(child, gradient));
  if (isValidElement<ElementProps>(node)) {
    if (node.type === "br") return [{ kind: "break" }];
    const { className, children } = node.props;
    const isGradient = gradient || (typeof className === "string" && className.includes(GRADIENT_CLASS));
    return headingTokens(children, isGradient);
  }
  return [];
}
