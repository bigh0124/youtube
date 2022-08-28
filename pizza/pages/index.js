import Head from "next/head";
import axios from "axios";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import AddButton from "../components/AddButton";
import Add from "../components/Add";

export default function Home({ pizzaList, isAdmin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Best Pizza</title>
        <meta name="description" content="Best Pizza" />
      </Head>
      <Featured />
      {isAdmin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.cookies || "";
  const isAdmin = cookie.token === process.env.TOKEN;

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      isAdmin,
    },
  };
}
