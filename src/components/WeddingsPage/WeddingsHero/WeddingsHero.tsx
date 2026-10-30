import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/shared/Nav/Nav";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./WeddingsHero.module.css";

const photos = [
  { src: "/images/wedding/wedding1.jpg", alt: "A ribbon-wrapped classic car" },
  {
    src: "/images/wedding/wedding2.jpg",
    alt: "A couple beside their wedding car",
  },
  { src: "/images/wedding/wedding3.jpg", alt: "Rosalind outside a venue" },
  { src: "/images/wedding/wedding4.jpg", alt: "A chauffeur holding the door" },
  { src: "/images/wedding/wedding5.jpg", alt: "A convertible ready for an exit" },
  { src: "/images/wedding/wedding6.jpg", alt: "A classic car at golden hour" },
];

export default function WeddingsHero() {
  return (
    <>
      <Nav />
      <section className={styles.hero} aria-labelledby='weddings-heading'>
        <LayoutWrapper>
          <div className={styles.intro}>
            <Eyebrow text='Wedding services' />
            <h1 id='weddings-heading' className={styles.heading}>
              Your entrance. Your exit. Every mile in between.
            </h1>
            <div className={styles.buttons}>
              <Button
                href='/book'
                text='Check your date'
                btnType='forest'
                arrow
              />
              <Link href='#packages' className={styles.outline}>
                See packages
              </Link>
            </div>
          </div>
        </LayoutWrapper>

        {/* image marquee, full width */}
        <div className={styles.marquee}>
          <ul className={styles.track}>
            {[...photos, ...photos].map((p, i) => (
              <li
                key={`${p.src}-${i}`}
                className={styles.photo}
                aria-hidden={i >= photos.length ? true : undefined}
              >
                <Image
                  src={p.src}
                  alt={i >= photos.length ? "" : p.alt}
                  fill
                  sizes='424px'
                  className={styles.img}
                />
              </li>
            ))}
          </ul>
        </div>

        <LayoutWrapper>
          <h2 className={`h6 ${styles.copy}`}>
            Choose one perfect moment or let us carry you through the whole day.
            Every booking includes a uniformed chauffeur, classic ribbon décor
            and chilled water on board.
          </h2>
        </LayoutWrapper>
      </section>
    </>
  );
}
