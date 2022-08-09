import React from "react";
import styles from "../styles/Testimonials.module.css";
import Circle from "./Circle";
import { users } from "../data";
import Image from "next/image";

const Testimonial = () => {
  return (
    <div className={styles.container}>
      <Circle backgroundColor="darkblue" top="-70vh" right="0" left="0" />
      <h1 className={styles.title}>Testimonials</h1>
      <div className={styles.wrapper}>
        {users.map((user) => (
          <div key={user.id} className={styles.card}>
            <Image src={`/img/${user.logo}`} alt="" height="30" width="30" />
            <p className={styles.comment}>{user.comment}</p>
            <div className={styles.person}>
              <Image
                src={`/img/${user.avatar}`}
                alt=""
                width="45"
                height="45"
                objectFit="cover"
                className={styles.avatar}
              />
              <div className={styles.info}>
                <span className={styles.username}>{user.name}</span>
                <span className={styles.jobTitle}>{user.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
