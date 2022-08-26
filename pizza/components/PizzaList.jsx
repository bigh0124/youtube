import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ullam eaque dignissimos atque veritatis
        tenetur! Iste, repellat! Nostrum ullam accusamus distinctio nulla, sunt ab dignissimos animi voluptatibus. Eos,
        delectus suscipit.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza, idx) => (
          <PizzaCard pizza={pizza} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
