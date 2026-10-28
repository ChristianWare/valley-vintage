import Image from "next/image";
import Nav from "@/components/shared/Nav/Nav";
import Button from "@/components/shared/Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Nav overlay />

      <div className={styles.content}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>
            Phoenix · Scottsdale · The Valley
          </span>
          <h1 className={styles.heading}>
            Arrive like it&apos;s 1928 in a hand-restored vintage wedding car.
          </h1>
        </div>

        <div className={styles.right}>
          <div className={styles.cardImage}>
            <Image
              src='/images/heroii.jpg'
              alt='A restored vintage car decorated for a wedding'
              fill
              sizes='160px'
              className={styles.img}
            />
          </div>
          <div className={styles.card}>
            <p className={styles.cardText}>
              Five classics, one wedding per car, per day. Check your date.
            </p>
            <div className={styles.cardBtnContainer}>
              <Button
                href='/book'
                text='Check your date'
                btnType='forest'
                arrow
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
