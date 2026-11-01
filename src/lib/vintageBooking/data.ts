// Everything the Valley Vintage booking demo needs: services, cars, add-ons
// and the pricing rules. This is a portfolio site, so nothing here touches
// the database, Stripe or email. Prices match the Wedding Services page.

export type PricingModel = "flat" | "hourly" | "quote";

export type Service = {
  id: string;
  name: string;
  group: "Weddings" | "Celebrations" | "Photo & Film";
  blurb: string;
  model: PricingModel;
  /** dollars: flat price, or the price for the minimum hours */
  price: number;
  minHours?: number;
  /** months the service runs (1–12). Omit = all year */
  months?: number[];
  /** which route fields to ask for */
  stops: ("pickup" | "ceremony" | "reception" | "photo" | "dropoff")[];
};

export const EXTRA_HOUR = 195;
export const DEPOSIT = 250;
export const BALANCE_DAYS_BEFORE = 14;

export const SERVICES: Service[] = [
  {
    id: "ceremony-arrival",
    name: "Ceremony Arrival",
    group: "Weddings",
    blurb:
      "Pickup at your getting-ready suite, a scenic route, door held at the ceremony.",
    model: "flat",
    price: 395,
    stops: ["pickup", "ceremony"],
  },
  {
    id: "ceremony-to-reception",
    name: "Ceremony to Reception",
    group: "Weddings",
    blurb:
      "Your first ride as newlyweds, with a 15-minute photo stop on the way.",
    model: "flat",
    price: 395,
    stops: ["ceremony", "photo", "reception"],
  },
  {
    id: "grand-exit",
    name: "Grand Exit",
    group: "Weddings",
    blurb:
      "A staged sparkler send-off from the reception, then a drive to your hotel.",
    model: "flat",
    price: 345,
    stops: ["reception", "dropoff"],
  },
  {
    id: "full-wedding-day",
    name: "Full Wedding Day",
    group: "Weddings",
    blurb:
      "Car and chauffeur on standby for the arrival, photos, first ride and exit.",
    model: "hourly",
    price: 675,
    minHours: 3,
    stops: ["pickup", "ceremony", "photo", "reception", "dropoff"],
  },
  {
    id: "anniversary",
    name: "Anniversary & Vow Renewal",
    group: "Celebrations",
    blurb: "A vow renewal, an anniversary dinner or a slow sunset drive.",
    model: "hourly",
    price: 395,
    minHours: 2,
    stops: ["pickup", "dropoff"],
  },
  {
    id: "prom",
    name: "Prom, Homecoming & Quinceañera",
    group: "Celebrations",
    blurb: "Photos, the dance and home on time, with a chauffeur parents love.",
    model: "hourly",
    price: 445,
    minHours: 2,
    stops: ["pickup", "photo", "dropoff"],
  },
  {
    id: "mitzvah",
    name: "Bar & Bat Mitzvah",
    group: "Celebrations",
    blurb: "The guest of honor and family, to the service and the party.",
    model: "hourly",
    price: 445,
    minHours: 2,
    stops: ["pickup", "ceremony", "reception"],
  },
  {
    id: "gatsby",
    name: "Gatsby & Theme Party",
    group: "Celebrations",
    blurb: "A red-carpet arrival and a car outside for photos all night.",
    model: "hourly",
    price: 445,
    minHours: 2,
    stops: ["pickup", "reception"],
  },
  {
    id: "date-night",
    name: "Date Night",
    group: "Celebrations",
    blurb: "Dinner, a sunset drive along Camelback and a nightcap downtown.",
    model: "hourly",
    price: 345,
    minHours: 2,
    stops: ["pickup", "dropoff"],
  },
  {
    id: "holiday-lights",
    name: "Holiday Light Tour",
    group: "Celebrations",
    blurb:
      "Cocoa, blankets and the Valley's best light displays. December only.",
    model: "hourly",
    price: 395,
    minHours: 2,
    months: [12],
    stops: ["pickup", "dropoff"],
  },
  {
    id: "photo-session",
    name: "Photo Session",
    group: "Photo & Film",
    blurb: "The car staged and moved between locations for portraits.",
    model: "hourly",
    price: 495,
    minHours: 2,
    stops: ["pickup", "photo"],
  },
  {
    id: "production",
    name: "Film, Photo & Commercial",
    group: "Photo & Film",
    blurb: "Period cars for music videos, campaigns and films. Custom quote.",
    model: "quote",
    price: 0,
    stops: [],
  },
];

