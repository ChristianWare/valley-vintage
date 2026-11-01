import Nav from "@/components/shared/Nav/Nav";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import styles from "./ContactIntro.module.css";

export default function ContactIntro() {
  return (
    <section className={styles.container} aria-labelledby='contact-heading'>
      <Nav />
      <LayoutWrapper>
        <div className={styles.content}>
          <Luxury className={styles.icon} aria-hidden='true' />
          <Eyebrow text='Contact us' />
          <h1 id='contact-heading' className={`h2 ${styles.heading}`}>
            Come say hello.
          </h1>
          <p className={styles.copy}>
            Questions about a date, a car or a production? Send us a note and
            Lucy will reply within a day. Couples are welcome to visit the
            garage by appointment.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
