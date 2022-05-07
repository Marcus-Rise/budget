import type { FC } from "react";
import { useCallback } from "react";
import { TRANSACTION_CATEGORY_OTHER, TransactionType } from "../../models";
import type { ITransactionFormDto } from "../form";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "../../../components/input-text";
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
      margin-bottom: 2rem;
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
    margin-bottom: 2rem;
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
              <InputText
                {...field}
                label={"Название"}
                autoFocus
                error={fieldState.error?.message}
              />
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
              <InputNumber {...field} min={1} label={"Сумма"} error={fieldState.error?.message} />
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
              <InputDate {...field} label={"Дата"} error={fieldState.error?.message} />
            </InputContainer>
          )}
        />

        <Controller
          name={"category"}
          control={control}
          rules={{ required: "Введите категорию" }}
          render={({ field, fieldState }) => (
            <InputContainer>
              <InputText {...field} label={"Категория"} error={fieldState.error?.message} />
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
