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
import { TRANSACTION_CATEGORY_OTHER, useTransaction } from "../src/transaction/transaction.hook";
import { TransactionListItem } from "../src/transaction/components/list-item";
import type { DateGroupedListItem } from "../src/components/date-grouped-list";
import { DateGroupedList } from "../src/components/date-grouped-list";
import { TitledList } from "../src/components/titled-list";
import styled, { css } from "styled-components";
import { Price } from "../src/components/price";
import type { ChartPieData } from "../src/components/chart-pie";
import { ChartPie } from "../src/components/chart-pie";

const Logo = styled.h1`
  font-size: 1.5rem;
  padding-left: 1rem;
`;

const ChartCreditWrapper = styled.div`
  width: 300px;
`;

const StatisticContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding-right: 1rem;
  align-items: center;
`;

const ProfitPrice = styled(Price)`
  font-size: 1.1rem;

  ${(props) => {
    if (props.amount < 0) {
      return css`
        color: red;

        &::before {
          content: "- ";
        }
      `;
    } else if (props.amount > 0) {
      return css`
        color: green;

        &::before {
          content: "+ ";
        }
      `;
    }
  }}
`;

const Home: NextPage = () => {
  const { saveTransaction, transactions, deleteTransaction, profit, transactionCategories } =
    useTransaction();
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

  const transactionCreditChartData: ChartPieData = useMemo(
    () =>
      transactions
        .filter((i) => i.type === TransactionType.CREDIT)
        .map((transaction) => ({
          title: transaction.category,
          value: transaction.amount,
        })),
    [transactions],
  );

  const prepareTransaction = useCallback((quickDto: ITransactionFormQuickDto) => {
    setTransactionDto({
      ...quickDto,
      type: TransactionType.CREDIT,
      date: new Date(),
      category: TRANSACTION_CATEGORY_OTHER,
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
        <Logo>Бюджет</Logo>
      </Container>

      {!!transactions.length ? (
        <>
          <br />
          <Container centered>
            <TransactionFormQuick onSubmit={prepareTransaction} />
          </Container>
          <br />
          <StatisticContainer>
            <ChartCreditWrapper>
              <ChartPie data={transactionCreditChartData} />
            </ChartCreditWrapper>

            <div>
              Остаток:{"\u00A0"}
              <ProfitPrice amount={profit} />
            </div>
          </StatisticContainer>
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
                      categories={transactionCategories}
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
            category={TRANSACTION_CATEGORY_OTHER}
            categories={transactionCategories}
            onCancel={clearTransactionFormDto}
            onSubmit={saveTransactionAndClear}
          />
        </Container>
      )}
    </>
  );
};

export default Home;
