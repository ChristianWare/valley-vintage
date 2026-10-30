import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import Button from "@/components/shared/Button/Button";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AddOns.module.css";

const addOns = [
  {
    name: "Fresh floral hood arrangement",
    note: "Matched to your bouquet",
    price: "$175",
  },
  { name: "Personalized “Just Married” plate or sign", price: "$45" },
  {
    name: "Champagne toast for two",
    note: "Riders 21 and older",
    price: "$65",
  },
  { name: "Red carpet rollout at arrival", price: "$85" },
  { name: "Chauffeur in 1920s period attire", price: "$75" },
  {
    name: "Second vintage car for parents or the bridal party",
    price: "From $295",
  },
  {
    name: "Modern Sprinter for the wedding party",
    note: "Up to 14 riders, partner fleet",
    price: "From $495",
  },
  { name: "Extra hour", price: "$195" },
];

export default function AddOns() {
  return (
    <section className={styles.section} aria-labelledby='addons-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='Add-ons' />
            <h2 id='addons-heading' className={styles.heading}>
              The finishing touches
            </h2>
            <p className={styles.copy}>
              Add any of these at the &ldquo;Make it yours&rdquo; step when you
              book. Every price shows in your total before you pay a deposit.
            </p>
          </header>

          <div className={styles.card}>
            <table className={styles.table}>
              <caption className={styles.srOnly}>
                Add-ons and their prices
              </caption>
              <thead>
                <tr>
                  <th scope='col' className={styles.th}>
                    Add-on
                  </th>
                  <th scope='col' className={`${styles.th} ${styles.right}`}>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((a) => (
                  <tr key={a.name} className={styles.row}>
                    <th scope='row' className={styles.name}>
                      {a.name}
                      {a.note && (
                        <small className={styles.note}>{a.note}</small>
                      )}
                    </th>
                    <td className={`${styles.price} ${styles.right}`}>
                      {a.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.btnContainer}>
            <Button
              href='/book'
              text='Check your date'
              btnType='forest'
              arrow
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
