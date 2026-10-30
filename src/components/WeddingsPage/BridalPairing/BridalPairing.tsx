import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Car from "@/components/shared/icons/Car/Car";
import Users from "@/components/shared/icons/Users/Users";
import styles from "./BridalPairing.module.css";

const parts = [
  {
    Icon: Car,
    title: "The classic for you two",
    text: "The couple rides in the vintage car of their choice.",
  },
  {
    Icon: Users,
    title: "A Sprinter for the crew",
    text: "Your wedding party follows in a climate-controlled 14-passenger Sprinter from our black car partner.",
  },
];

export default function BridalPairing() {
  return (
    <section className={styles.section} aria-labelledby='pairing-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.photo}>
            <Image
              src='/images/couple.jpg'
              alt='A couple and their wedding party beside a classic car'
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              className={styles.img}
            />
          </div>

          <div className={styles.right}>
            <div className={styles.top}>
              <Eyebrow text='Bridal Party Pairing · from $1,095' />
              <h2 id='pairing-heading' className={styles.heading}>
                Bring the whole crew.
              </h2>
              <p className={styles.copy}>
                Your bridesmaids and groomsmen want to be there for every photo.
                The Pairing keeps everyone together, on time and cool, while you
                two get the classic.
              </p>
            </div>

            <ul className={styles.cards}>
              {parts.map(({ Icon, title, text }) => (
                <li key={title} className={styles.card}>
                  <Icon className={styles.icon} aria-hidden='true' />
                  <div>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardText}>{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.bottom}>
              <p className={styles.note}>
                Both vehicles are booked together for 3 hours on one timeline,
                one invoice and one coordinator.
              </p>
              <Button
                href='/book'
                text='Book the Pairing'
                btnType='forest'
                arrow
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
