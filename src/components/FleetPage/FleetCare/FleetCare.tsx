import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Cog from "@/components/shared/icons/Cog/Cog";
import Saftey from "@/components/shared/icons/Saftey/Saftey";
import Sparkle from "@/components/shared/icons/Sparkle/Sparkle";
import styles from "./FleetCare.module.css";

const points = [
  { Icon: Cog, text: "Serviced every week in our garage" },
  { Icon: Saftey, text: "Modern brakes, wiring and climate control" },
  { Icon: Sparkle, text: "Detailed and decorated before every ride" },
];

export default function FleetCare() {
  return (
    <section className={styles.section} aria-labelledby='care-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.photo}>
            <Image
              src='/images/vehicles/blackandwhite.jpg'
              alt='A classic car being polished in the Valley Vintage garage'
              fill
              sizes='(max-width: 568px) 100vw, 50vw'
              className={styles.img}
            />
          </div>

          <div className={styles.right}>
            <div>
              <Eyebrow text='In the garage' tone='light' />
              <h2 id='care-heading' className={styles.heading}>
                Restored by hand, cared for every week
              </h2>
            </div>

            <ul className={styles.list}>
              {points.map(({ Icon, text }) => (
                <li key={text} className={styles.item}>
                  <Icon className={styles.icon} aria-hidden='true' />
                  <h3 className={`h5 ${styles.itemText}`}>{text}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
