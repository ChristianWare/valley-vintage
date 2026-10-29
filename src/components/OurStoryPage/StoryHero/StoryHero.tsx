import Nav from "@/components/shared/Nav/Nav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Sparkle from "@/components/shared/icons/Sparkle/Sparkle";
import styles from "./StoryHero.module.css";

export default function StoryHero() {
  return (
    <section className={styles.hero}>
      <Nav overlay />

      <LayoutWrapper>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            <Sparkle className={styles.sparkle} />
            Our Story
          </h1>
          <p className={`h2 ${styles.copy}`}>
            It started with a barn and a rusty red sedan.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
