import type { ComponentProps, FC } from "react";
import { useMemo } from "react";
import type { TransactionModel } from "../../models";
import { TransactionType } from "../../models";
import type { ChartCircleData } from "../../../components/chart-cirlce";
import { ChartCircle } from "../../../components/chart-cirlce";
import styled from "styled-components";
import { media } from "../../../../styles/grid";
import { TransactionPrice } from "../price";
import { ChartSlim } from "../../../components/chart-slim";
import { getDateMonthHelper } from "../../../helpers/get-date-month";
import { Button, ButtonVariant } from "../../../components/button";
import { Icon } from "../../../components/icon";

/**
 * @return 80 or 100 or 20
 * @param value
 * @param half
 */
const getPercentOfTwoValues = (value: number, half: number): number =>
  (value / (value + half)) * 100;

const Month = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

const ProfitWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const FullViewToggleIcon = styled(Icon)<{ fullView?: boolean }>`
  transform: ${(props) => (props.fullView ? "none" : "rotate(180deg)")};
`;

const StatisticContainer = styled.div<{ row?: boolean; reverse?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  flex-direction: ${(props) =>
    props.row
      ? props.reverse
        ? "row-reverse"
        : "row"
      : props.reverse
      ? "column-reverse"
      : "column"};
`;

const StatisticMetaContainer = styled.div<{ row?: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: ${(props) => (props.row ? "space-between" : "center")};
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  width: 100%;
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
  fullView?: boolean;
  onToggleView?: () => void;
};

const TransactionStatistic: FC<TransactionStatisticProps> = ({
  fullView,
  onToggleView,
  transactions,
}) => {
  const month = getDateMonthHelper(transactions[0].date);
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

  const fullChart = useMemo(
    () => (
      <ChartCreditWrapper>
        <ChartCircle data={transactionCreditChartData} />
      </ChartCreditWrapper>
    ),
    [transactionCreditChartData],
  );

  const slimChart = useMemo(
    () => (
      <ChartSlim
        credit={getPercentOfTwoValues(credit, profit)}
        profit={getPercentOfTwoValues(profit, credit)}
      />
    ),
    [credit, profit],
  );

  return (
    <StatisticContainer row={fullView} reverse={!fullView}>
      {!!transactionCreditChartData.length && fullView ? fullChart : slimChart}
      <StatisticMetaContainer row={!fullView}>
        <span>
          Расчет за <Month>{month}</Month>
        </span>
        {fullView && (
          <span>
            Доход: <TransactionPrice type={TransactionType.DEBIT} amount={debit} />
          </span>
        )}
        {fullView && (
          <span>
            Расход: <TransactionPrice type={TransactionType.CREDIT} amount={credit} />
          </span>
        )}
        <ProfitWrapper>
          Остаток:{"\u00A0"}
          <ProfitPrice amount={profit} />
          <Button variant={ButtonVariant.ICON} onClick={onToggleView}>
            <FullViewToggleIcon fullView={fullView} name={"chevron-up"} />
          </Button>
        </ProfitWrapper>
      </StatisticMetaContainer>
    </StatisticContainer>
  );
};

export { TransactionStatistic };
