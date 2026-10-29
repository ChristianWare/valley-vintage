import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Wedding from "@/components/shared/icons/Wedding/Wedding";
import Car from "@/components/shared/icons/Car/Car";
import Clock from "@/components/shared/icons/Clock/Clock";
import Calendar from "@/components/shared/icons/Calendar/Calendar";
import styles from "./ByTheNumbers.module.css";

const stats = [
  { Icon: Wedding, value: "400+", label: "Valley weddings" },
  { Icon: Car, value: "5", label: "restored classics" },
  { Icon: Clock, value: "9", label: "years on the road" },
  { Icon: Calendar, value: "1", label: "wedding per car, per day" },
];

const words = ["Restored", "Polished", "Family-run", "Timeless", "Romance"];

export default function ByTheNumbers() {
  return (
    <section className={styles.section} aria-labelledby='numbers-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.left}>
            <Eyebrow text='By the numbers' />
            <h2 id='numbers-heading' className={`h3 ${styles.heading}`}>
              Nine years on the road, and every ride still matters.
            </h2>

            <ul className={styles.list}>
              {stats.map(({ Icon, value, label }) => (
                <li key={label} className={styles.item}>
                  <div className={styles.iconCircle}>
                    <Icon className={styles.icon} aria-hidden='true' />
                  </div>
                  <p className={styles.stat}>
                    <strong className={styles.value}>{value}</strong> {label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.photo}>
            <Image
              src='/images/vehicles/blueiii.jpg'
              alt='A restored classic polished and ready outside the garage'
              fill
              sizes='(max-width: 968px) 100vw, 45vw'
              className={styles.img}
            />
          </div>
        </div>
      </LayoutWrapper>

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
