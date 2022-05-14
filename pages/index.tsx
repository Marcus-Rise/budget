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
import { useState } from "react";
import type { TransactionFilter } from "../src/transaction/components/filter-form";
import {
  isTransactionInSameMonthFilter,
  TransactionFilterForm,
} from "../src/transaction/components/filter-form";
import { Badge } from "../src/components/badge";
import { Modal } from "../src/components/modal";
import type { ITransactionFilterFormDto } from "../src/transaction/components/filter-form/transaction-filter-form.dto";

const FormSubmitButton = styled(Button).attrs(() => ({
  type: "submit",
}))`
  width: 100%;
`;

const HomePageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterActivator = styled(Button)`
  margin-left: auto;
  margin-right: 1rem;
`;

const FilterCounter = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.neutralLightest};
  padding: 0.15rem;
  border-radius: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterFormTitle = styled.h2`
  text-align: center;
  font-size: 1.25rem;
`;

const Home: NextPage = () => {
  const [showTransactionFilterForm, setShowTransactionFilterForm] = useState(false);
  const openTransactionFilterForm = () => setShowTransactionFilterForm(true);
  const closeTransactionFilterForm = () => setShowTransactionFilterForm(false);

  const [transactionFilters, setTransactionFilters] = useState<Array<TransactionFilter>>([
    isTransactionInSameMonthFilter,
  ]);
  const { saveTransaction, transactions, deleteTransaction } = useTransaction(transactionFilters);
  const [statisticFullView, setStatisticFullView] = useState(false);
  const toggleStatisticFullView = () => setStatisticFullView((full) => !full);

  const applyFilters = (dto: ITransactionFilterFormDto) => {
    setTransactionFilters(dto.filters);
    closeTransactionFilterForm();
  };

  return (
    <Layout>
      <br />
      <HomePageContainer>
        <FilterActivator as={Badge} onClick={openTransactionFilterForm}>
          Фильтры
          {transactionFilters.length > 0 && (
            <FilterCounter>{transactionFilters.length}</FilterCounter>
          )}
        </FilterActivator>
        <Modal show={showTransactionFilterForm} onClose={closeTransactionFilterForm}>
          <FilterFormTitle>Фильтры</FilterFormTitle>
          <TransactionFilterForm
            alreadyAppliedFilters={transactionFilters}
            onSubmit={applyFilters}
          />
        </Modal>
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
          <TransactionForm
            onSubmit={saveTransaction}
            categories={[TRANSACTION_CATEGORY_OTHER]}
            focus={"title"}
          >
            <FormSubmitButton>Сохранить</FormSubmitButton>
          </TransactionForm>
        )}
      </HomePageContainer>
    </Layout>
  );
};

export default Home;
