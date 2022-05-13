import type { NextPage } from "next";
import { Container } from "../src/components/container";
import type { TransactionFilter } from "../src/transaction/transaction.hook";
import { useTransaction } from "../src/transaction/transaction.hook";
import { Layout } from "../src/components/layout";
import { TransactionStatistic } from "../src/transaction/components/statistic";
import { TransactionList } from "../src/transaction/components/list";
import { TransactionForm } from "../src/transaction/components/form";
import { Button } from "../src/components/button";
import type { TransactionModel } from "../src/transaction/models";
import { TRANSACTION_CATEGORY_OTHER } from "../src/transaction/models";
import styled from "styled-components";
import { useState } from "react";
import { isSameMonth } from "date-fns";

const FormSubmitButton = styled(Button).attrs(() => ({
  type: "submit",
}))`
  width: 100%;
`;

const isTransactionInSameMonth = (transaction: TransactionModel): boolean => {
  return isSameMonth(transaction.date, new Date());
};

const Home: NextPage = () => {
  const [transactionFilters, setTransactionFilters] = useState<Array<TransactionFilter>>([
    isTransactionInSameMonth,
  ]);
  const { saveTransaction, transactions, deleteTransaction } = useTransaction(transactionFilters);
  const [statisticFullView, setStatisticFullView] = useState(false);
  const toggleStatisticFullView = () => setStatisticFullView((full) => !full);

  return (
    <Layout>
      {!!transactions.length ? (
        <>
          <br />
          <TransactionStatistic
            transactions={transactions}
            onToggleView={toggleStatisticFullView}
            fullView={statisticFullView}
          />
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
            <TransactionForm
              onSubmit={saveTransaction}
              categories={[TRANSACTION_CATEGORY_OTHER]}
              focus={"title"}
            >
              <FormSubmitButton>Сохранить</FormSubmitButton>
            </TransactionForm>
          </Container>
        </>
      )}
    </Layout>
  );
};

export default Home;
