import type { NextPage } from "next";
import { Container } from "../src/components/container";
import { useTransaction } from "../src/transaction/transaction.hook";
import { Layout } from "../src/components/layout";
import { TransactionStatistic } from "../src/transaction/components/statistic";
import { TransactionList } from "../src/transaction/components/list";
import { TransactionForm } from "../src/transaction/components/form";
import { Button } from "../src/components/button";
import { TRANSACTION_CATEGORY_OTHER } from "../src/transaction/models";

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
            <TransactionForm onSubmit={saveTransaction} categories={[TRANSACTION_CATEGORY_OTHER]}>
              <Button type={"submit"}>Сохранить</Button>
            </TransactionForm>
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Home;
