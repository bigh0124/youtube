import React from "react";
import styles from "../styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.carL}>
        <h1 className={styles.title}>AV0CAD0 CREATIVES.</h1>
        <h1 className={styles.linkTitle}>
          <Link passHref href="/contact">
            <span className={styles.linkText}>WORK WITH US</span>
          </Link>
          <Image src="/img/link.png" alt="" width="45" height="45" />
        </h1>
      </div>
      <div className={styles.carS}>
        <div className={styles.cardItem}>
          12 ASDF SETREET NY <br /> USA
        </div>
        <div className={styles.cardItem}>
          CONTACT@JOHN <br /> 123 1234
        </div>
      </div>
      <div className={styles.carS}>
        <div className={styles.cardItem}>
          FOLLOW US:
          <br />
          __FB __IN __BE __TW
        </div>
        <div className={styles.cardItem}>
          @ 2022 JOHN INTERACTIVE,
          <br />
          ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
};

export default Footer;
