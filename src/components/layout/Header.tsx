"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { nav, primaryCta } from "@/lib/site";

const SCROLL_THRESHOLD = 24;

/** Fixed header that turns into a floating frosted bar once the page scrolls. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > SCROLL_THRESHOLD;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header className="fixed inset-x-0 top-0 z-50" initial={false} animate={{ paddingTop: scrolled ? 10 : 0 }}>
        <div className="mx-auto max-w-[var(--container-site)] px-[var(--spacing-gutter)]">
          <div
            className={cn(
              "flex items-center justify-between transition-[background-color,box-shadow,border-color,padding,height] duration-500 ease-[var(--ease-out)]",
              scrolled
                ? "glass rounded-full h-16 px-3 pl-5"
                : "h-20 border border-transparent bg-transparent",
            )}
          >
            <Link href="#top" aria-label="Creston Biz, back to top" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-2.5 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink xl:px-3.5 xl:text-[0.95rem]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <ButtonLink href={primaryCta.href} arrow>
                  {primaryCta.label}
                </ButtonLink>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                aria-label="Open menu"
                className="lg:hidden grid size-11 place-items-center rounded-full border border-line-2 bg-surface"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
