import type { NextPage } from "next";
import Head from "next/head";
import { Pokemons } from "../containers";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pokemon Next</title>
        <meta name="description" content="Pokemon Next content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pokemons />
    </>
  );
};

export default Home;
