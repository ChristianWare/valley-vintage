"use client";

// The Valley Vintage booking flow (portfolio demo). Seven steps, date first
// because each car books once per day. Nothing is sent or charged: on
// "Reserve" the booking is saved in this browser tab and the confirmation
// page reads it back.

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ADD_ONS,
  BALANCE_DAYS_BEFORE,
  CARS,
  CONVERTIBLE_MONTHS,
  DEPOSIT,
  EXTRA_HOUR,
  PAIRINGS,
  RIBBONS,
  SERVICES,
  STOP_LABELS,
  STORAGE_KEY,
  balanceDate,
  bookedCarFor,
  formatDate,
  formatMoney,
  formatTime,
  monthOf,
  type ConfirmedBooking,
} from "@/lib/vintageBooking/data";
import styles from "./BookingWizard.module.css";

const STEPS = [
  "Your date",
  "Your service",
  "Your car",
  "Your route",
  "Your party",
  "Make it yours",
  "Reserve",
];

const GROUPS = ["Weddings", "Celebrations", "Photo & Film"] as const;

// short, stable reference number from the contact details
function refSuffix(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 9000;
  return String(1000 + h);
}

function todayIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function BookingWizard({
  initialService,
  initialCar,
}: {
  initialService?: string;
  initialCar?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  // Step 1
  const [date, setDate] = useState("");
  const [time, setTime] = useState("15:00");
  // Step 2
  const [serviceId, setServiceId] = useState(
    SERVICES.some((s) => s.id === initialService) ? initialService! : "",
  );
  const [hours, setHours] = useState(0);
  // Step 3
  const [carId, setCarId] = useState(
    CARS.some((c) => c.id === initialCar) ? initialCar! : "",
  );
  const [pairings, setPairings] = useState<string[]>([]);
  // Step 4
  const [stops, setStops] = useState<Record<string, string>>({});
  // Step 5
  const [names, setNames] = useState("");
  const [riders, setRiders] = useState(2);
  const [gown, setGown] = useState("yes");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [planner, setPlanner] = useState("");
  // Step 6
  const [ribbon, setRibbon] = useState(RIBBONS[0]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  // Step 7
  const [agree, setAgree] = useState(false);

  const service = SERVICES.find((s) => s.id === serviceId);
  const car = CARS.find((c) => c.id === carId);
  const month = date ? monthOf(date) : 0;
  const bookedCar = bookedCarFor(date);
  const isWedding = service?.group === "Weddings";
  const minHours = service?.minHours ?? 0;
  const totalHours = Math.max(minHours, hours || minHours);

  const servicesForDate = SERVICES.filter(
    (s) => !s.months || !date || s.months.includes(month),
  );

  const carStatus = (id: string) => {
    const c = CARS.find((x) => x.id === id)!;
    if (id === bookedCar) return "Booked on this date";
    if (c.convertible && date && !CONVERTIBLE_MONTHS.includes(month))
      return "Available October–April";
    if (riders > c.riders) return `Seats ${c.riders} riders`;
    return "";
  };

  // ---------- Pricing ----------
  const lines = useMemo(() => {
    const out: { label: string; amount: number }[] = [];
    if (!service || service.model === "quote") return out;
    out.push({
      label:
        service.model === "hourly"
          ? `${service.name} (${minHours} hrs)`
          : service.name,
      amount: service.price,
    });
    const extra = totalHours - minHours;
    if (service.model === "hourly" && extra > 0)
      out.push({
        label: `Extra time (${extra} hr${extra > 1 ? "s" : ""})`,
        amount: extra * EXTRA_HOUR,
      });
    [...PAIRINGS, ...ADD_ONS]
      .filter((a) => pairings.includes(a.id) || addOns.includes(a.id))
      .forEach((a) => out.push({ label: a.name, amount: a.price }));
    out.push({ label: "Travel fee (within 25 miles)", amount: 0 });
    return out;
  }, [service, minHours, totalHours, pairings, addOns]);

  const total = lines.reduce((n, l) => n + l.amount, 0);

  // ---------- Validation ----------
  const validate = (): string => {
    switch (step) {
      case 0:
        if (!date) return "Pick your date to see which cars are free.";
        if (date < todayIso()) return "Please choose a date from tomorrow on.";
        return "";
      case 1:
        if (!service) return "Choose what we're celebrating.";
        return "";
      case 2:
        if (!car) return "Choose your car.";
        if (carStatus(car.id)) return `${car.name}: ${carStatus(car.id)}.`;
        return "";
      case 3: {
        const required = service!.stops.filter((s) => s !== "photo");
        const missing = required.find((s) => !stops[s]?.trim());
        return missing
          ? `Add the ${STOP_LABELS[missing].split(" (")[0].toLowerCase()}.`
          : "";
      }
      case 4:
        if (!names.trim()) return "Add the names for the signage.";
        if (
          !contactName.trim() ||
          !email.includes("@") ||
          phone.trim().length < 7
        )
          return "Add a contact name, email and phone.";
        return "";
      case 6:
        return agree ? "" : "Please agree to the booking terms.";
      default:
        return "";
    }
  };

  const next = () => {
    const msg = validate();
    setError(msg);
    if (msg) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const reserve = () => {
    const msg = validate();
    setError(msg);
    if (msg || !service || !car) return;
    const booking: ConfirmedBooking = {
      ref: `VV-${date.replaceAll("-", "").slice(2)}-${refSuffix(email + names)}`,
      date,
      time,
      serviceName: service.name,
      carName: car.name,
      hours: service.model === "hourly" ? totalHours : undefined,
      stops: service.stops
        .filter((s) => stops[s]?.trim())
        .map((s) => ({
          label: STOP_LABELS[s].split(" (")[0],
          value: stops[s],
        })),
      names,
      riders,
      email,
      lines,
      total,
      deposit: DEPOSIT,
      balance: Math.max(0, total - DEPOSIT),
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch {
      /* storage blocked: the confirmation page shows a generic message */
    }
    router.push("/book/confirmation");
  };

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  // ---------- Render ----------
  return (
    <div className={styles.wrap}>
      <ol className={styles.stepper} aria-label='Booking steps'>
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`${styles.stepDot} ${i === step ? styles.stepCurrent : ""} ${i < step ? styles.stepDone : ""}`}
            aria-current={i === step ? "step" : undefined}
          >
            <span className={styles.stepNum}>{i + 1}</span>
            <span className={styles.stepName}>{s}</span>
          </li>
        ))}
      </ol>

      <div className={styles.layout}>
        <div className={styles.panel}>
          {/* STEP 1 */}
          {step === 0 && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                When&apos;s the big day?
              </legend>
              <p className={styles.helper}>
                We&apos;ll show you which cars are free on your date.
              </p>
              <div className={styles.row2}>
                <label className={styles.field}>
                  Event date
                  <input
                    type='date'
                    min={todayIso()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <label className={styles.field}>
                  Approximate start time
                  <input
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </label>
              </div>
              {date && (
                <p className={styles.good}>
                  Good news: {CARS.length - 1} of our {CARS.length} cars are
                  free on {formatDate(date)}.
                </p>
              )}
            </fieldset>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                What are we celebrating?
              </legend>
              {GROUPS.map((g) => (
                <div key={g} className={styles.group}>
                  <p className={styles.groupTitle}>{g}</p>
                  <div className={styles.options}>
                    {servicesForDate
                      .filter((s) => s.group === g)
                      .map((s) => (
                        <label
                          key={s.id}
                          className={`${styles.option} ${serviceId === s.id ? styles.optionOn : ""}`}
                        >
                          <input
                            type='radio'
                            name='service'
                            value={s.id}
                            checked={serviceId === s.id}
                            onChange={() => {
                              setServiceId(s.id);
                              setHours(0);
                            }}
                          />
                          <span className={styles.optionTop}>
                            <span className={styles.optionName}>{s.name}</span>
                            <span className={styles.optionPrice}>
                              {s.model === "quote"
                                ? "Custom quote"
                                : `from ${formatMoney(s.price)}${s.minHours ? ` · ${s.minHours} hrs` : ""}`}
                            </span>
                          </span>
                          <span className={styles.optionText}>{s.blurb}</span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}

              {service?.model === "hourly" && (
                <label className={`${styles.field} ${styles.narrow}`}>
                  How many hours?
                  <select
                    value={totalHours}
                    onChange={(e) => setHours(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((x) => (
                      <option key={x} value={minHours + x}>
                        {minHours + x} hours
                        {x
                          ? ` (+${formatMoney(x * EXTRA_HOUR)})`
                          : " (minimum)"}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </fieldset>
          )}

          {/* Production work is quoted, not booked */}
          {step >= 2 && service?.model === "quote" && (
            <div className={styles.quote}>
              <h2 className={`h5 ${styles.legend}`}>
                Let&apos;s talk about your production.
              </h2>
              <p className={styles.helper}>
                Film, photo and commercial work is quoted to the shoot. Tell us
                about your dates, locations and the look you&apos;re after, and
                we&apos;ll send a quote within 24 hours.
              </p>
              <Link href='/contact' className={styles.primary}>
                Request a production quote
              </Link>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && service?.model !== "quote" && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                Choose your carriage.
              </legend>
              <p className={styles.helper}>
                Showing availability for {formatDate(date)}.
              </p>
              <div className={styles.cars}>
                {CARS.map((c) => {
                  const status = carStatus(c.id);
                  return (
                    <label
                      key={c.id}
                      className={`${styles.car} ${carId === c.id ? styles.optionOn : ""} ${status ? styles.carOff : ""}`}
                    >
                      <input
                        type='radio'
                        name='car'
                        value={c.id}
                        checked={carId === c.id}
                        disabled={Boolean(status)}
                        onChange={() => setCarId(c.id)}
                      />
                      <span className={styles.carImg}>
                        <Image
                          src={c.src}
                          alt=''
                          fill
                          sizes='240px'
                          className={styles.img}
                        />
                      </span>
                      <span className={styles.carBody}>
                        <span className={styles.optionName}>
                          {c.name} · {c.year}
                        </span>
                        <span className={styles.optionText}>
                          {c.body} · {c.riders} riders ·{" "}
                          {c.convertible ? "Open top" : "Climate control"}
                        </span>
                        {status && (
                          <span className={styles.badge}>{status}</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>

              {isWedding && (
                <div className={styles.group}>
                  <p className={styles.groupTitle}>Bring the whole crew</p>
                  {PAIRINGS.map((a) => (
                    <label key={a.id} className={styles.check}>
                      <input
                        type='checkbox'
                        checked={pairings.includes(a.id)}
                        onChange={() => toggle(pairings, setPairings, a.id)}
                      />
                      <span>
                        {a.name} <strong>+{formatMoney(a.price)}</strong>
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          )}

          {/* STEP 4 */}
          {step === 3 && service && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                Where are we going?
              </legend>
              <p className={styles.helper}>
                Venue name is enough; we&apos;ll confirm addresses on your
                timeline call.
              </p>
              {service.stops.map((s) => (
                <label key={s} className={styles.field}>
                  {STOP_LABELS[s]}
                  <input
                    value={stops[s] ?? ""}
                    onChange={(e) =>
                      setStops({ ...stops, [s]: e.target.value })
                    }
                    placeholder={
                      s === "dropoff"
                        ? "e.g. The Camby, Phoenix"
                        : "Venue or address"
                    }
                  />
                </label>
              ))}
            </fieldset>
          )}

          {/* STEP 5 */}
          {step === 4 && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                Who&apos;s riding?
              </legend>
              <label className={styles.field}>
                {isWedding
                  ? "Couple's names (for signage)"
                  : "Guest of honor (for signage)"}
                <input
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  placeholder='e.g. Mariana & Theo'
                />
              </label>
              <div className={styles.row2}>
                <label className={styles.field}>
                  Number of riders
                  <select
                    value={riders}
                    onChange={(e) => setRiders(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                {isWedding && (
                  <label className={styles.field}>
                    Gown with a train?
                    <select
                      value={gown}
                      onChange={(e) => setGown(e.target.value)}
                    >
                      <option value='yes'>Yes</option>
                      <option value='no'>No</option>
                    </select>
                  </label>
                )}
              </div>
              <p className={styles.helper}>
                A full gown counts as about a seat and a half. We&apos;ll make
                sure everyone fits.
              </p>
              {car && riders > car.riders && (
                <p className={styles.error}>
                  {car.name} seats {car.riders}. Go back to choose a larger car,
                  or add a second car for family.
                </p>
              )}
              <div className={styles.row2}>
                <label className={styles.field}>
                  Contact name
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    autoComplete='name'
                  />
                </label>
                <label className={styles.field}>
                  Phone
                  <input
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete='tel'
                  />
                </label>
              </div>
              <label className={styles.field}>
                Email
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='email'
                />
              </label>
              <label className={styles.field}>
                Planner name and email (optional)
                <input
                  value={planner}
                  onChange={(e) => setPlanner(e.target.value)}
                />
              </label>
            </fieldset>
          )}

          {/* STEP 6 */}
          {step === 5 && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                The finishing touches.
              </legend>
              <div className={styles.group}>
                <p className={styles.groupTitle}>Ribbon color (included)</p>
                <div className={styles.pills}>
                  {RIBBONS.map((r) => (
                    <label
                      key={r}
                      className={`${styles.pill} ${ribbon === r ? styles.pillOn : ""}`}
                    >
                      <input
                        type='radio'
                        name='ribbon'
                        checked={ribbon === r}
                        onChange={() => setRibbon(r)}
                      />
                      {r}
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.group}>
                <p className={styles.groupTitle}>Add-ons</p>
                {ADD_ONS.map((a) => (
                  <label key={a.id} className={styles.check}>
                    <input
                      type='checkbox'
                      checked={addOns.includes(a.id)}
                      onChange={() => toggle(addOns, setAddOns, a.id)}
                    />
                    <span>
                      {a.name} <strong>+{formatMoney(a.price)}</strong>
                      {a.note && <em className={styles.muted}> · {a.note}</em>}
                    </span>
                  </label>
                ))}
              </div>
              <label className={styles.field}>
                Anything we should know?
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder='A song for the exit, a surprise, a grandparent who needs a hand?'
                />
              </label>
            </fieldset>
          )}

          {/* STEP 7 */}
          {step === 6 && service && car && (
            <fieldset className={styles.fieldset}>
              <legend className={`h5 ${styles.legend}`}>
                Review and reserve.
              </legend>
              <dl className={styles.review}>
                <div>
                  <dt>Date</dt>
                  <dd>
                    {formatDate(date)}, around {formatTime(time)}
                  </dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>
                    {service.name}
                    {service.model === "hourly" ? ` · ${totalHours} hrs` : ""}
                  </dd>
                </div>
                <div>
                  <dt>Car</dt>
                  <dd>
                    {car.name}, {car.year} {car.body.toLowerCase()}
                  </dd>
                </div>
                <div>
                  <dt>Riders</dt>
                  <dd>
                    {riders} · {names}
                  </dd>
                </div>
                <div>
                  <dt>Ribbon</dt>
                  <dd>{ribbon}</dd>
                </div>
              </dl>

              <div className={styles.demo}>
                <strong>Portfolio demo.</strong> This is a showcase site, so no
                card is taken, nothing is charged and no emails are sent.
                Pressing reserve shows the confirmation a real couple would see.
              </div>

              <label className={styles.check}>
                <input
                  type='checkbox'
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span>
                  I agree to the booking terms and cancellation policy.
                </span>
              </label>
            </fieldset>
          )}

          {error && (
            <p className={styles.error} role='alert'>
              {error}
            </p>
          )}

          {!(step >= 2 && service?.model === "quote") && (
            <div className={styles.nav}>
              {step > 0 ? (
                <button
                  type='button'
                  className={styles.secondary}
                  onClick={back}
                >
                  Back
                </button>
              ) : (
                <span />
              )}
              {step < STEPS.length - 1 ? (
                <button type='button' className={styles.primary} onClick={next}>
                  Continue
                </button>
              ) : (
                <button
                  type='button'
                  className={styles.primary}
                  onClick={reserve}
                >
                  Reserve my date
                </button>
              )}
            </div>
          )}
          {step >= 2 && service?.model === "quote" && (
            <div className={styles.nav}>
              <button
                type='button'
                className={styles.secondary}
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <span />
            </div>
          )}
        </div>

        {/* Running summary */}
        <aside className={styles.summary} aria-label='Booking summary'>
          <p className={styles.summaryTitle}>Your booking</p>
          <ul className={styles.summaryList}>
            <li>
              <span>Date</span>
              <span>{date ? formatDate(date) : "—"}</span>
            </li>
            <li>
              <span>Service</span>
              <span>{service?.name ?? "—"}</span>
            </li>
            <li>
              <span>Car</span>
              <span>{car?.name ?? "—"}</span>
            </li>
          </ul>
          {lines.length > 0 && (
            <>
              <ul className={styles.lines}>
                {lines.map((l) => (
                  <li key={l.label}>
                    <span>{l.label}</span>
                    <span>{formatMoney(l.amount)}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.total}>
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </p>
              <p className={styles.small}>
                {formatMoney(DEPOSIT)} deposit today
                {date
                  ? `, balance charged ${balanceDate(date)}`
                  : `, balance ${BALANCE_DAYS_BEFORE} days before`}
                .
              </p>
              <p className={styles.small}>
                This is your full price. No service charges will be added.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
