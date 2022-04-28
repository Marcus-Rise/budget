import type { FC } from "react";
import { useCallback } from "react";
import { TRANSACTION_CATEGORY_OTHER, TransactionType } from "../../models";
import type { ITransactionFormDto } from "../form";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "../../../components/input-text";
import { InputError } from "../../../components/input-error";
import { InputNumber } from "../../../components/input-number";
import { InputRadio } from "../../../components/input-radio";
import { InputDate } from "../../../components/input-date";
import { Button } from "../../../components/button";
import type { ITransactionWelcomeFormDto } from "./transaction-welcome-form.dto";
import styled from "styled-components";
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

type TransactionWelcomeFormProps = {
  onSubmit: (dto: ITransactionWelcomeFormDto) => void;
};

const TransactionWelcomeForm: FC<TransactionWelcomeFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm<ITransactionWelcomeFormDto>({
    defaultValues: {
      title: "",
      amount: "" as unknown as number,
      type: TransactionType.CREDIT,
      date: new Date(),
      category: TRANSACTION_CATEGORY_OTHER,
    },
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
              <InputText {...field} label={"Название"} autoFocus />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
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
            <InputContainer>
              <InputNumber {...field} min={1} label={"Сумма"} />
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
              <InputText {...field} label={"Категория"} />
              {!!fieldState.error?.message && <InputError>{fieldState.error.message}</InputError>}
            </InputContainer>
          )}
        />
      </Row>

      <Row>
        <InputContainer>
          <Button type={"submit"}>Добавить</Button>
        </InputContainer>
      </Row>
    </Form>
  );
};

export { TransactionWelcomeForm };
