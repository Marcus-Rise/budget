import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "../src/components/container";
import type { ITransactionFormQuickDto } from "../src/transaction/components/form-quick";
import { TransactionFormQuick } from "../src/transaction/components/form-quick";
import { useCallback, useMemo, useState } from "react";
import type { ITransactionFormDto } from "../src/transaction/components/form";
import { TransactionForm, TransactionType } from "../src/transaction/components/form";
import { Overlay } from "../src/components/overlay";
import { Modal } from "../src/components/modal";

const Home: NextPage = () => {
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

  const deleteTransaction = useCallback(() => setTransaction(undefined), []);

  const createTransaction = useCallback((dto: ITransactionFormDto) => {
    console.debug("new transaction", dto);
  }, []);

  return (
    <>
      <Head>
        <title>Бюджет</title>
        <meta name={"description"} content={"Учет бюджета"} />
      </Head>
      <Container centered>
        <TransactionFormQuick onSubmit={prepareTransaction} />

        {transaction && (
          <Overlay>
            <Container centered>
              <Modal>
                <Container centered>
                  <TransactionForm
                    {...transaction}
                    categories={categories}
                    onCancel={deleteTransaction}
                    onSubmit={createTransaction}
                  />
                </Container>
              </Modal>
            </Container>
          </Overlay>
        )}
      </Container>
    </>
  );
};

export default Home;
