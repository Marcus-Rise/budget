import type { FC } from "react";
import type { TransactionFilter } from "./transaction-filters";
import { transactionFilters } from "./transaction-filters";
import type { ITransactionFilterFormDto } from "./transaction-filter-form.dto";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type {
  InputComboboxProps,
  InputComboboxValueItem,
} from "../../../components/input-combobox";
import { InputCombobox } from "../../../components/input-combobox";
import { mergeArrayByObjectKeyHelper } from "../../../helpers/merge-array-by-object-key";
import styled from "styled-components";
import { Button } from "../../../components/button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type TransactionFilterFormProps = {
  alreadyAppliedFilters: TransactionFilter[];
  onSubmit: (dto: ITransactionFilterFormDto) => void;
};

type TransactionFormState = {
  filters: Array<{
    title: string;
    value: string;
  }>;
};

const TransactionFilterForm: FC<TransactionFilterFormProps> = ({
  alreadyAppliedFilters,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<TransactionFormState>({
    defaultValues: {
      filters: alreadyAppliedFilters.map((i) => ({ title: i.name, value: i.category })),
    },
  });

  const submit: SubmitHandler<TransactionFormState> = (dto) => {
    const filters = transactionFilters.filter((filterVariant) =>
      dto.filters.find((selectedFilter) => selectedFilter.title === filterVariant.name),
    );

    onSubmit({ filters });
  };

  const variants: InputComboboxValueItem[] = transactionFilters.map((i) => ({
    title: i.name,
    value: i.category,
  }));

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name={"filters"}
        render={({ field }) => {
          const change: InputComboboxProps["onChange"] = (value) => {
            const uniqueValues = mergeArrayByObjectKeyHelper(value, "value");

            field.onChange(uniqueValues);
          };

          return (
            <InputCombobox
              {...field}
              onChange={change}
              variants={variants}
              label={"Поиск фильтра"}
              autoFocus
            />
          );
        }}
      />
      <Button type={"submit"}>Сохранить</Button>
    </Form>
  );
};

export { TransactionFilterForm };
export type { TransactionFilter };
