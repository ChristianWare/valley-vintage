// The gallery grid. Same build as the Velvet & Vine gallery: the server
// reads every photo in the folders below, so adding a picture is as simple
// as dropping it into one of them (no code changes). The client part lays
// them out in a mixed-size grid and opens a lightbox when one is clicked.
//
// Folders scanned, in order (under /public/images):
//   gallery/  ← put real wedding photos here (create it when you have them)
//   wedding/
//   vehicles/

import fs from "fs";
import path from "path";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PhotoGroupClient from "./PhotoGroupClient";
import styles from "./PhotoGroup.module.css";

const FOLDERS = ["gallery", "wedding", "vehicles"];
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getImages() {
  const root = path.join(process.cwd(), "public", "images");
  return FOLDERS.flatMap((folder) => {
    const dir = path.join(root, folder);
    if (!fs.existsSync(dir)) return [];
    return (
      fs
        .readdirSync(dir)
        .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
        // wedding2 before wedding10
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((f) => `/images/${folder}/${f}`)
    );
  });
}

// Repeating size pattern for the grid tiles
const pattern = [
  "",
  "vStretch",
  "hStretch",
  "",
  "",
  "vStretch",
  "bigStretch",
  "",
  "hStretch",
  "",
  "",
  "",
  "vStretch",
  "",
  "bigStretch",
  "",
  "hStretch",
  "",
  "bigStretch",
  "",
  "",
];

export default function PhotoGroup() {
  const images = getImages();

  return (
    <section className={styles.container} aria-label='Wedding photos'>
      <LayoutWrapper>
        <PhotoGroupClient images={images} pattern={pattern} />
      </LayoutWrapper>
    </section>
  );
}
