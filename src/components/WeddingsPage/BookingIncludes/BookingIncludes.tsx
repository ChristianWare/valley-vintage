import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import RevealText from "@/components/OurStoryPage/Promises/RevealText";
import Driver from "@/components/shared/icons/Driver/Driver";
import Wedding from "@/components/shared/icons/Wedding/Wedding";
import Sparkle from "@/components/shared/icons/Sparkle/Sparkle";
// import Phone from "@/components/shared/icons/Phone/Phone";
// import Clock from "@/components/shared/icons/Clock/Clock";
import styles from "./BookingIncludes.module.css";

const included = [
  {
    title: "A chauffeur who looks the part",
    text: "A pressed suit, white gloves and a flat cap, on every booking.",
    Icon: Driver,
  },
  {
    title: "Classic ribbon and bow décor",
    text: "Tied on in ivory, champagne or your wedding color before the car leaves the garage.",
    Icon: Wedding,
  },
  {
    title: "Chilled water and cool towels",
    text: "Stocked on board every ride, so you step out fresh and ready for photos.",
    Icon: Sparkle,
  },
  // {
  //   title: "A timeline call the week of",
  //   text: "We walk through every pickup, stop and cue with you or your planner before the big day.",
  //   Icon: Phone,
  // },
  // {
  //   title: "Arrival 20 minutes early",
  //   text: "Your chauffeur pulls up 20 minutes before your scheduled pickup, decorated and ready.",
  //   Icon: Clock,
  // },
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
            {included.map(({ Icon, title, text }) => (
              <li key={title} className={styles.card}>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardText}>{text}</p>
                </div>
                <Icon className={styles.icon} aria-hidden='true' />
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
