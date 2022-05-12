import type { FC, PropsWithChildren } from "react";
import { useCallback } from "react";
import { InputText } from "../../../components/input-text";
import { InputNumber } from "../../../components/input-number";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { InputRadio } from "../../../components/input-radio";
import { InputDate } from "../../../components/input-date";
import { InputAutocomplete } from "../../../components/input-autocomplete/input-autocomplete.component";
import type { ITransactionFormDto } from "./transaction-form.dto";
import { TransactionType } from "../../models";
import { media } from "../../../../styles/grid";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputRadioContainer = styled.div`
  display: inline-flex;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

type TransactionFormProps = PropsWithChildren<
  Partial<ITransactionFormDto> & {
    onSubmit: (dto: ITransactionFormDto) => void;
    categories: string[];
    focus?: keyof ITransactionFormDto;
  }
>;

const TransactionForm: FC<TransactionFormProps> = ({
  onSubmit,
  categories,
  children,
  focus,
  ...dto
}) => {
  const { handleSubmit, control } = useForm<ITransactionFormDto>({
    defaultValues: dto,
  });

  const submit: SubmitHandler<ITransactionFormDto> = useCallback(
    (dto) => {
      onSubmit(dto);
    },
    [onSubmit],
  );

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Row>
        <Controller
          name={"title"}
          control={control}
          rules={{ required: "Введите название" }}
          render={({ field, fieldState }) => (
            <InputText
              {...field}
              label={"Название"}
              autoFocus={focus === "title"}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name={"amount"}
          control={control}
          rules={{
            required: "Введите сумму",
            min: { value: 1, message: "Введите положительное число" },
          }}
          render={({ field, fieldState }) => (
            <InputNumber
              {...field}
              min={1}
              label={"Сумма"}
              autoFocus={focus === "amount"}
              error={fieldState.error?.message}
            />
          )}
        />
      </Row>

      <Row>
        <Controller
          name={"type"}
          control={control}
          render={({ field }) => (
            <InputRadioContainer>
              <InputRadio
                {...field}
                id={TransactionType.CREDIT}
                value={TransactionType.CREDIT}
                checked={field.value === TransactionType.CREDIT}
              />
              <InputRadio
                {...field}
                id={TransactionType.DEBIT}
                value={TransactionType.DEBIT}
                checked={field.value === TransactionType.DEBIT}
              />
            </InputRadioContainer>
          )}
        />
      </Row>

      <Row>
        <Controller
          name={"date"}
          control={control}
          rules={{ required: "Введите дату" }}
          render={({ field, fieldState }) => (
            <InputDate
              {...field}
              label={"Дата"}
              autoFocus={focus === "date"}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name={"category"}
          control={control}
          rules={{ required: "Введите категорию" }}
          render={({ field, fieldState }) => (
            <InputAutocomplete
              {...field}
              variants={categories}
              label={"Категория"}
              autoFocus={focus === "category"}
              error={fieldState.error?.message}
            />
          )}
        />
      </Row>

      <Row>{children}</Row>
    </Form>
  );
};

export { TransactionForm };
export type { TransactionFormProps };
