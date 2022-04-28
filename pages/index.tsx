import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../src/components/container";
import { TransactionForm } from "../src/transaction/components/form";
import { TRANSACTION_CATEGORY_OTHER, TransactionType } from "../src/transaction/models";
import { useTransaction } from "../src/transaction/transaction.hook";
import { Layout } from "../src/components/layout";
import { TransactionStatistic } from "../src/transaction/components/statistic";
import { TransactionList } from "../src/transaction/components/list";

const Home: NextPage = () => {
  const { saveTransaction, transactions, deleteTransaction } = useTransaction();

  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
      </Head>
      <Layout>
        {!!transactions.length ? (
          <>
            <br />
            <TransactionStatistic transactions={transactions} />
            <br />
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onSave={saveTransaction}
            />
          </>
        ) : (
          <Container centered>
            <TransactionForm
              title={""}
              amount={"" as unknown as number}
              type={TransactionType.CREDIT}
              date={new Date()}
              category={TRANSACTION_CATEGORY_OTHER}
              categories={[]}
              onCancel={() => {}}
              onSubmit={saveTransaction}
            />
          </Container>
        )}
      </Layout>
    </>
  );
};

export default Home;
