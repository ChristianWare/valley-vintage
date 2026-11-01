"use client";

// Full FAQ, grouped by topic. A sticky topic list on the left jumps to each
// group; each group is an accordion (one answer open at a time per group).
// On smaller screens the topics become a row of pills above the questions.

import { useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Plus from "@/components/shared/icons/Plus/Plus";
import styles from "./FaqGroups.module.css";

const groups = [
  {
    id: "booking",
    title: "Booking & payment",
    faqs: [
      {
        q: "How far ahead should we book?",
        a: "Six to twelve months for peak season (October–April), especially Saturdays. Summer and weekday dates often have availability a few weeks out.",
      },
      {
        q: "What does the deposit cover?",
        a: "The $250 deposit holds your car and chauffeur and is applied to your total. The balance is charged automatically 14 days before the wedding.",
      },
      {
        q: "What's your cancellation policy?",
        a: "Cancel more than 90 days out and we refund your deposit. Within 90 days, the deposit is non-refundable but can be moved to a new date within 12 months.",
      },
      {
        q: "Are your prices all-inclusive?",
        a: "Yes. Your total includes the car, chauffeur, décor and any travel fee, with no service charge added later. The only optional extra is gratuity: many couples add 15–20% for their chauffeur at checkout or after the ride.",
      },
    ],
  },
  {
    id: "weather",
    title: "Arizona weather",
    faqs: [
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
    ],
  },
  {
    id: "the-day",
    title: "The day itself",
    faqs: [
      {
        q: "How many people fit?",
        a: "Two to four riders, depending on the car. A full gown takes about a seat and a half, so we count it that way.",
      },
      {
        q: "Will the car fit my dress?",
        a: "Yes. Our chauffeurs help with the train at every door, and we lay a clean liner on the floor.",
      },
      {
        q: "When will the chauffeur arrive?",
        a: "20 minutes before your scheduled pickup, decorated and ready.",
      },
      {
        q: "Can we drink in the car?",
        a: "Our champagne toast add-on is available for riders 21 and older. Outside alcohol isn't permitted.",
      },
      {
        q: "Do you drive to Sedona or Tucson?",
        a: "No. Vintage cars aren't built for long highway trips, so we keep every ride within the Phoenix metro.",
      },
    ],
  },
  {
    id: "planners",
    title: "Planners & vendors",
    faqs: [
      {
        q: "Do you work with planners?",
        a: "Constantly. Planner accounts let you book for multiple couples, save venues and receive one monthly invoice.",
      },
      {
        q: "Can our photographer use the car?",
        a: "Absolutely. Photo time is built into every service, and chauffeurs will move the car for the best light.",
      },
    ],
  },
];

export default function FaqGroups() {
  // open question per group: "groupId-index"; first question starts open
  const [open, setOpen] = useState<string | null>("booking-0");

  return (
    <section className={styles.section} aria-label='Frequently asked questions'>
      <LayoutWrapper>
        <div className={styles.container}>
          <nav className={styles.topics} aria-label='FAQ topics'>
            <ul className={styles.topicList}>
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className={styles.topic}>
                    {g.title}
                    <span className={styles.count}>{g.faqs.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.groups}>
            {groups.map((g) => (
              <div key={g.id} id={g.id} className={styles.group}>
                <h2 className={`h5 ${styles.groupTitle}`}>{g.title}</h2>
                <ul className={styles.list}>
                  {g.faqs.map((f, i) => {
                    const key = `${g.id}-${i}`;
                    const isOpen = open === key;
                    return (
                      <li key={key} className={styles.item}>
                        <h3 className={styles.qWrap}>
                          <button
                            type='button'
                            className={styles.q}
                            aria-expanded={isOpen}
                            aria-controls={`${key}-answer`}
                            onClick={() => setOpen(isOpen ? null : key)}
                          >
                            {f.q}
                            <Plus
                              className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                              aria-hidden='true'
                            />
                          </button>
                        </h3>
                        <div
                          id={`${key}-answer`}
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
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
