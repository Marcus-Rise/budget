import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../src/components/container";
import type { ITransactionFormQuickDto } from "../src/transaction/components/form-quick";
import { TransactionFormQuick } from "../src/transaction/components/form-quick";
import { useCallback, useMemo, useState } from "react";
import type { ITransactionFormDto } from "../src/transaction/components/form";
import { TransactionForm } from "../src/transaction/components/form";
import { Overlay } from "../src/components/overlay";
import { Modal } from "../src/components/modal";
import type { TransactionModel } from "../src/transaction/models";
import { TransactionType } from "../src/transaction/models";
import { useTransaction } from "../src/transaction/transaction.hook";
import { TransactionListItem } from "../src/transaction/components/list-item";
import type { DateGroupedListItem } from "../src/components/date-grouped-list";
import { DateGroupedList } from "../src/components/date-grouped-list";
import { TitledList } from "../src/components/titled-list";

const CATEGORIES = ["Другое"];

const Home: NextPage = () => {
  const { saveTransaction, transactions, deleteTransaction, profit } = useTransaction();
  const [transactionDto, setTransactionDto] = useState<ITransactionFormDto>();

  const transactionListItems: Array<DateGroupedListItem<TransactionModel & { id: string }>> =
    useMemo(
      () =>
        transactions.map((i) => {
          return {
            ...i,
            id: i.uuid,
          };
        }),
      [transactions],
    );

  const prepareTransaction = useCallback((quickDto: ITransactionFormQuickDto) => {
    setTransactionDto({
      ...quickDto,
      type: TransactionType.CREDIT,
      date: new Date(),
      category: CATEGORIES[0],
    });
  }, []);

  const clearTransactionFormDto = useCallback(() => setTransactionDto(undefined), []);

  const saveTransactionAndClear = useCallback(
    (dto: ITransactionFormDto) => {
      saveTransaction(dto);

      clearTransactionFormDto();
    },
    [clearTransactionFormDto, saveTransaction],
  );

  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
      </Head>
      <Container>
        <h1>Бюджет</h1>
      </Container>

      {!!transactions.length ? (
        <>
          <br />
          <Container centered>
            <TransactionFormQuick onSubmit={prepareTransaction} />
          </Container>
          <br />
          <Container>Profit: {profit}</Container>
          <br />
          <Container>
            <DateGroupedList
              items={transactionListItems}
              renderGroup={TitledList}
              renderItem={(props) => (
                <TransactionListItem
                  {...props}
                  onClick={() => setTransactionDto(props)}
                  onRemove={() => {
                    if (
                      confirm(`Вы действительно хотите удалить "${props.title}, ${props.category}"`)
                    ) {
                      deleteTransaction(props.uuid);
                    }
                  }}
                />
              )}
            />
          </Container>

          {transactionDto && (
            <Overlay>
              <Container centered>
                <Modal>
                  <Container centered>
                    <TransactionForm
                      {...transactionDto}
                      categories={CATEGORIES}
                      onCancel={clearTransactionFormDto}
                      onSubmit={saveTransactionAndClear}
                    />
                  </Container>
                </Modal>
              </Container>
            </Overlay>
          )}
        </>
      ) : (
        <Container centered>
          <TransactionForm
            title={""}
            amount={"" as unknown as number}
            type={TransactionType.CREDIT}
            date={new Date()}
            category={CATEGORIES[0]}
            categories={CATEGORIES}
            onCancel={clearTransactionFormDto}
            onSubmit={saveTransactionAndClear}
          />
        </Container>
      )}
    </>
  );
};

export default Home;
