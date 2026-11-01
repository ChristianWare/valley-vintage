import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Wedding from "@/components/shared/icons/Wedding/Wedding";
import Party from "@/components/shared/icons/Party/Party";
import Star from "@/components/shared/icons/Star/Star";
import Sparkle from "@/components/shared/icons/Sparkle/Sparkle";
import ImageIcon from "@/components/shared/icons/ImageIcon/ImageIcon";
import Calendar from "@/components/shared/icons/Calendar/Calendar";
import Luxury from "@/components/shared/icons/Luxury/Luxury";
import Car from "@/components/shared/icons/Car/Car";
import styles from "./OccasionsMarquee.module.css";

const items = [
  { Icon: Wedding, text: "Vow renewals" },
  { Icon: Star, text: "Prom night" },
  { Icon: Sparkle, text: "Quinceañeras" },
  { Icon: ImageIcon, text: "Photo shoots" },
  { Icon: Party, text: "Gatsby parties" },
  { Icon: Luxury, text: "Mitzvahs" },
  { Icon: Car, text: "Date nights" },
  { Icon: Calendar, text: "Holiday lights" },
];

export default function OccasionsMarquee() {
  return (
    <section className={styles.section} aria-label='Occasions we drive'>
      <LayoutWrapper>
        <div className={styles.marquee}>
          <ul className={styles.track}>
            {[...items, ...items].map(({ Icon, text }, i) => (
              <li
                key={`${text}-${i}`}
                className={styles.item}
                aria-hidden={i >= items.length ? true : undefined}
              >
                <Icon className={styles.icon} aria-hidden='true' />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </LayoutWrapper>
    </section>
  );
}
