import type { FC } from "react";
import { useCallback } from "react";
import { InputText } from "../../../components/input-text";
import { InputNumber } from "../../../components/input-number";
import { Button } from "../../../components/button";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import type { ITransactionFormQuickDto } from "./transaction-form-quick.dto";
import styled from "styled-components";
import { media } from "../../../../styles/grid";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.md} {
    flex-direction: row;
  }
`;

const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;

  ${media.sm} {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  ${media.md} {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

type TransactionFormProps = {
  onSubmit: (dto: ITransactionFormQuickDto) => void;
};

const TransactionFormQuick: FC<TransactionFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<ITransactionFormQuickDto>({
    defaultValues: {
      amount: "" as unknown as number,
      title: "",
    },
  });

  const submit: SubmitHandler<ITransactionFormQuickDto> = useCallback(
    (dto) => {
      onSubmit(dto);

      reset();
    },
    [onSubmit, reset],
  );

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        name={"title"}
        control={control}
        rules={{ required: "Введите название" }}
        render={({ field, fieldState }) => (
          <InputContainer>
            <InputText {...field} label={"Название"} error={fieldState.error?.message} />
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
      <Button type={"submit"}>Добавить</Button>
    </Form>
  );
};

export { TransactionFormQuick };
export type { TransactionFormProps };
