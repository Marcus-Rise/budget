import type { NextPage } from "next";
import { Container } from "../src/components/container";
import { useTransaction } from "../src/transaction/transaction.hook";
import { LayoutPrivate } from "../src/components/layout-private";
import { TransactionStatistic } from "../src/transaction/components/statistic";
import { TransactionList } from "../src/transaction/components/list";
import { TransactionForm } from "../src/transaction/components/form";
import { Button } from "../src/components/button";
import { TRANSACTION_CATEGORY_OTHER } from "../src/transaction/models";
import styled from "styled-components";
import { useMemo, useState } from "react";
import type { TransactionFilter } from "../src/transaction/components/filter-form";
import { isTransactionInSameMonthFilter } from "../src/transaction/components/filter-form";
import { TransactionFilterController } from "../src/transaction/components/filter-controller";
import { useUser } from "../src/user";
import { useRouter } from "next/router";
import { Modal } from "../src/components/modal";
import { UploadDataDialog } from "../src/transaction/components/upload-data-dialog";

const FormSubmitButton = styled(Button).attrs(() => ({
  type: "submit",
}))`
  width: 100%;
`;

const WelcomeFormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const FilterContainer = styled(Container)`
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const showUploadDataDialog = router?.query?.uploadData === "true";
  const { user, isLoading } = useUser();
  const isAuthed: boolean | null = useMemo(() => (isLoading ? null : !!user), [isLoading, user]);
  const [transactionFilters, setTransactionFilters] = useState<Array<TransactionFilter>>([
    isTransactionInSameMonthFilter,
  ]);

  const { saveTransaction, transactions, deleteTransaction, uploadTransactions } = useTransaction(
    isAuthed,
    transactionFilters,
  );

  const [statisticFullView, setStatisticFullView] = useState(false);
  const toggleStatisticFullView = () => setStatisticFullView((full) => !full);

  const closeUploadDataDialog = () => router.push("/");
  const uploadData = () => uploadTransactions().then(() => closeUploadDataDialog());

  if (isLoading) {
    return <LayoutPrivate>Loading...</LayoutPrivate>;
  }

  return (
    <LayoutPrivate>
      <Modal show={showUploadDataDialog} onClose={closeUploadDataDialog}>
        <UploadDataDialog onAgree={uploadData} onDisagree={closeUploadDataDialog} />
      </Modal>
      <br />
      <FilterContainer>
        <TransactionFilterController
          filters={transactionFilters}
          onFilter={setTransactionFilters}
        />
      </FilterContainer>
      <br />
      {!!transactions.length ? (
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onSave={saveTransaction}
          renderStatistic={({ transactions }) => (
            <TransactionStatistic
              transactions={transactions}
              onToggleView={toggleStatisticFullView}
              fullView={statisticFullView}
            />
          )}
        />
      ) : (
        <WelcomeFormContainer>
          <TransactionForm
            onSubmit={saveTransaction}
            categories={[TRANSACTION_CATEGORY_OTHER]}
            focus={"title"}
          >
            <FormSubmitButton>Сохранить</FormSubmitButton>
          </TransactionForm>
        </WelcomeFormContainer>
      )}
    </LayoutPrivate>
  );
};

export default Home;
