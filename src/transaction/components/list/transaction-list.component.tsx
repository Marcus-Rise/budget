import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import type { TransactionModel } from "../../models";
import { TRANSACTION_CATEGORY_OTHER, TransactionType } from "../../models";
import type { ITransactionFormDto } from "../form";
import { TransactionForm } from "../form";
import type { ITransactionFormQuickDto } from "../form-quick";
import { TransactionFormQuick } from "../form-quick";
import { Container } from "../../../components/container";
import type { DateGroupedListItem } from "../../../components/date-grouped-list";
import { DateGroupedList } from "../../../components/date-grouped-list";
import { TitledList } from "../../../components/titled-list";
import { TransactionListItem } from "../list-item";
import { Overlay } from "../../../components/overlay";
import { Modal } from "../../../components/modal";
import styled from "styled-components";
import { TransactionPrice } from "../price";

const ModalContainer = styled(Container)`
  height: 100vh;
  align-items: center;
`;

const ModalFormContainer = styled(Container)`
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.1rem;
`;

const ListGroupPrice = styled(TransactionPrice)`
  opacity: 0.75;
  font-size: 0.9rem;
`;

type TransactionListItem = Omit<TransactionModel, "toJson"> & { id: string };

type TransactionListProps = {
  transactions: TransactionModel[];
  onDelete: (uuid: string) => void;
  onSave: (dto: ITransactionFormDto) => void;
};

const TransactionList: FC<TransactionListProps> = ({ transactions, onDelete, onSave }) => {
  const [transactionDto, setTransactionDto] = useState<ITransactionFormDto>();

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
      <Container centered>
        <TransactionFormQuick onSubmit={prepareTransaction} />
      </Container>
      <br />
      <Container>
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
      </Container>
      {transactionDto && (
        <Overlay>
          <ModalContainer centered>
            <Modal>
              <ModalFormContainer centered>
                <FormTitle>Редактор транзакции</FormTitle>
                <TransactionForm
                  {...transactionDto}
                  categories={categories}
                  onCancel={clearTransactionFormDto}
                  onSubmit={saveTransactionAndClear}
                />
              </ModalFormContainer>
            </Modal>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export { TransactionList };
