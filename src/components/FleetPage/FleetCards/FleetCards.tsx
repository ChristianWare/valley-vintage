import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import styles from "./FleetCards.module.css";

const cars = [
  {
    id: "rosalind",
    name: "Rosalind",
    body: "1928 touring sedan",
    color: "Carriage red & black",
    riders: "2",
    climate: "Yes",
    bestFor: "Ceremony arrivals, first rides",
    src: "/images/vehicles/red.jpg",
  },
  {
    id: "clementine",
    name: "Clementine",
    body: "1931 convertible roadster",
    color: "Champagne cream",
    riders: "2",
    climate: "Open top",
    bestFor: "Photos, spring and fall exits",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    id: "augustine",
    name: "Augustine",
    body: "1936 formal limousine",
    color: "Lacquer black",
    riders: "4",
    climate: "Yes",
    bestFor: "Bride + family, bridal party",
    src: "/images/vehicles/blackyellow.jpg",
  },
  {
    id: "delphine",
    name: "Delphine",
    body: "1949 fastback sedan",
    color: "Seafoam green",
    riders: "3",
    climate: "Yes",
    bestFor: "Summer weddings, rides to the reception",
    src: "/images/vehicles/burg.jpg",
  },
  {
    id: "josephine",
    name: "Josephine",
    body: "1957 convertible",
    color: "Desert-rose pink",
    riders: "3",
    climate: "Open top",
    bestFor: "Grand exits, photo sessions",
    src: "/images/vehicles/green.jpg",
  },
];

export default function FleetCards() {
  return (
    <section className={styles.section} aria-labelledby='glance-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='At a glance' />
            <h2 id='glance-heading' className={styles.heading}>
              Five classics, each with a name and a story
            </h2>
            <p className={styles.note}>
              Rider counts assume a full gown takes a seat and a half.
              Convertibles are booked October through April only.
            </p>
          </header>

          {/* each card sticks near the top; the next one scrolls over it */}
          <ol className={styles.stack}>
            {cars.map((c, i) => (
              <li key={c.id} id={c.id} className={styles.card}>
                <div className={styles.colTitle}>
                  <div className={styles.titleRow}>
                    <p className={styles.num}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className={`h6 ${styles.name}`}>{c.name}</h3>
                  </div>
                  <Link href='/contact' className={styles.link}>
                    Ask about {c.name}
                    <Arrow className={styles.linkArrow} aria-hidden='true' />
                  </Link>
                </div>

                <div className={styles.colInfo}>
                  <dl className={styles.specs}>
                    <div className={styles.spec}>
                      <dt>Year &amp; body</dt>
                      <dd>{c.body}</dd>
                    </div>
                    <div className={styles.spec}>
                      <dt>Color</dt>
                      <dd>{c.color}</dd>
                    </div>
                    <div className={styles.spec}>
                      <dt>Riders</dt>
                      <dd>{c.riders}</dd>
                    </div>
                    <div className={styles.spec}>
                      <dt>Climate control</dt>
                      <dd>{c.climate}</dd>
                    </div>
                    <div className={styles.spec}>
                      <dt>Best for</dt>
                      <dd>{c.bestFor}</dd>
                    </div>
                  </dl>
                  <div className={styles.btnContainer}>
                    <Button
                      href='/book'
                      text={`Book ${c.name}`}
                      btnType='forest'
                      arrow
                    />
                  </div>
                </div>

                <div className={styles.photo}>
                  <Image
                    src={c.src}
                    alt={`${c.name}, our ${c.body} in ${c.color.toLowerCase()}`}
                    fill
                    sizes='(max-width: 768px) 100vw, 440px'
                    className={styles.img}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </LayoutWrapper>
    </section>
  );
}
