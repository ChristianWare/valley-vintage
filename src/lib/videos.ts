// Every video on the site lives on Cloudinary, so the repo stays small.
// To add or swap one: upload it to Cloudinary, copy its URL and paste it
// into `url` below. The URL can be the plain one Cloudinary gives you,
// e.g. https://res.cloudinary.com/<cloud>/video/upload/v1730000000/valley-vintage/wedding-film.mp4

export type VideoEntry = {
  /** The Cloudinary video URL (leave empty to show the poster only). */
  url: string;
  /** Still image shown before the video loads, from /public. */
  poster: string;
  /** Width Cloudinary scales the video to. Smaller = faster. */
  width?: number;
};

export const VIDEOS = {
  weddingFilm: {
    // ▼ Paste the Cloudinary URL for the wedding-day film here
    url: "https://res.cloudinary.com/dkxlrhwjd/video/upload/v1793302311/white-classic-car-decorated-with-flowers-for-weddi-2026-10-02-08-15-35-utc_1_ohzci5.mp4",
    poster: "/images/vehicles/red.jpg",
    width: 1280,
  },
  // ▼ Testimonial photo cards. Paste each couple's Cloudinary URL here.
  reviewMariana: {
    url: "https://res.cloudinary.com/dkxlrhwjd/video/upload/v1793304508/happy-newlyweds-celebrate-wedding-day-with-friends-2026-10-02-07-50-24-utc_l6ksxs.mp4", // ← Mariana & Theo (the wide card, top right)
    poster: "/images/vehicles/red.jpg",
    width: 960,
  },
  reviewAva: {
    url: "https://res.cloudinary.com/dkxlrhwjd/video/upload/v1793304602/close-up-of-white-rose-wedding-flower-decor-on-a-r-2026-10-24-02-54-11-utc_1_uhbeqe.mp4", // ← Ava & Sam (the card, bottom left)
    poster: "/images/vehicles/whiteii.jpg",
    width: 720,
  },
  // ▼ Wedding Services "Reserving your date" banner (optional).
  // Leave empty to show the still photo.
  reserving: {
    url: "https://res.cloudinary.com/dkxlrhwjd/video/upload/v1793304602/close-up-of-white-rose-wedding-flower-decor-on-a-r-2026-10-24-02-54-11-utc_1_uhbeqe.mp4", // ← Ava & Sam (the card, bottom left)
    poster: "/images/vehicles/tan.jpg",
    width: 1600,
  },
} satisfies Record<string, VideoEntry>;

export type VideoKey = keyof typeof VIDEOS;

const CLOUDINARY =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/video\/upload\/)(.+)$/;

/**
 * Turns one Cloudinary URL into two light sources: a WebM for browsers
 * that support it and an MP4 for everything else (Safari), both scaled to
 * `width` with automatic quality. Any other URL is used as-is.
 */
export function videoSources(v: VideoEntry): { src: string; type: string }[] {
  if (!v.url) return [];

  const match = v.url.match(CLOUDINARY);
  if (!match) return [{ src: v.url, type: "video/mp4" }];

  const [, base, path] = match;
  const file = path.replace(/\.[a-z0-9]+$/i, ""); // drop .mp4 / .mov
  const t = `q_auto,w_${v.width ?? 1280},c_limit`;

  return [
    { src: `${base}${t}/${file}.webm`, type: "video/webm" },
    { src: `${base}${t}/${file}.mp4`, type: "video/mp4" },
  ];
}
