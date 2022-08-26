import Head from "next/head";
import axios from "axios";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Best Pizza</title>
        <meta name="description" content="Best Pizza" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
    },
  };
}
