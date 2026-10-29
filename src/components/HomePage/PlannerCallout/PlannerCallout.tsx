import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import styles from "./PlannerCallout.module.css";

export default function PlannerCallout() {
  return (
    <section className={styles.section} aria-labelledby='planner-heading'>
      <div className={styles.container}>
        <header className={styles.intro}>
          <Eyebrow text='For planners' />
          <h2 id='planner-heading' className={`h3 ${styles.heading}`}>
            Wedding planner or venue?
          </h2>
          <p className={styles.copy}>
            Book for every couple you work with from one account, with saved
            venues and a single monthly invoice.
          </p>
          <div className={styles.btnContainer}>
            <Button
              href='/planners'
              text='Open a planner account'
              btnType='forest'
              arrow
            />
          </div>
        </header>

        <div className={styles.tiles}>
          <div className={styles.tile}>
            <Image
              src='/images/vehicles/blackandwhite.jpg'
              alt='A chauffeur waiting beside a classic car at a venue'
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              className={styles.img}
            />
          </div>
          <div className={`${styles.tile} ${styles.statTile}`}>
            <p className={styles.statLabel}>Planner accounts</p>
            <p className={styles.statValue}>1</p>
            <p className={styles.statText}>monthly invoice for every couple</p>
          </div>
          <div className={styles.tile}>
            <Image
              src='/images/vehicles/blue.jpg'
              alt='A restored convertible decorated for a wedding'
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
