"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import Plus from "@/components/shared/icons/Plus/Plus";
import styles from "./HomeFaq.module.css";

const faqs = [
  {
    q: "How far ahead should we book?",
    a: "Six to twelve months for peak season (October–April), especially Saturdays. Summer and weekday dates often have availability a few weeks out.",
  },
  {
    q: "Will we be hot in a vintage car?",
    a: "Not in our closed cars. Rosalind, Augustine and Delphine have discreet modern climate control. Every ride also has chilled water and cool towels.",
  },
  {
    q: "Can we book a convertible in summer?",
    a: "Clementine and Josephine book October through April only. In summer, we'll suggest a closed car or a golden-hour photo session.",
  },
  {
    q: "What happens if it rains?",
    a: "Monsoon storms usually pass quickly. Convertibles have weather tops, and if lightning or flooding makes driving unsafe, we'll wait it out or swap to a closed car at no charge.",
  },
  {
    q: "Will the car fit my dress?",
    a: "Yes. Our chauffeurs help with the train at every door, and we lay a clean liner on the floor.",
  },
  {
    q: "Do you drive to Sedona or Tucson?",
    a: "No. Vintage cars aren't built for long highway trips, so we keep every ride within the Phoenix metro.",
  },
];

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} aria-labelledby='faq-heading'>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>
            <Eyebrow text='FAQ' />
            <h2 id='faq-heading' className={`h3 ${styles.heading}`}>
              Good questions, honest answers.
            </h2>
          </div>

          <div className={styles.contact}>
            <div className={styles.contactImg}>
              <Image
                src='/images/vehicles/whiteiii.jpg'
                alt='Lucy Ortega, owner and lead coordinator'
                fill
                sizes='120px'
                className={styles.img}
              />
            </div>
            <div className={styles.contactBody}>
              <p className={styles.contactText}>
                Still curious? Lucy replies within a day.
              </p>
              <Button
                href='/contact'
                text='Contact us'
                btnType='forest'
                arrow
              />
            </div>
          </div>
        </div>

        <ul className={styles.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={f.q} className={styles.item}>
                <h3 className={styles.qWrap}>
                  <button
                    type='button'
                    className={styles.q}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <Plus
                      className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                      aria-hidden='true'
                    />
                  </button>
                </h3>
                <div
                  id={id}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.a}>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
