import styles from "./Eyebrow.module.css";

interface Props {
  text: string;
  /** "dark" text for light sections, "light" text for dark sections */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Small script label with a gold dot that sits above a section heading.
 * Rendered as a <p> so the global `span` rule never touches it.
 */
export default function Eyebrow({ text, tone = "dark", className }: Props) {
  return (
    <p
      className={`${styles.eyebrow} ${styles[tone]}${className ? ` ${className}` : ""}`}
    >
      {text}
    </p>
  );
}
