import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import styles from "./ServicesTeaser.module.css";

const services = [
  {
    title: "Ceremony Arrival",
    text: "Pickup at your getting-ready suite, a scenic route and arrival at the ceremony with the door held.",
    price: "From $395",
    src: "/images/vehicles/red.jpg",
  },
  {
    title: "Ceremony to Reception",
    text: "Your first ride as newlyweds, with a 15-minute stop for photos on the way.",
    price: "From $395",
    src: "/images/vehicles/whiteii.jpg",
  },
  {
    title: "Grand Exit",
    text: "A staged departure for the sparkler send-off, then a drive to your hotel.",
    price: "From $345",
    src: "/images/vehicles/green.jpg",
  },
  {
    title: "Full Wedding Day",
    text: "Car and chauffeur on standby for the arrival, photos, the first ride and the exit.",
    price: "From $675 · 3 hrs",
    src: "/images/vehicles/burg.jpg",
  },
  {
    title: "Photo Session",
    text: "The car staged and moved between locations for engagement, bridal or wedding portraits.",
    price: "From $495 · 2 hrs",
    src: "/images/vehicles/blueiii.jpg",
  },
];

const thumbs = [
  "/images/vehicles/red.jpg",
  "/images/vehicles/whiteii.jpg",
  "/images/vehicles/blackyellow.jpg",
  "/images/vehicles/burg.jpg",
];

export default function ServicesTeaser() {
  return (
    <section className={styles.section} aria-labelledby='services-heading'>
      <div className={styles.container}>
        <div className={styles.left}>
          <Eyebrow text='Wedding services' />
          <div className={styles.stat}>
            <p className={styles.statValue}>$250</p>
            <p className={styles.statLabel}>holds your car and chauffeur</p>
            <div className={styles.thumbs}>
              {thumbs.map((src) => (
                <div key={src} className={styles.thumb}>
                  <Image
                    src={src}
                    alt=''
                    fill
                    sizes='48px'
                    className={styles.img}
                  />
                </div>
              ))}
              <div className={styles.thumbCount}>5 cars</div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h2 id='services-heading' className={styles.heading}>
            However you want to make your entrance
          </h2>

          <ul className={styles.list}>
            {services.map((s) => (
              <li key={s.title} className={styles.row}>
                <div className={styles.rowText}>
                  <h3 className={styles.rowTitle}>{s.title}</h3>
                  <p className={styles.rowCopy}>{s.text}</p>
                  <p className={styles.price}>{s.price}</p>
                  <Link href='/book' className={styles.link}>
                    Book this ride
                    <Arrow className={styles.linkArrow} aria-hidden='true' />
                  </Link>
                </div>
                <div className={styles.rowImg}>
                  <Image
                    src={s.src}
                    alt={`${s.title} in a restored vintage car`}
                    fill
                    sizes='(max-width: 568px) 100vw, 210px'
                    className={styles.img}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.btnContainer}>
            <Button
              href='/weddings'
              text='View wedding services'
              btnType='forest'
              arrow
            />
          </div>
        </div>
      </div>
    </section>
  );
}
