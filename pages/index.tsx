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
import { TransactionType } from "../src/transaction/transaction.model";
import { useTransaction } from "../src/transaction/transaction";
import { TransactionListItem } from "../src/transaction/components/list-item";

const Home: NextPage = () => {
  const { transactions, createTransaction } = useTransaction();
  const [transaction, setTransaction] = useState<ITransactionFormDto>();

  const prepareTransaction = useCallback((dto: ITransactionFormQuickDto) => {
    const trDto: ITransactionFormDto = {
      ...dto,
      type: TransactionType.CREDIT,
      date: new Date(),
      category: "",
    };

    setTransaction(trDto);
  }, []);

  const categories = useMemo(() => [], []);

  const clearTransactionForm = useCallback(() => setTransaction(undefined), []);

  const addTransaction = useCallback(
    (dto: ITransactionFormDto) => {
      createTransaction(dto);

      clearTransactionForm();
    },
    [clearTransactionForm, createTransaction],
  );

  const transactionsList = useMemo(
    () =>
      transactions.map((i, index) => <TransactionListItem key={i.uuid} {...i} index={index + 1} />),
    [transactions],
  );

  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
      </Head>
      <Container centered>
        <TransactionFormQuick onSubmit={prepareTransaction} />
      </Container>

      {transaction && (
        <Overlay>
          <Container centered>
            <Modal>
              <Container centered>
                <TransactionForm
                  {...transaction}
                  categories={categories}
                  onCancel={clearTransactionForm}
                  onSubmit={addTransaction}
                />
              </Container>
            </Modal>
          </Container>
        </Overlay>
      )}

      <Container>
        <ul>{transactionsList}</ul>
      </Container>
    </>
  );
};

export default Home;
