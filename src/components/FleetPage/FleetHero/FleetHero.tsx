import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Sparkle from "@/components/shared/icons/Sparkle/Sparkle";
import styles from "./FleetHero.module.css";

const names = ["Rosalind", "Clementine", "Augustine", "Delphine", "Josephine"];

export default function FleetHero() {
  return (
    <section className={styles.hero}>
      <Nav overlay />

      <LayoutWrapper>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            <Sparkle className={styles.sparkle} />
            Meet the family.
          </h1>
          <p className={styles.copy}>
            Five classics, four decades, one garage in central Phoenix. Every
            car is restored by hand, maintained weekly and named by the people
            who brought it back to life.
          </p>
        </div>
      </LayoutWrapper>

      {/* gold marquee of the cars' names */}
      <div className={styles.marquee} aria-hidden='true'>
        <ul className={styles.track}>
          {[...names, ...names, ...names, ...names].map((n, i) => (
            <li key={`${n}-${i}`} className={styles.word}>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
