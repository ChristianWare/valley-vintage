import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./MeetTheTeam.module.css";

// Swap these for real portraits (e.g. /images/team/lucy.jpg) when you have them
const team = [
  {
    name: "Lucy Ortega",
    role: "Owner & Lead Coordinator",
    line: "Plans every timeline and answers most of your emails.",
    src: "/images/vehicles/whiteiii.jpg",
  },
  {
    name: "Walt Ortega",
    role: "Founder & Head Restorer",
    line: "Still under a hood most mornings.",
    src: "/images/vehicles/blackandwhite.jpg",
  },
  {
    name: "Dominic Reyes",
    role: "Lead Chauffeur",
    line: "Has driven more than 400 weddings and never missed a cue.",
    src: "/images/vehicles/tan.jpg",
  },
];

export default function MeetTheTeam() {
  return (
    <section className={styles.section} aria-labelledby='team-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='Meet the team' />
            <h2 id='team-heading' className={styles.heading}>
              The family behind every first ride
            </h2>
          </header>

          <ul className={styles.cards}>
            {team.map((p) => (
              <li key={p.name} className={styles.card}>
                <Image
                  src={p.src}
                  alt={`${p.name}, ${p.role}`}
                  fill
                  sizes='(max-width: 768px) 100vw, 33vw'
                  className={styles.img}
                />
                <div className={styles.info}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.role}>{p.role}</p>
                  <p className={styles.line}>{p.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </LayoutWrapper>
    </section>
  );
}
