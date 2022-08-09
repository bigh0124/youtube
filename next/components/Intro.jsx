import React from "react";
import styles from "../styles/intro.module.css";
import Image from "next/image";
import Circle from "./Circle";

const Intro = () => {
  return (
    <div className={styles.container}>
      <Circle backgroundColor="#b0ff49" top="-50vh" left="-50vh" />
      <Circle backgroundColor="#01c686" right="-50vh" bottom="-50vh" />
      <div className={styles.card}>
        <h1 className={styles.title}>
          <span className={styles.brand}>AV0CAD0 </span>DIGITAL <span style={{ display: "block" }}>PRODUCT ANENCY</span>{" "}
        </h1>
        <p className={styles.desc}>
          Create live segments and target the right people for messages based on their behaviors.
        </p>
        <button className={styles.button}>DISCOVER</button>
      </div>
      <div className={styles.card}>
        <Image src="/img/Avocado.png" priority="true" objectFit="cover" layout="fill" />
      </div>
    </div>
  );
};

export default Intro;
