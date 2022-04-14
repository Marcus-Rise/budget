import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../src/components/container";
import { TransactionForm } from "../src/transaction/components/form";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
      </Head>
      <Container centered>
        <TransactionForm onSubmit={() => {}} />
      </Container>
    </>
  );
};

export default Home;
