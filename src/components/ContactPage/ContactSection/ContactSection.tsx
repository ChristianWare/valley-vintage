"use client";

// Contact details + a message form. Portfolio demo: the form checks the
// fields and shows a thank-you, but nothing is sent anywhere.

import { useState, type FormEvent } from "react";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Phone from "@/components/shared/icons/Phone/Phone";
import Email from "@/components/shared/icons/Email/Email";
import Location from "@/components/shared/icons/Location/Location";
import Clock from "@/components/shared/icons/Clock/Clock";
import { SITE } from "@/config/site";
import styles from "./ContactSection.module.css";

const TOPICS = [
  "A wedding",
  "An anniversary or celebration",
  "Prom, homecoming or quinceañera",
  "Film, photo or commercial",
  "Planner account",
  "Something else",
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email.includes("@") || !message) {
      setError("Please add your name, a valid email and a short message.");
      return;
    }
    setError("");
    setSent(true);
  };

  const details = [
    {
      Icon: Phone,
      label: "Call or text",
      value: SITE.phone.display,
      href: `tel:${SITE.phone.tel}`,
    },
    {
      Icon: Email,
      label: "Email",
      value: SITE.email.info,
      href: `mailto:${SITE.email.info}`,
    },
    {
      Icon: Location,
      label: "The garage (by appointment)",
      value: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}`,
    },
    {
      Icon: Clock,
      label: "Office hours",
      value: "Mon–Fri 9am–5pm · Weddings every weekend",
    },
  ];

  return (
    <section className={styles.section} aria-label='Get in touch'>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.photo}>
              <Image
                src='/images/ladyDriver.jpg'
                alt='Lucy Ortega, owner and lead coordinator'
                fill
                sizes='(max-width: 968px) 100vw, 40vw'
                className={styles.img}
              />
            </div>
            <ul className={styles.details}>
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className={styles.detail}>
                  <Icon className={styles.icon} aria-hidden='true' />
                  <div>
                    <p className={styles.label}>{label}</p>
                    {href ? (
                      <a href={href} className={styles.value}>
                        {value}
                      </a>
                    ) : (
                      <p className={styles.value}>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.formCard}>
            {sent ? (
              <div className={styles.thanks} role='status'>
                <h2 className={`h5 ${styles.formTitle}`}>Thank you!</h2>
                <p className={styles.copy}>
                  Lucy will reply within a day. (This is a portfolio demo, so
                  your message wasn&apos;t actually sent.)
                </p>
                <button
                  type='button'
                  className={styles.secondary}
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <h2 className={`h5 ${styles.formTitle}`}>Send us a note</h2>
                <div className={styles.row2}>
                  <label className={styles.field}>
                    Your name
                    <input name='name' autoComplete='name' required />
                  </label>
                  <label className={styles.field}>
                    Phone (optional)
                    <input name='phone' type='tel' autoComplete='tel' />
                  </label>
                </div>
                <label className={styles.field}>
                  Email
                  <input
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                  />
                </label>
                <div className={styles.row2}>
                  <label className={styles.field}>
                    What&apos;s it for?
                    <select name='topic' defaultValue={TOPICS[0]}>
                      {TOPICS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    Event date (if you have one)
                    <input name='date' type='date' />
                  </label>
                </div>
                <label className={styles.field}>
                  Message
                  <textarea name='message' rows={5} required />
                </label>
                {error && (
                  <p className={styles.error} role='alert'>
                    {error}
                  </p>
                )}
                <button type='submit' className={styles.primary}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
