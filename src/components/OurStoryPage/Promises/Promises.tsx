import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Calendar from "@/components/shared/icons/Calendar/Calendar";
import Wheel from "@/components/shared/icons/Wheel/Wheel";
import Driver from "@/components/shared/icons/Driver/Driver";
import RevealText from "./RevealText";
import styles from "./Promises.module.css";

const promises = [
  {
    Icon: Calendar,
    title: "One wedding per car, per day",
    text: "No rushing between events, no back-to-back bookings. Your car is yours.",
  },
  {
    Icon: Wheel,
    title: "Restored, not replica",
    text: "Every car is a genuine classic with original body and character, updated with modern brakes, wiring and climate control where it counts.",
  },
  {
    Icon: Driver,
    title: "Chauffeurs who care",
    text: "Our drivers are background-checked, trained on each car and on wedding-day timing. Most have worked with us for years.",
  },
];

const facts = [
  { value: "20 min", label: "Early at every pickup" },
  { value: "$250", label: "Deposit holds your date" },
  { value: "$0", label: "Service charges, ever" },
];

const STATEMENT =
  "We restore every car by hand, give each one to a single couple per day, and treat your timeline like it belongs to our own family.";

export default function Promises() {
  return (
    <section className={styles.section} aria-labelledby='promises-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='Our promises' />
            <h2 id='promises-heading' className={`h3 ${styles.heading}`}>
              Three things every couple can count on.
            </h2>
          </header>

          <ol className={styles.cards}>
            {promises.map(({ Icon, title, text }) => (
              <li key={title} className={styles.card}>
                <div className={styles.cardBottom}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardText}>{text}</p>
                </div>
                <div className={styles.cardTop}>
                  <Icon className={styles.icon} aria-hidden='true' />
                </div>
              </li>
            ))}
          </ol>

          <RevealText text={STATEMENT} className={`h3 ${styles.statement}`} />

          <ul className={styles.facts}>
            {facts.map((f) => (
              <li key={f.label} className={styles.fact}>
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
