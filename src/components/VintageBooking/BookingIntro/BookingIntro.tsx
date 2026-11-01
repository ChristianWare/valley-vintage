import Nav from "@/components/shared/Nav/Nav";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import styles from "./BookingIntro.module.css";

export default function BookingIntro() {
  return (
    <section className={styles.container} aria-labelledby='book-heading'>
      <Nav />
      <LayoutWrapper>
        <div className={styles.content}>
          <Luxury className={styles.icon} aria-hidden='true' />
          <Eyebrow text='Book your date' />
          <h1 id='book-heading' className={`h2 ${styles.heading}`}>
            Let&apos;s get you to the church on time.
          </h1>
          <p className={styles.copy}>
            Check your date, choose your car and reserve with a $250 deposit. It
            takes about three minutes.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
