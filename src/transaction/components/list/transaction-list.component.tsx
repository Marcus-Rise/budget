import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import type { TransactionModel } from "../../models";
import { TRANSACTION_CATEGORY_OTHER, TransactionType } from "../../models";
import type { ITransactionFormDto } from "../form";
import { TransactionForm } from "../form";
import type { ITransactionFormQuickDto } from "../form-quick";
import { TransactionFormQuick } from "../form-quick";
import type { DateGroupedListItem } from "../../../components/date-grouped-list";
import { DateGroupedList } from "../../../components/date-grouped-list";
import { TitledList } from "../../../components/titled-list";
import { TransactionListItem } from "../list-item";
import { Modal } from "../../../components/modal";
import styled, { useTheme } from "styled-components";
import { TransactionPrice } from "../price";
import { Button, ButtonVariant } from "../../../components/button";
import { media } from "../../../../styles/grid";

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
`;

const ModalFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.1rem;
`;

const FormButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;

  ${media.md} {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
`;

const ListGroupPrice = styled(TransactionPrice)`
  opacity: 0.75;
  font-size: 0.9rem;
`;

type TransactionListItem = Omit<TransactionModel, "toJson"> & { id: string };

type TransactionStatisticSlice = FC<{ transactions: TransactionModel[] }>;

type TransactionListProps = {
  transactions: TransactionModel[];
  onDelete: (uuid: string) => void;
  onSave: (dto: ITransactionFormDto) => void;
  renderStatistic?: TransactionStatisticSlice;
};

const TransactionList: FC<TransactionListProps> = ({
  transactions,
  renderStatistic = () => null,
  onDelete,
  onSave,
}) => {
  const [transactionDto, setTransactionDto] = useState<ITransactionFormDto>();
  const theme = useTheme();

  const categories = useMemo(() => {
    const transactionCategories = transactions.map((transaction) => transaction.category);

    const uniqueCategories = new Set(transactionCategories);

    uniqueCategories.add(TRANSACTION_CATEGORY_OTHER);

    return Array.from(uniqueCategories);
  }, [transactions]);

  const transactionListItems: Array<DateGroupedListItem<TransactionListItem>> = useMemo(
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
      category: TRANSACTION_CATEGORY_OTHER,
    });
  }, []);

  const clearTransactionFormDto = useCallback(() => setTransactionDto(undefined), []);

  const saveTransactionAndClear = useCallback(
    (dto: ITransactionFormDto) => {
      onSave(dto);

      clearTransactionFormDto();
    },
    [clearTransactionFormDto, onSave],
  );

  const deleteTransaction = useCallback(
    (uuid: string, title: string, category: string) => {
      if (confirm(`Вы действительно хотите удалить "${title}, ${category}"`)) {
        onDelete(uuid);
      }
    },
    [onDelete],
  );

  return (
    <>
      <MetaContainer>
        <TransactionFormQuick onSubmit={prepareTransaction} />
        {renderStatistic({ transactions })}
      </MetaContainer>
      <DateGroupedList
        items={transactionListItems}
        renderGroup={({ items, children, title }) => {
          const sum = items.reduce(
            (sum, item) =>
              item.type === TransactionType.DEBIT ? sum + item.amount : sum - item.amount,
            0,
          );
          const type = sum < 0 ? TransactionType.CREDIT : TransactionType.DEBIT;

          return (
            <TitledList title={title} meta={<ListGroupPrice amount={sum} type={type} />}>
              {children}
            </TitledList>
          );
        }}
        renderItem={(props) => (
          <TransactionListItem
            {...props}
            onClick={() => setTransactionDto(props)}
            onRemove={() => deleteTransaction(props.uuid, props.title, props.category)}
          />
        )}
      />
      <Modal show={!!transactionDto}>
        <ModalFormWrapper>
          <FormTitle>Редактор транзакции</FormTitle>
          <TransactionForm
            {...transactionDto}
            categories={categories}
            onSubmit={saveTransactionAndClear}
            focus={!!transactionDto?.uuid ? "amount" : "category"}
          >
            <FormButtonsWrapper>
              <Button type={"submit"}>Сохранить</Button>
              <Button
                type={"button"}
                variant={ButtonVariant.TEXT}
                color={theme.neutral}
                onClick={clearTransactionFormDto}
              >
                Отменить
              </Button>
            </FormButtonsWrapper>
          </TransactionForm>
        </ModalFormWrapper>
      </Modal>
    </>
  );
};

export { TransactionList };
