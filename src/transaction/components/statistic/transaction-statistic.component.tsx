import type { FC } from "react";
import { useMemo } from "react";
import type { TransactionModel } from "../../models";
import { TransactionType } from "../../models";
import type { ChartCircleData } from "../../../components/chart-cirlce";
import { ChartCircle } from "../../../components/chart-cirlce";
import styled, { css } from "styled-components";
import { Container } from "../../../components/container";
import { media } from "../../../../styles/grid";
import { Price } from "../../../components/price";

const StatisticContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding-right: 1rem;
  align-items: center;
`;

const ChartCreditWrapper = styled.div`
  width: 200px;

  ${media.md} {
    width: 300px;
  }
`;

type TransactionStatisticProps = {
  transactions: TransactionModel[];
};

const ProfitPrice = styled(Price)`
  font-size: 1.2rem;

  ${(props) => {
    if (props.amount < 0) {
      return css`
        color: red;

        &::before {
          content: "-\u00A0";
        }
      `;
    } else if (props.amount > 0) {
      return css`
        color: green;

        &::before {
          content: "+\u00A0";
        }
      `;
    }
  }}
`;

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

  const profit = useMemo(
    () =>
      transactions.reduce<number>((amount, transaction) => {
        return transaction.type === TransactionType.DEBIT
          ? amount + transaction.amount
          : amount - transaction.amount;
      }, 0),
    [transactions],
  );

  return (
    <StatisticContainer>
      {!!transactionCreditChartData.length && (
        <ChartCreditWrapper>
          <ChartCircle data={transactionCreditChartData} />
        </ChartCreditWrapper>
      )}
      <div>
        Остаток: <ProfitPrice amount={profit} />
      </div>
    </StatisticContainer>
  );
};

export { TransactionStatistic };
