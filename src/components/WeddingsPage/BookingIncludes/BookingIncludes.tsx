import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./BookingIncludes.module.css";

const included = [
  {
    title: "A chauffeur who looks the part",
    text: "A pressed suit, white gloves and a flat cap. Your chauffeur arrives 20 minutes before your scheduled pickup.",
    src: "/images/driver.jpg",
  },
  {
    title: "Classic ribbon and bow décor",
    text: "Tied on in ivory, champagne or your wedding color before the car ever leaves the garage.",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    title: "Cool, calm and on time",
    text: "Chilled water and cool towels on board, plus a timeline call with you or your planner the week of the wedding.",
    src: "/images/couple.jpg",
  },
];

export default function BookingIncludes() {
  return (
    <section className={styles.section} aria-labelledby='includes-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='Every booking includes' />
            <h2 id='includes-heading' className={styles.heading}>
              The details we never charge extra for
            </h2>
          </header>

          <ul className={styles.cards}>
            {included.map((c) => (
              <li key={c.title} className={styles.card}>
                <div className={styles.textBox}>
                  <h3 className={`h6 ${styles.title}`}>{c.title}</h3>
                  <p className={styles.text}>{c.text}</p>
                </div>
                <div className={styles.thumb}>
                  <Image
                    src={c.src}
                    alt=''
                    fill
                    sizes='100px'
                    className={styles.img}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </LayoutWrapper>
    </section>
  );
}
