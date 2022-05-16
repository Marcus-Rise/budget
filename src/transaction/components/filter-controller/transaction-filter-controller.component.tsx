import type { FC } from "react";
import { useState } from "react";
import { Badge } from "../../../components/badge";
import { Modal } from "../../../components/modal";
import type { TransactionFilter } from "../filter-form";
import {
  TransactionFilterCategoryEnum,
  TransactionFilterForm,
  transactionFilters,
} from "../filter-form";
import styled from "styled-components";
import { Button } from "../../../components/button";
import type { ITransactionFilterFormDto } from "../filter-form/transaction-filter-form.dto";
import { mergeArrayByObjectKeyHelper } from "../../../helpers/merge-array-by-object-key";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterCounter = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.neutralLightest};
  padding: 0.15rem;
  border-radius: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterFormTitle = styled.h2`
  text-align: center;
  font-size: 1.25rem;
`;

const dateFilters = transactionFilters.filter(
  (filter) => filter.category === TransactionFilterCategoryEnum.DATE,
);

const TransactionFilterController: FC<{
  filters: TransactionFilter[];
  onFilter: (filters: TransactionFilter[]) => void;
}> = ({ filters, onFilter }) => {
  const [showFilterForm, setShowFilterForm] = useState(false);
  const openFilterForm = () => setShowFilterForm(true);
  const closeFilterForm = () => setShowFilterForm(false);

  const filter = (dto: ITransactionFilterFormDto) => {
    onFilter(dto.filters);
    closeFilterForm();
  };

  const actualDateFilter = filters.find(
    (filter) => filter.category === TransactionFilterCategoryEnum.DATE,
  );

  const selectQuickFilter = (filterName: string) => {
    const filter = dateFilters.find((filter) => filter.name === filterName);

    if (filter) {
      const uniqueFilters = mergeArrayByObjectKeyHelper([filter, ...filters], "category");

      onFilter(uniqueFilters);
    }
  };

  const availableDateFilters = dateFilters
    .filter((filter) => filter.name !== actualDateFilter?.name)
    .map((filter) => (
      <Button as={Badge} key={filter.name} onClick={() => selectQuickFilter(filter.name)}>
        {filter.name}
      </Button>
    ));

  return (
    <Container>
      {availableDateFilters}
      <Button as={Badge} onClick={openFilterForm}>
        Фильтры
        {filters.length > 0 && <FilterCounter>{filters.length}</FilterCounter>}
      </Button>
      <Modal show={showFilterForm} onClose={closeFilterForm}>
        <FilterFormTitle>Фильтры</FilterFormTitle>
        <TransactionFilterForm alreadyAppliedFilters={filters} onSubmit={filter} />
      </Modal>
    </Container>
  );
};

export { TransactionFilterController };
