import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import styles from "./FinalCta.module.css";

const photos = [
  "/images/vehicles/red.jpg",
  "/images/vehicles/whiteii.jpg",
  "/images/vehicles/blackyellow.jpg",
  "/images/vehicles/burg.jpg",
  "/images/vehicles/green.jpg",
  "/images/vehicles/tan.jpg",
  "/images/vehicles/blue.jpg",
];

export default function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby='final-heading'>
      <div className={styles.panel}>
        <div className={styles.intro}>
          <Eyebrow text='Peak season' tone='light' />
          <h2 id='final-heading' className={`h3 ${styles.heading}`}>
            Your date won&apos;t wait. Neither will Rosalind.
          </h2>
          <p className={styles.copy}>
            Peak season runs October through April. Check availability in under
            a minute.
          </p>
        </div>

        <div className={styles.marquee} aria-hidden='true'>
          <ul className={styles.track}>
            {[...photos, ...photos].map((src, i) => (
              <li key={`${src}-${i}`} className={styles.photo}>
                <Image
                  src={src}
                  alt=''
                  fill
                  sizes='150px'
                  className={styles.img}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.btnContainer}>
          <Button href='/book' text='Check your date' btnType='gold' arrow />
        </div>
      </div>
    </section>
  );
}
