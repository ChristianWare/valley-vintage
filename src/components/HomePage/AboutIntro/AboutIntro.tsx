import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import AboutStats from "./AboutStats";
import styles from "./AboutIntro.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

const avatars = [
  { src: "/images/hero.jpg", alt: "A Valley Vintage couple" },
  { src: "/images/heroii.jpg", alt: "A Valley Vintage couple" },
  { src: "/images/heroiii.jpg", alt: "A Valley Vintage couple" },
  { src: "/images/hero.jpg", alt: "A Valley Vintage couple" },
];

const areas = [
  "Downtown Phoenix",
  "Arcadia",
  "Scottsdale",
  "Paradise Valley",
  "Cave Creek",
  "Tempe",
  "Mesa",
  "Gilbert",
  "Glendale",
];

export default function AboutIntro() {
  return (
    <section className={styles.section} aria-labelledby='about-intro-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          {/* Row 1: label + social proof | heading, copy, button */}
          <div className={styles.row}>
            <div className={styles.left}>
              <p className={styles.eyebrow}>About us</p>
              <div className={styles.proof}>
                <div className={styles.avatars}>
                  {avatars.map((a) => (
                    <div key={a.src} className={styles.avatar}>
                      <Image
                        src={a.src}
                        alt={a.alt}
                        fill
                        sizes='40px'
                        className={styles.img}
                      />
                    </div>
                  ))}
                  <div className={styles.avatarCount}>400+</div>
                </div>
                <p className={styles.proofText}>Happy Valley couples</p>
              </div>
            </div>

            <div className={styles.right}>
              <h2 id='about-intro-heading' className={`${styles.heading} h3`}>
                A family garage in central Phoenix, restoring classic cars by
                hand and driving them to the Valley&apos;s most memorable
                weddings.
              </h2>
              <p className={styles.copy}>
                Five restored classics. One wedding per car, per day. Walt
                restores every car in our own garage, and Lucy plans every
                timeline, so every detail is handled before you ever say
                &ldquo;I do.&rdquo;
              </p>
              <div className={styles.btnContainer}>
                <Button
                  href='/our-story'
                  text='Our story'
                  btnType='forest'
                  arrow
                />
              </div>
            </div>
          </div>

          {/* Row 2: stats | two photos */}
          <div className={styles.row}>
            <div className={styles.left}>
              <AboutStats />
            </div>

            <div className={`${styles.right} ${styles.photos}`}>
              <div className={styles.photo}>
                <Image
                  src='/images/heroiii.jpg'
                  alt='A vintage wedding car waiting outside a Phoenix venue'
                  fill
                  sizes='(max-width: 568px) 100vw, (max-width: 968px) 45vw, 420px'
                  className={styles.img}
                />
              </div>
              <div className={styles.photo}>
                <Image
                  src='/images/heroii.jpg'
                  alt='A chauffeur helping a couple into a restored classic car'
                  fill
                  sizes='(max-width: 568px) 100vw, (max-width: 968px) 45vw, 420px'
                  className={styles.img}
                />
              </div>
            </div>
          </div>

          {/* Row 3: service-area marquee */}
          <div className={styles.areas}>
            <p className={styles.areasLabel}>
              Weddings across <br />
              the Valley
            </p>
            <div className={styles.marquee}>
              <ul className={styles.track}>
                {[...areas, ...areas].map((area, i) => (
                  <li
                    key={`${area}-${i}`}
                    className={styles.area}
                    aria-hidden={i >= areas.length ? true : undefined}
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
