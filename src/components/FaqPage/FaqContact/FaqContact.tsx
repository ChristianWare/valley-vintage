import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./FaqContact.module.css";

export default function FaqContact() {
  return (
    <section className={styles.section} aria-labelledby='faq-contact-heading'>
      <LayoutWrapper>
        <div className={styles.card}>
          <div className={styles.photo}>
            <Image
              src='/images/ladyDriver.jpg'
              alt='Lucy Ortega, owner and lead coordinator'
              fill
              sizes='120px'
              className={styles.img}
            />
          </div>
          <div className={styles.text}>
            <h2 id='faq-contact-heading' className={`h5 ${styles.heading}`}>
              Still have a question?
            </h2>
            <p className={styles.copy}>
              Send us a note and Lucy will reply within a day. Ready already?
              Check your date in under a minute.
            </p>
          </div>
          <div className={styles.buttons}>
            <Button href='/contact' text='Contact us' btnType='white' arrow />
            <Button href='/book' text='Check your date' btnType='gold' arrow />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
