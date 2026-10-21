"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import NavProgress from "@/components/shared/NavProgress/NavProgress";
import Button from "@/components/shared/Button/Button";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import { SITE } from "@/config/site";
import styles from "./Nav.module.css";

/**
 * Site nav: a white pill with the logo on the left, page links in the
 * middle and a Book now button on the right. Below 968px the links and
 * button move into a menu that opens from the hamburger.
 *
 * `overlay` floats the nav over a full-bleed hero (the home page). Every
 * other page renders it in normal flow. The older props are still
 * accepted so existing callers (`<Nav background="white" />`) compile.
 */
export interface NavProps {
  overlay?: boolean;
  navItemColor?: string;
  color?: string;
  hamburgerColor?: string;
  background?: "white" | "cream" | "accent";
}

type AppRole = "USER" | "ADMIN" | "DRIVER" | "CORPORATE";

const LINKS = [
  { text: "Home", href: "/" },
  { text: "The Fleet", href: "/fleet" },
  { text: "Services", href: "/services" },
  { text: "Gallery", href: "/gallery" },
  { text: "Our Story", href: "/our-story" },
  ...SITE.nav.partners.map((p) => ({ text: p.text, href: p.href })),
];

function dashboardFor(roles: AppRole[]): string {
  if (roles.includes("ADMIN")) return "/admin";
  if (roles.includes("DRIVER")) return "/driver-dashboard";
  if (roles.includes("CORPORATE")) return "/corporate";
  return "/dashboard";
}

export default function Nav({ overlay = false }: NavProps) {
  const pathname = usePathname() ?? "/";
  const { data: session } = useSession();
  const roles = ((session?.user as { roles?: AppRole[] } | undefined)?.roles ??
    []) as AppRole[];
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const dashboardLink = session ? (
    <Link href={dashboardFor(roles)} className={styles.link}>
      Dashboard
    </Link>
  ) : null;

  return (
    <header
      className={`${styles.header} ${overlay ? styles.overlay : styles.inFlow}`}
    >
      <div className={styles.container}>
        <nav className={styles.navInner} aria-label='Main'>
          <Link
            href='/'
            className={styles.brand}
            aria-label={`${SITE.name} home`}
          >
            <Luxury className={styles.logoIcon} aria-hidden='true' />
            <span className={styles.brandName}>{SITE.name}</span>
          </Link>

          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${isActive(l.href) ? styles.active : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {dashboardLink}
            <Button href='/book' text='Book now' btnType='gold' arrow />
          </div>

          <button
            type='button'
            className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls='mobile-menu'
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </nav>

        <div
          id='mobile-menu'
          className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
          hidden={!open}
        >
          <ul className={styles.mobileLinks}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${isActive(l.href) ? styles.active : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.text}
                </Link>
              </li>
            ))}
            {dashboardLink && <li>{dashboardLink}</li>}
          </ul>
          <Button href='/book' text='Book now' btnType='gold' arrow />
        </div>
      </div>
      <NavProgress />
    </header>
  );
}
