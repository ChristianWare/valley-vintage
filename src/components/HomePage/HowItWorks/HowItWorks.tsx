import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Calendar from "@/components/shared/icons/Calendar/Calendar";
import Wedding from "@/components/shared/icons/Wedding/Wedding";
import Deposit from "@/components/shared/icons/Deposit/Deposit";
import Car from "@/components/shared/icons/Car/Car";
import styles from "./HowItWorks.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

const steps = [
  {
    Icon: Calendar,
    title: "Check your date",
    text: "Pick your wedding date and see which cars are free. Each car books once per day, so popular dates go quickly.",
  },
  {
    Icon: Wedding,
    title: "Choose your moment",
    text: "Ceremony arrival, the first ride as newlyweds, a grand exit, or the whole day.",
  },
  {
    Icon: Deposit,
    title: "Reserve with a deposit",
    text: "A $250 deposit holds your car and chauffeur. The balance is due 14 days before the wedding.",
  },
  {
    Icon: Car,
    title: "Enjoy the ride",
    text: "We confirm the timeline with you (or your planner) the week of, and arrive early, polished and decorated.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby='how-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.intro}>
              <Eyebrow text='How it works' />
              <h2 id='how-heading' className={` ${styles.heading}`}>
                Booking your car takes about three minutes.
              </h2>
            </div>
            <div className={styles.photo}>
              <Image
                src='/images/couple.jpg'
                alt='A restored classic car parked outside a Valley wedding venue'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className={styles.img}
              />
            </div>
          </div>

          <ol className={styles.cards}>
            {steps.map(({ Icon, title, text }, i) => (
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
