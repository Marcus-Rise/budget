import type { NextPage } from "next";
import { Container } from "../src/components/container";
import { useTransaction } from "../src/transaction/transaction.hook";
import { Layout } from "../src/components/layout";
import { TransactionStatistic } from "../src/transaction/components/statistic";
import { TransactionList } from "../src/transaction/components/list";
import { TransactionWelcomeForm } from "../src/transaction/components/welcome-form";

const Home: NextPage = () => {
  const { saveTransaction, transactions, deleteTransaction } = useTransaction();

  return (
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
        <>
          <br />
          <Container centered>
            <TransactionWelcomeForm onSubmit={saveTransaction} />
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Home;
