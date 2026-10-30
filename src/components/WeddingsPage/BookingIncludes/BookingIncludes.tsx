import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import RevealText from "@/components/OurStoryPage/Promises/RevealText";
import styles from "./BookingIncludes.module.css";

const included = [
  {
    title: "A chauffeur who looks the part",
    text: "A pressed suit, white gloves and a flat cap, on every booking.",
    src: "/images/driver.jpg",
  },
  {
    title: "Classic ribbon and bow décor",
    text: "Tied on in ivory, champagne or your wedding color before the car leaves the garage.",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    title: "Chilled water and cool towels",
    text: "Stocked on board every ride, so you step out fresh and ready for photos.",
    src: "/images/couple.jpg",
  },
  {
    title: "A timeline call the week of",
    text: "We walk through every pickup, stop and cue with you or your planner before the big day.",
    src: "/images/ladyDriver.jpg",
  },
  {
    title: "Arrival 20 minutes early",
    text: "Your chauffeur pulls up 20 minutes before your scheduled pickup, decorated and ready.",
    src: "/images/vehicles/red.jpg",
  },
];

const facts = [
  { value: "20 min", label: "Early at every pickup" },
  { value: "$0", label: "Extra for décor" },
  { value: "1", label: "Timeline call, the week of" },
];

const STATEMENT =
  "Every ride arrives early, polished and decorated, with a chauffeur who knows the car and your timeline by heart.";

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

          {/* words darken as you scroll, like the Our Story promises */}
          <RevealText text={STATEMENT} className={`h3 ${styles.statement}`} />

          <ul className={styles.facts}>
            {facts.map((f) => (
              <li key={f.label}>
                <p className={styles.factValue}>{f.value}</p>
                <p className={styles.factLabel}>{f.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </LayoutWrapper>
    </section>
  );
}
