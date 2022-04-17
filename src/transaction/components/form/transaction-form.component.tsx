import type { FC } from "react";
import { useCallback } from "react";
import { InputText } from "../../../components/input-text";
import { InputNumber } from "../../../components/input-number";
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
import { media } from "../../../../styles/grid";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;

  ${media.sm} {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const InputRadioContainer = styled.div`
  display: inline-flex;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
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
              <InputText {...field} label={"Название"} />
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
              <InputNumber {...field} label={"Сумма"} />
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
            <InputContainer>
              <InputDate {...field} label={"Дата"} />
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
              <InputAutocomplete {...field} variants={categories} label={"Категория"} autoFocus />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
          )}
        />
      </Row>

      <Row>
        <InputContainer>
          <Button type={"button"} onClick={onCancel}>
            Отменить
          </Button>
        </InputContainer>
        <InputContainer>
          <Button type={"submit"}>Добавить</Button>
        </InputContainer>
      </Row>
    </Form>
  );
};

export { TransactionForm };
export type { TransactionFormProps };
