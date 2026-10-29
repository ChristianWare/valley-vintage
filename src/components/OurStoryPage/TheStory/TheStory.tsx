import Image from "next/image";
import Eyebrow from "@/components/shared/Eyebrow/Eyebrow";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./TheStory.module.css";

const chapters = [
  {
    mark: "2014",
    text: "Walt Ortega was driving back from a car show in Wickenburg when he spotted a fender sticking out of a collapsed barn. Underneath was a 1928 touring sedan, sun-bleached and missing most of her interior. He bought her for $900 and a handshake.",
  },
  {
    mark: "2017",
    text: "Rosalind drove Walt's daughter Lucy to her own wedding. Before the reception was over, two guests had asked if they could book her too. Valley Vintage Carriage Co. opened that spring.",
  },
  {
    mark: "Today",
    text: "Lucy runs the business, Walt still runs the garage, and the family has grown to five cars. Every one was restored in the same garage off 16th Street, and every one is still serviced there every week.",
  },
];

export default function TheStory() {
  return (
    <section className={styles.section} aria-labelledby='story-heading'>
      <LayoutWrapper>
        <div className={styles.container}>
          <header className={styles.intro}>
            <Eyebrow text='The story' />
            <h2 id='story-heading' className={`h3 ${styles.heading}`}>
              One barn find, one family wedding and a garage that has been busy
              ever since.
            </h2>
          </header>

          <div className={styles.body}>
            <div className={styles.photo}>
              <Image
                src='/images/vehicles/red.jpg'
                alt='Rosalind, the 1928 touring sedan that started Valley Vintage'
                fill
                sizes='(max-width: 968px) 100vw, 50vw'
                className={styles.img}
              />
            </div>

            <ol className={styles.chapters}>
              {chapters.map((c) => (
                <li key={c.mark} className={styles.chapter}>
                  <p className={`h1 ${styles.mark}`}>{c.mark}</p>
                  <p className={styles.text}>{c.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
