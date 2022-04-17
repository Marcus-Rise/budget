import type { FC } from "react";
import { useCallback } from "react";
import { InputText } from "../../../components/input-text";
import { InputPrice } from "../../../components/input-price";
import { Button } from "../../../components/button";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputError } from "../../../components/input-error";
import styled from "styled-components";
import { InputRadio } from "../../../components/input-radio";
import { InputDate } from "../../../components/input-date";
import { InputAutocomplete } from "../../../components/input-autocomplete/input-autocomplete.component";
import type { ITransactionFormDto } from "./transaction-form.dto";
import { TransactionType } from "../../transaction.model";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type TransactionFormProps = ITransactionFormDto & {
  onSubmit: (dto: ITransactionFormDto) => void;
  onCancel: () => void;
  categories: string[];
};

const TransactionForm: FC<TransactionFormProps> = ({ onSubmit, onCancel, categories, ...dto }) => {
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
            <InputContainer>
              <InputText {...field} placeholder={"Название"} />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
          )}
        />
        <Controller
          name={"amount"}
          control={control}
          rules={{ required: "Введите сумму" }}
          render={({ field, fieldState }) => (
            <InputContainer>
              <InputPrice {...field} placeholder={"Сумма"} />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
          )}
        />
      </Row>

      <Row>
        <Controller
          name={"type"}
          control={control}
          render={({ field }) => (
            <>
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
            </>
          )}
        />
      </Row>

      <Row>
        <Controller
          name={"date"}
          control={control}
          rules={{ required: "Введите дату" }}
          render={({ field, fieldState }) => (
            <InputContainer>
              <InputDate {...field} />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
          )}
        />

        <Controller
          name={"category"}
          control={control}
          rules={{ required: "Введите категорию" }}
          render={({ field, fieldState }) => (
            <InputContainer>
              <InputAutocomplete {...field} variants={categories} placeholder={"Категория"} />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
          )}
        />
      </Row>

      <Row>
        <Button type={"button"} onClick={onCancel}>
          Отменить
        </Button>
        <Button type={"submit"}>Добавить</Button>
      </Row>
    </Form>
  );
};

export { TransactionForm };
export type { TransactionFormProps };
