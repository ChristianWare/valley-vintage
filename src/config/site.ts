/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file you edit for every new client.
 * ───────────────────────────────────────────────────────────────────────────
 *  Every brand-specific value in the codebase reads from here: page titles,
 *  meta descriptions, JSON-LD, transactional emails, PDFs, the nav, the
 *  footer, the legal pages, the PWA manifest, llms.txt.
 *
 *  Values the OPERATOR can change later without a deploy (dispatch phone,
 *  office hours, social links, Stripe keys, logo upload) live in
 *  Admin → Company Settings and fall back to these values until filled in.
 *
 *  Search the repo for `SITE.` to see where each value lands.
 */

export type PartnerLink = {
  /** Menu label, e.g. "Grand Hotel & Spa" */
  text: string;
  /** Route of the partner landing page, e.g. "/partners/grand-hotel" */
  href: string;
  /** One-line description shown under the label in the dropdown */
  copy: string;
};

export interface SiteConfig {
  /** Display name used everywhere: "Skyline Black Car" */
  name: string;
  /** Legal entity for invoices, checks, terms: "Skyline Black Car LLC" */
  legalName: string;
  /** URL-safe id used for storage folders and cache keys: "skyline-black-car" */
  slug: string;
  /** Short positioning line used in titles and the manifest */
  tagline: string;
  /** Default meta description (≤160 chars) */
  description: string;
  /** Canonical origin, no trailing slash. Decides www vs apex (see next.config.ts) */
  url: string;
  /** Derived from url — do not edit */
  domain: string;
  email: {
    info: string;
    reservations: string;
    support: string;
    admin: string;
    corporate: string;
    noReply: string;
  };
  phone: {
    /** Human format shown on the site: "(480) 555-0100" */
    display: string;
    /** E.164 for tel: links and JSON-LD: "+14805550100" */
    tel: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  /** IANA timezone the business operates in */
  timezone: string;
  market: {
    /** Primary metro: "Phoenix" */
    city: string;
    /** "Arizona" */
    state: string;
    /** "AZ" */
    stateCode: string;
    /** How locals refer to the area: "the Valley" */
    region: string;
  };
  owner: {
    name: string;
    title: string;
  };
  /** Year founded, shown in about copy and JSON-LD */
  founded: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    google: string;
    yelp: string;
  };
  /** Paths under /public */
  logo: string;
  ogImage: string;
  /** PWA theme color */
  themeColor: string;
  nav: {
    /** Partner landing pages. Empty array hides the Partners menu. */
    partners: PartnerLink[];
  };
}

const url = "https://www.valleyvintagecarriage.com";

export const SITE: SiteConfig = {
  name: "Valley Vintage Carriage Co.",
  legalName: "Valley Vintage Carriage Co. LLC",
  slug: "valley-vintage",
  tagline: "Vintage wedding cars with chauffeurs in Phoenix, Arizona",
  description:
    "Restored 1920s–1950s wedding cars with chauffeurs across Phoenix and Scottsdale. Ceremony arrivals, grand exits and full-day packages. Check your date online.",
  url,
  domain: new URL(url).host,
  email: {
    info: "hello@valleyvintagecarriage.com",
    reservations: "bookings@valleyvintagecarriage.com",
    support: "support@valleyvintagecarriage.com",
    admin: "admin@valleyvintagecarriage.com",
    // Planner Accounts reuse the corporate accounts feature
    corporate: "planners@valleyvintagecarriage.com",
    noReply: "no-reply@valleyvintagecarriage.com",
  },
  phone: {
    display: "(602) 555-0128",
    tel: "+16025550128",
  },
  address: {
    street: "2140 N 16th St",
    city: "Phoenix",
    state: "AZ",
    zip: "85006",
    country: "US",
  },
  timezone: "America/Phoenix",
  market: {
    city: "Phoenix",
    state: "Arizona",
    stateCode: "AZ",
    region: "the Valley",
  },
  owner: {
    name: "Lucy Ortega",
    title: "Owner & Lead Coordinator",
  },
  founded: "2017",
  // Left empty on purpose: fictional handles could point at real accounts.
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    google: "",
    yelp: "",
  },
  logo: "/brand/logo.png",
  ogImage: "/brand/og-image.png",
  // Carriage red, from the brand palette
  themeColor: "#8B1E1E",
  nav: {
    partners: [],
  },
};