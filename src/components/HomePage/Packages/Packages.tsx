import Link from "next/link";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import styles from "./Packages.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

const packages = [
  {
    name: "The First Ride",
    price: "$395",
    includes: [
      "Ceremony to Reception in the car of your choice",
      "Classic ribbon décor in your color",
      "“Just Married” sign",
      "Chilled water and cool towels",
    ],
    featured: false,
  },
  {
    name: "The Grand Entrance",
    price: "$695",
    includes: [
      "Ceremony Arrival plus Ceremony to Reception",
      "The same car for both rides",
      "Red carpet at the ceremony",
      "Timeline call the week of the wedding",
    ],
    featured: true,
  },
  {
    name: "The Whole Story",
    price: "$1,045",
    includes: [
      "Full Wedding Day for 4 hours",
      "Fresh floral hood arrangement",
      "Champagne toast for two (21+)",
      "Sparkler-lit Grand Exit",
    ],
    featured: false,
  },
];

export default function Packages() {
  return (
    <section className={styles.section} aria-labelledby='packages-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='No surprises' />
            <h2 id='packages-heading' className={`h3 ${styles.heading}`}>
              The price you see is the price you pay.
            </h2>
            <p className={styles.copy}>
              Your total shows every cost, including any travel fee, before you
              pay a deposit. No service charges added later, no &ldquo;call for
              an all-inclusive rate.&rdquo;
            </p>
          </header>

          <ul className={styles.cards}>
            {packages.map((p) => (
              <li
                key={p.name}
                className={`${styles.card} ${p.featured ? styles.featured : ""}`}
              >
                <div className={styles.cardHead}>
                  <h3 className={styles.name}>{p.name}</h3>
                  {p.featured && <p className={styles.badge}>Most booked</p>}
                </div>
                <p className={styles.price}>
                  <small className={styles.from}>from </small>
                  {p.price}
                </p>

                <hr className={styles.rule} />

                <p className={styles.listLabel}>What&apos;s included</p>
                <ul className={styles.list}>
                  {p.includes.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href='/book' className={styles.cta}>
                  Check your date
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.btnContainer}>
            <Button
              href='/weddings'
              text='See pricing'
              btnType='forest'
              arrow
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
