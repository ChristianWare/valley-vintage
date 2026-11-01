import Nav from "@/components/shared/Nav/Nav";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import styles from "./FaqIntro.module.css";

export default function FaqIntro() {
  return (
    <section className={styles.container} aria-labelledby='faq-page-heading'>
      <Nav />
      <LayoutWrapper>
        <div className={styles.content}>
          <Luxury className={styles.icon} aria-hidden='true' />
          <Eyebrow text='FAQ' />
          <h1 id='faq-page-heading' className={`h2 ${styles.heading}`}>
            Good questions, honest answers.
          </h1>
          <p className={styles.copy}>
            Everything couples ask us before they book. Still curious? Send us a
            note and Lucy will reply within a day.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
