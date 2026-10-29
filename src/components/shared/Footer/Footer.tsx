import Link from "next/link";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import Button from "@/components/shared/Button/Button";
import Instagram from "@/components/shared/icons/Instagram/Instagram";
import Facebook from "@/components/shared/icons/Facebook/Facebook";
import LinkedIn from "@/components/shared/icons/LinkedIn/LinkedIn";
import TikTok from "@/components/shared/icons/TikTok/TikTok";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { text: "The Fleet", href: "/fleet" },
      { text: "Wedding Services", href: "/weddings" },
      { text: "Beyond Weddings", href: "/celebrations" },
      { text: "Gallery", href: "/gallery" },
      { text: "Venues We Serve", href: "/venues" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "Our Story", href: "/our-story" },
      { text: "Planner Accounts", href: "/planners" },
      { text: "Journal", href: "/journal" },
      { text: "FAQ", href: "/faq" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Your booking",
    links: [
      { text: "Check your date", href: "/book" },
      { text: "Log in", href: "/login" },
      { text: "Create account", href: "/register" },
      { text: "Booking terms", href: "/terms" },
      { text: "Privacy", href: "/privacy" },
    ],
  },
];

/**
 * Site footer. Contact details and social links come from
 * Admin → Company Settings (falling back to src/config/site.ts).
 * Social icons only render when a URL is set.
 */
export default async function Footer() {
  const s = await getCompanySettings();
  const year = new Date().getFullYear();

  const phone = s.dispatchPhone || SITE.phone.display;
  const tel = s.dispatchPhoneRaw || SITE.phone.tel;
  const email = s.supportEmail || SITE.email.info;

  const socials = [
    { label: "Instagram", href: s.instagramUrl, Icon: Instagram },
    { label: "Facebook", href: s.facebookUrl, Icon: Facebook },
    { label: "TikTok", href: s.tiktokUrl, Icon: TikTok },
    { label: "LinkedIn", href: s.linkedinUrl, Icon: LinkedIn },
  ].filter((x) => Boolean(x.href));

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div>
            <p className={styles.bigLine}>Have a date in mind?</p>
            <div className={styles.cta}>
              <Button
                href='/book'
                text='Check your date'
                btnType='white'
                arrow
              />
            </div>
          </div>

          <div className={styles.contact}>
            <a href={`mailto:${email}`} className={styles.contactLink}>
              {email}
            </a>
            <a href={`tel:${tel}`} className={styles.contactLink}>
              {phone}
            </a>
            <p className={styles.muted}>
              The Garage, {s.officeAddress || SITE.address.street},{" "}
              {s.officeCity || `${SITE.address.city}, ${SITE.address.state}`}{" "}
              (by appointment)
            </p>

            {socials.length > 0 && (
              <ul className={styles.socials}>
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={label}
                      className={styles.social}
                    >
                      <Icon className={styles.socialIcon} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <nav className={styles.columns} aria-label='Footer'>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className={styles.colTitle}>{col.title}</p>
              <ul className={styles.list}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.link}>
                      {l.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomRow}>
          <p className={styles.small}>
            © {year} {SITE.legalName}
          </p>
          <p className={styles.small}>Site by Fonts &amp; Footers</p>
        </div>
        <p className={styles.wordmark} aria-hidden='true'>
          Valley Vintage
        </p>
      </div>
    </footer>
  );
}