export type Car = {
  id: string;
  name: string;
  year: string;
  body: string;
  color: string;
  riders: number;
  convertible: boolean;
  src: string;
};

export const CARS: Car[] = [
  {
    id: "rosalind",
    name: "Rosalind",
    year: "1928",
    body: "Touring sedan",
    color: "Carriage red & black",
    riders: 2,
    convertible: false,
    src: "/images/vehicles/red.jpg",
  },
  {
    id: "clementine",
    name: "Clementine",
    year: "1931",
    body: "Convertible roadster",
    color: "Champagne cream",
    riders: 2,
    convertible: true,
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    id: "augustine",
    name: "Augustine",
    year: "1936",
    body: "Formal limousine",
    color: "Lacquer black",
    riders: 4,
    convertible: false,
    src: "/images/vehicles/blackyellow.jpg",
  },
  {
    id: "delphine",
    name: "Delphine",
    year: "1949",
    body: "Fastback sedan",
    color: "Seafoam green",
    riders: 3,
    convertible: false,
    src: "/images/vehicles/burg.jpg",
  },
  {
    id: "josephine",
    name: "Josephine",
    year: "1957",
    body: "Convertible",
    color: "Desert-rose pink",
    riders: 3,
    convertible: true,
    src: "/images/vehicles/green.jpg",
  },
];

/** Convertibles only book October through April */
export const CONVERTIBLE_MONTHS = [10, 11, 12, 1, 2, 3, 4];

export type AddOn = { id: string; name: string; price: number; note?: string };

export const ADD_ONS: AddOn[] = [
  {
    id: "floral",
    name: "Fresh floral hood arrangement",
    price: 175,
    note: "Matched to your bouquet",
  },
  { id: "sign", name: "Personalized “Just Married” sign", price: 45 },
  {
    id: "champagne",
    name: "Champagne toast for two",
    price: 65,
    note: "Riders 21 and older",
  },
  { id: "carpet", name: "Red carpet rollout", price: 85 },
  { id: "attire", name: "Chauffeur in 1920s period attire", price: 75 },
];

export const PAIRINGS: AddOn[] = [
  { id: "second-car", name: "Second vintage car for family", price: 295 },
  {
    id: "sprinter",
    name: "Sprinter for the wedding party (up to 14)",
    price: 495,
    note: "Bridal Party Pairing",
  },
];

export const RIBBONS = [
  "Ivory",
  "Champagne",
  "Blush",
  "Custom (tell us in the notes)",
];

export const STOP_LABELS: Record<Service["stops"][number], string> = {
  pickup: "Pickup (getting-ready location or home)",
  ceremony: "Ceremony or event venue",
  photo: "Photo stop (optional)",
  reception: "Reception or party venue",
  dropoff: "Drop-off (hotel or home)",
};

/**
 * Pretend availability so the demo feels real: on any given date, one car
 * (picked from the date itself) is already spoken for. Same date, same car.
 */
export function bookedCarFor(dateIso: string): string | null {
  if (!dateIso) return null;
  const sum = dateIso.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  return CARS[sum % CARS.length].id;
}

export function monthOf(dateIso: string): number {
  return Number(dateIso.slice(5, 7));
}

export function formatMoney(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatDate(dateIso: string) {
  if (!dateIso) return "";
  const [y, m, d] = dateIso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** "15:00" → "3:00 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function balanceDate(dateIso: string) {
  const [y, m, d] = dateIso.split("-").map(Number);
  const date = new Date(y, m - 1, d - BALANCE_DAYS_BEFORE);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** What the confirmation page reads back */
export type ConfirmedBooking = {
  ref: string;
  date: string;
  time: string;
  serviceName: string;
  carName: string;
  hours?: number;
  stops: { label: string; value: string }[];
  names: string;
  riders: number;
  email: string;
  lines: { label: string; amount: number }[];
  total: number;
  deposit: number;
  balance: number;
};

export const STORAGE_KEY = "vv-demo-booking";
