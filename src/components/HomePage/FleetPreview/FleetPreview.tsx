import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button/Button";
import styles from "./FleetPreview.module.css";

// Swap these photos for the real car shots when you have them
const cars = [
  {
    name: "Clementine",
    year: "1931",
    line: "Top down, veil up.",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    name: "Rosalind",
    year: "1928",
    line: "Our crimson original and the face of every first ride.",
    src: "/images/vehicles/red.jpg",
  },
  {
    name: "Augustine",
    year: "1936",
    line: "Formal, black and roomy enough for the whole bridal party.",
    src: "/images/vehicles/blackyellow.jpg",
  },
  {
    name: "Delphine",
    year: "1949",
    line: "Seafoam curves and a rear bench made for two.",
    src: "/images/vehicles/burg.jpg",
  },
  {
    name: "Josephine",
    year: "1957",
    line: "Desert-rose pink and pure joy.",
    src: "/images/vehicles/green.jpg",
  },
];

const words = ["Romance", "Chrome", "Ribbons", "Sparklers", "Timeless"];

export default function FleetPreview() {
  return (
    <section className={styles.section} aria-labelledby='fleet-heading'>
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>The fleet</p>
          <h2 id='fleet-heading' className={`h3 ${styles.heading}`}>
            Each car has a name. Each one has a story.
          </h2>
          <p className={styles.copy}>
            Our fleet spans four decades of American motoring, from a 1928
            touring sedan to a 1957 convertible the color of a desert rose.
            Every car is restored in our own Phoenix garage and driven by a
            chauffeur who knows it by heart.
          </p>
          <div className={styles.btnContainer}>
            <Button
              href='/fleet'
              text='See the full fleet'
              btnType='gold'
              arrow
            />
          </div>
        </header>

        {/* Each card sticks at the top; the next one scrolls over it */}
        <ol className={styles.stack}>
          {cars.map((car, i) => (
            <li key={car.name} className={styles.card}>
              <Link
                href={`/fleet#${car.name.toLowerCase()}`}
                className={styles.imgLink}
                aria-label={`Meet ${car.name}, our ${car.year} classic`}
              >
                <Image
                  src={car.src}
                  alt={`${car.name}, a restored ${car.year} wedding car`}
                  fill
                  sizes='(max-width: 968px) 100vw, 822px'
                  className={styles.img}
                />
              </Link>
              <div className={styles.cardText}>
                <div className={styles.titleRow}>
                  <p className={`${styles.num} h6`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={`h6 ${styles.cardTitle}`}>{car.name}</h3>
                </div>
                <p className={styles.line}>
                  {car.year} · {car.line}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.marquee} aria-hidden='true'>
        <ul className={styles.track}>
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <li key={`${w}-${i}`} className={styles.word}>
              {w}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
