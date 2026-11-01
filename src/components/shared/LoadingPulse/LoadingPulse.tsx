import Luxury from "../icons/Luxury/Luxury";
import styles from "./LoadingPulse.module.css";

// Page loader: the Valley Vintage diamond, gently pulsing.
export default function LoadingPulse() {
  return (
    <div className={styles.container} role='status' aria-label='Loading'>
      <Luxury className={styles.thunderIcon} aria-hidden='true' />
    </div>
  );
}
