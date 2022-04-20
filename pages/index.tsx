import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../src/components/container";
import type { ITransactionFormQuickDto } from "../src/transaction/components/form-quick";
import { TransactionFormQuick } from "../src/transaction/components/form-quick";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ITransactionFormDto } from "../src/transaction/components/form";
import { TransactionForm } from "../src/transaction/components/form";
import { Overlay } from "../src/components/overlay";
import { Modal } from "../src/components/modal";
import { TransactionType } from "../src/transaction/transaction.model";
import { useTransaction } from "../src/transaction/transaction.hook";
import { TransactionList, TransactionListItem } from "../src/transaction/components/list-item";

const CATEGORIES = ["Другое"];

const Home: NextPage = () => {
  const { saveTransaction, transactions, deleteTransaction } = useTransaction();
  const [transactionDto, setTransactionDto] = useState<ITransactionFormDto>();

  const prepareTransaction = useCallback((quickDto: ITransactionFormQuickDto) => {
    setTransactionDto({
      ...quickDto,
      type: TransactionType.CREDIT,
      date: new Date(),
      category: CATEGORIES[0],
    });
  }, []);

  const clearTransactionFormDto = useCallback(() => setTransactionDto(undefined), []);

  const transactionsList = useMemo(
    () =>
      transactions.map((i) => (
        <TransactionListItem
          key={i.uuid}
          {...i}
          onClick={() => setTransactionDto(i)}
          onRemove={() => {
            if (confirm(`Вы действительно хотите удалить "${i.title}, ${i.category}"`)) {
              deleteTransaction(i.uuid);
            }
          }}
        />
      )),
    [deleteTransaction, transactions],
  );

  const saveTransactionAndClear = useCallback(
    (dto: ITransactionFormDto) => {
      saveTransaction(dto);

      clearTransactionFormDto();
    },
    [clearTransactionFormDto, saveTransaction],
  );

  useEffect(() => {
    if (!transactions.length) {
      setTransactionDto({
        title: "",
        type: TransactionType.CREDIT,
        date: new Date(),
        amount: "" as unknown as number,
        category: CATEGORIES[0],
      });
    }
  }, [transactions.length]);

  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
      </Head>
      <h1>Бюджет</h1>

      {!!transactions.length ? (
        <>
          <Container centered>
            <TransactionFormQuick onSubmit={prepareTransaction} />
          </Container>
          <br />
          <Container>
            <TransactionList>{transactionsList}</TransactionList>
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
        !!transactionDto && (
          <Container centered>
            <TransactionForm
              {...transactionDto}
              categories={CATEGORIES}
              onCancel={clearTransactionFormDto}
              onSubmit={saveTransactionAndClear}
            />
          </Container>
        )
      )}
    </>
  );
};

export default Home;
