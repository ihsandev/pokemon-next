import Head from "next/head";

interface ISeo {
  title?: string;
  description?: string;
}

const Seo = ({ title, description }: ISeo) => (
  <Head>
    <title>{title || "Pokemon Next"}</title>
    <meta name="description" content={description || "Pokemon Next content"} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Seo;
