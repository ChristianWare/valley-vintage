"use client";

// "It's a date." Reads the demo booking saved by the wizard in this tab.
// Nothing was charged or emailed; the page just shows what a real couple
// would see, plus an Add to Calendar file built in the browser.

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import {
  STORAGE_KEY,
  balanceDate,
  formatDate,
  formatMoney,
  formatTime,
  type ConfirmedBooking,
} from "@/lib/vintageBooking/data";
import { SITE } from "@/config/site";
import styles from "./Confirmation.module.css";

const subscribe = () => () => {};
const readStored = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

function icsFor(b: ConfirmedBooking) {
  const [h, m] = b.time.split(":").map(Number);
  const start = `${b.date.replaceAll("-", "")}T${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  const endH = h + (b.hours ?? 2);
  const end = `${b.date.replaceAll("-", "")}T${String(Math.min(endH, 23)).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Valley Vintage Carriage Co.//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${b.ref}@valleyvintagecarriage.com`,
    `DTSTART;TZID=America/Phoenix:${start}`,
    `DTEND;TZID=America/Phoenix:${end}`,
    `SUMMARY:${b.carName} · ${b.serviceName}`,
    `DESCRIPTION:Booking ${b.ref} with ${SITE.name}. Your chauffeur arrives 20 minutes early.`,
    `LOCATION:${b.stops[0]?.value ?? "Phoenix, AZ"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function Confirmation() {
  // read after hydration; the server renders the "no booking" state
  const raw = useSyncExternalStore(subscribe, readStored, () => null);

  let booking: ConfirmedBooking | null = null;
  try {
    booking = raw ? (JSON.parse(raw) as ConfirmedBooking) : null;
  } catch {
    booking = null;
  }

  if (!booking) {
    return (
      <div className={styles.card}>
        <Luxury className={styles.icon} aria-hidden='true' />
        <h1 className={`h2 ${styles.heading}`}>No booking to show yet.</h1>
        <p className={styles.copy}>
          Start with your date and we&apos;ll show you which cars are free.
        </p>
        <div className={styles.buttons}>
          <Link href='/book' className={styles.primary}>
            Check your date
          </Link>
        </div>
      </div>
    );
  }

  const b = booking;
  const download = () => {
    const blob = new Blob([icsFor(b)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `valley-vintage-${b.ref}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.card}>
      <Luxury className={styles.icon} aria-hidden='true' />
      <p className={styles.ref}>Booking {b.ref}</p>
      <h1 className={`h2 ${styles.heading}`}>It&apos;s a date.</h1>
      <p className={styles.copy}>
        {b.carName} is reserved for {formatDate(b.date)}. A confirmation would
        be on its way to {b.email}, and Lucy would reach out about two weeks
        before to plan your timeline.
      </p>

      <dl className={styles.details}>
        <div>
          <dt>Service</dt>
          <dd>
            {b.serviceName}
            {b.hours ? ` · ${b.hours} hrs` : ""}
          </dd>
        </div>
        <div>
          <dt>Car</dt>
          <dd>{b.carName}</dd>
        </div>
        <div>
          <dt>Start</dt>
          <dd>Around {formatTime(b.time)}</dd>
        </div>
        <div>
          <dt>Riders</dt>
          <dd>
            {b.riders} · {b.names}
          </dd>
        </div>
        {b.stops.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>

      <ul className={styles.lines}>
        {b.lines.map((l) => (
          <li key={l.label}>
            <span>{l.label}</span>
            <span>{formatMoney(l.amount)}</span>
          </li>
        ))}
        <li className={styles.total}>
          <span>Total</span>
          <span>{formatMoney(b.total)}</span>
        </li>
        <li>
          <span>Deposit paid</span>
          <span>{formatMoney(b.deposit)}</span>
        </li>
        <li>
          <span>Balance, charged {balanceDate(b.date)}</span>
          <span>{formatMoney(b.balance)}</span>
        </li>
      </ul>

      <p className={styles.demo}>
        Portfolio demo: no payment was taken and no emails were sent.
      </p>

      <div className={styles.buttons}>
        <button type='button' className={styles.primary} onClick={download}>
          Add to calendar
        </button>
        <Link href='/' className={styles.secondary}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
