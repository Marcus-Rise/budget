import type { NextPage } from "next";
import { Container } from "../src/components/container";
import { useTransaction } from "../src/transaction/transaction.hook";
import { Layout } from "../src/components/layout";
import { TransactionStatistic } from "../src/transaction/components/statistic";
import { TransactionList } from "../src/transaction/components/list";
import { TransactionForm } from "../src/transaction/components/form";
import { Button } from "../src/components/button";
import { TRANSACTION_CATEGORY_OTHER } from "../src/transaction/models";
import styled from "styled-components";
import type { IUser } from "../src/user";
import { UserProvider } from "../src/user";

const FormSubmitButton = styled(Button).attrs(() => {
  return {
    type: "submit",
  };
})`
  width: 100%;
`;

type HomeProps = {
  user?: IUser;
};

const Home: NextPage<HomeProps> = ({ user }) => {
  const { saveTransaction, transactions, deleteTransaction } = useTransaction();

  return (
    <UserProvider user={user}>
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
                <FormSubmitButton>Сохранить</FormSubmitButton>
              </TransactionForm>
            </Container>
          </>
        )}
      </Layout>
    </UserProvider>
  );
};

export default Home;
