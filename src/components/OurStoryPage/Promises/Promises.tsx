import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Calendar from "@/components/shared/icons/Calendar/Calendar";
import Wheel from "@/components/shared/icons/Wheel/Wheel";
import Driver from "@/components/shared/icons/Driver/Driver";
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
            {promises.map(({ Icon, title, text }, i) => (
              <li key={title} className={styles.card}>
                <div className={styles.cardTop}>
                  <Icon className={styles.icon} aria-hidden='true' />
                  <p className={styles.num}>{String(i + 1).padStart(2, "0")}</p>
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </LayoutWrapper>
    </section>
  );
}
