import Nav from "@/components/shared/Nav/Nav";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import styles from "./GalleryIntro.module.css";

export default function GalleryIntro() {
  return (
    <section className={styles.container} aria-labelledby='gallery-heading'>
      <Nav />
      <LayoutWrapper>
        <div className={styles.content}>
          <Luxury className={styles.icon} aria-hidden='true' />
          <Eyebrow text='Gallery' />
          <h1 id='gallery-heading' className={`h2 ${styles.heading}`}>
            Real couples. Real Valley weddings.
          </h1>
          <p className={styles.copy}>
            A few of our favorite moments from ceremonies, first rides and grand
            exits across Phoenix and Scottsdale.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
