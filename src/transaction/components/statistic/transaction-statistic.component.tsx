import type { ComponentProps, FC } from "react";
import { useMemo } from "react";
import type { TransactionModel } from "../../models";
import { TransactionType } from "../../models";
import type { ChartCircleData } from "../../../components/chart-cirlce";
import { ChartCircle } from "../../../components/chart-cirlce";
import styled from "styled-components";
import { Container } from "../../../components/container";
import { media } from "../../../../styles/grid";
import { TransactionPrice } from "../price";

const StatisticContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding-right: 1rem;
  align-items: center;
`;

const StatisticMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const ChartCreditWrapper = styled.div`
  width: 200px;

  ${media.md} {
    width: 300px;
  }
`;

const ProfitPrice = styled(TransactionPrice).attrs<
  Omit<ComponentProps<typeof TransactionPrice>, "type">,
  ComponentProps<typeof TransactionPrice>
>(({ amount }) => {
  return {
    amount,
    type: amount < 0 ? TransactionType.CREDIT : undefined,
  };
})``;

const sumTransactionByType = (transactions: TransactionModel[], type: TransactionType): number =>
  transactions.reduce<number>(
    (amount, transaction) => (transaction.type === type ? amount + transaction.amount : amount),
    0,
  );

type TransactionStatisticProps = {
  transactions: TransactionModel[];
};

const TransactionStatistic: FC<TransactionStatisticProps> = ({ transactions }) => {
  const transactionCreditChartData: ChartCircleData = useMemo(
    () =>
      transactions
        .filter((i) => i.type === TransactionType.CREDIT)
        .map((transaction) => ({
          title: transaction.category,
          value: transaction.amount,
        })),
    [transactions],
  );

  const debit = useMemo(
    () => sumTransactionByType(transactions, TransactionType.DEBIT),
    [transactions],
  );

  const credit = useMemo(
    () => sumTransactionByType(transactions, TransactionType.CREDIT),
    [transactions],
  );

  const profit = useMemo(() => debit - credit, [credit, debit]);

  return (
    <StatisticContainer>
      {!!transactionCreditChartData.length && (
        <ChartCreditWrapper>
          <ChartCircle data={transactionCreditChartData} />
        </ChartCreditWrapper>
      )}
      <StatisticMetaContainer>
        <span>
          Доход: <TransactionPrice type={TransactionType.DEBIT} amount={debit} />
        </span>
        <span>
          Расход: <TransactionPrice type={TransactionType.CREDIT} amount={credit} />
        </span>
        <span>
          Остаток: <ProfitPrice amount={profit} />
        </span>
      </StatisticMetaContainer>
    </StatisticContainer>
  );
};

export { TransactionStatistic };
